import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import eventReducer from './eventReducer';
import paginationReducer from './paginationReducer';
import userReducer from './userReducer';

// Combine Reducers
const reducers = combineReducers({
  page: pageReducer,
  eventState: eventReducer,
  totalPages: paginationReducer,
  user: userReducer,
});

export default reducers;
