import { combineReducers } from 'redux';
import { redux } from 'rndm-render-plugin-redux';

const reducers = {
  ...redux.reducers,
};

const output = combineReducers(reducers);

export default output;
