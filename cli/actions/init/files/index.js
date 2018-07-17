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

const middleware = [];

const output = applyMiddleware(...middleware);

export default output;
`,
        filename: 'index.js',
      }
    ]
  },
  reducers: {
    files: [
      {
        string: `import { combineReducers } from 'redux';
import { redux } from 'rndm-render-plugin-redux';

const reducers = {
  ...redux.reducers,
};

const output = combineReducers(reducers);

export default output;
`,
        filename: 'index.js',
      }
    ]
  },
  types: {
    files: [
      {
        string: '',
        filename: 'index.js',
      }
    ]
  },
}
};

module.exports = files;
