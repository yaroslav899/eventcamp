import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import lastPostsReducer from './lastPostsReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';

// Combine Reducers
const reducers = combineReducers({
  filterState: filterReducer,
  totalPages: paginationReducer,
  lastPosts: lastPostsReducer,
  post: postReducer,
  user: userReducer,
});

export default reducers;
