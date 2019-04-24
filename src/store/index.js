import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);

//  dev, only for checking. ToDo remove it
window.store = store;

export default store;
