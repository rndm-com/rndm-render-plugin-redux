import { createStore } from 'redux';
import reducers from './reducers/index';
import enhancers from './enhancers/index';

const store = createStore(reducers, enhancers);

export default store;
