const files = {
  files: [
    {
      string: `import { createStore } from 'redux';
import reducers from './reducers/index';
import enhancers from './enhancers/index';

const store = createStore(reducers, enhancers);

export default store;
`,
      filename: 'index.js',
    }
  ],
  folders: {
    actions: {
      files: [
        {
          string: '',
          filename: 'index.js',
        }
      ]
    },
    enhancers: {
      files: [
        {
          string: `import { compose } from 'redux';
import { get } from 'lodash';
import middleware from '../middleware/index';

const composer = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__') || compose;

const enhancers = [middleware];

const output = composer(...enhancers);

export default output;
`,
          filename: 'index.js',
        }
      ]
    },
    middleware: {
      files: [
        {
          string: `import { applyMiddleware } from 'redux';
import api from './api';
import batch from './batch';

const middleware = [
  batch,
  api,
];

const output = applyMiddleware(...middleware);

export default output;
`,
          filename: 'index.js',
        },
        {
          string: `import { unary } from 'lodash';

export default ({ dispatch }) => next => action => (
  (!Array.isArray(action)) ? next(action) : action.filter(Boolean).map(unary(dispatch))
);
`,
          filename: 'batch.js'
        },
        {
          string: `import { inRange, pickBy } from 'lodash';
import { FETCH_API_SUCCESS, FETCH_API_FAIL } from '../types/api';

const PROTOCOLS = Object.freeze({
  HTTPS: 'https',
  HTTP: 'http',
});

const DELIMITERS = Object.freeze({
  PROTOCOL: '://',
  DOMAIN: '.',
  PATH: '/',
  QUERY: '?',
  PARAMS: '&',
  PARAM: '='
});

const METHODS = Object.freeze({
  GET: 'get',
  HEAD: 'head',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
  CONNECT: 'connect',
  OPTIONS: 'options',
  TRACE: 'trace',
});

const onError = response => {
  const error = new Error('API Error');
  error.response = response;
  throw error;
};

const responseType = response => (
  (response.headers.get('Content-Type') || '').toLowerCase().includes('application/json') ?
    'json' : 'text'
);

const onSuccess = response => (
  response[responseType(response)]()
);

const onResponse = response => (
  ((inRange(response.status, 400, 600) ? onError : onSuccess)(response))
);

const isValid = input => (
  (Array.isArray(input) ? input : Object.keys(input)).length > 0
);

const buildUrl = ({
  protocol = PROTOCOLS.HTTPS,
  domain = [],
  path = [],
  query = {},
} = {}) => (
  isValid(domain) &&
  \`$\{protocol}$\{DELIMITERS.PROTOCOL}$\{domain.join(DELIMITERS.DOMAIN)}\`
    + (isValid(path) ? \`$\{DELIMITERS.PATH}$\{path.join(DELIMITERS.PATH)}\` : '')
  + (isValid(query) ? \`$\{DELIMITERS.QUERY}$\{Object.keys(query).map(i => \`$\{i}$\{DELIMITERS.PARAM}$\{query[i]}\`).join(DELIMITERS.PARAMS)}\` : '')
);

const getRequest = ({
                      url = null,
                      api = {},
                      options: {
                        method = METHODS.GET,
                        headers,
                        body
                      } = {},
                    }) => ([
  url || buildUrl(api),
  pickBy({
    method,
    headers,
    body: JSON.stringify(body)
  })
]);

export default ({ dispatch }) => next => (action) => {

  const request = getRequest(action);

  if (!request[0]) return next(action);

  const { rndm } = action;

  const onAPISuccess = (result) => {
    dispatch({request, result, type: FETCH_API_SUCCESS});
    if (rndm) dispatch({ ...rndm, ...result });
    return result;
  };

  const onAPIFail = error => {
    const {status = 500} = error;
    dispatch({
      request,
      error,
      type: FETCH_API_FAIL,
      status,
    });
  };

  return fetch(...request)
    .then(onResponse)
    .then(onAPISuccess)
    .catch(onAPIFail)
};
`,
          filename: 'api.js'
        }
      ]
    },
    reducers: {
      files: [
        {
          string: `import { combineReducers } from 'redux';
import { redux } from 'rndm-render-plugin-redux';
import api from './api';

const reducers = {
  ...redux.reducers,
  api,
};

const output = combineReducers(reducers);

export default output;
`,
          filename: 'index.js',
        },
        {
          string: `const reducer = (state = {}, { type = '', request, ...action } = {}) => {
  if (type.startsWith('FETCH_')) {
    const [ url ] = request;
    const key = url.replace(/\\./g,'%2E').replace(/\\//g,'%2F');
    return { ...state, [key]: { ...state[key], request, ...action } };
  }
  return state;
};

export default reducer;
`,
          filename: 'api.js'
        }
      ]
    },
    types: {
      files: [
        {
          string: '',
          filename: 'index.js',
        },
        {
          string: `export const FETCH_API_REQUEST = 'FETCH_API_REQUEST';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAIL = 'FETCH_API_FAIL';
`,
          filename: 'api.js'
        }
      ]
    },
  }
};

module.exports = files;
