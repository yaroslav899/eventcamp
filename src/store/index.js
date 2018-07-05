import { createStore, combineReducers } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);

//dev only
window.store = store;

export default store