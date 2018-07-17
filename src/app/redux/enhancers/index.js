import { compose } from 'redux';
import { get } from 'lodash';
import middleware from '../middleware/index';

const composer = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__') || compose;

const enhancers = [middleware];

const output = composer(...enhancers);

export default output;
