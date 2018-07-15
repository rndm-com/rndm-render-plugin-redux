import { use } from 'rndm-render';
import { get, set } from 'lodash';
import { connect } from 'react-redux';

const buildState = (input = []) => (state) => (
  input.reduce((o, { from, to, default: value = null } = {}) => {
    const output = {...o};
    set(output, to, get(state, from, value));
    return output;
  }, {})
);

const buildDispatch = (input = []) => (
  input.reduce((o, { prop, action }) => {
    const output = {...o};
    set(output, prop, () => {
      // eslint-disable-next-line
      console.log(action);
      return action;
    });
    return output;
  }, {})
);

const resolve = (input) => {
  const [state, dispatch] = input;
  return [
    buildState(state),
    buildDispatch(dispatch),
  ];
};

const method = (...args) => {
  return connect(...args);
};

const middleware = [
  {
    type: 'redux',
    value: {
      method,
      resolve,
    },
  },
];

const plugin = {
  key: 'redux',
  middleware,
};

const initial = {};

const reducer = (state = initial, { type = '', ...action } = {}) => {
  if (type.startsWith('RNDM_')) {
    return { ...state, ...action };
  }else {
    return state;
  }
};

use(plugin);

export default reducer;
