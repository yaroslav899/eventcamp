import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import lastPostsReducer from './lastPostsReducer';
import authuserReducer from './authuserReducer';

// Combine Reducers
const reducers = combineReducers({
  filterState: filterReducer,
  totalPages: paginationReducer,
  lastPosts: lastPostsReducer,
  authuser: authuserReducer,
});

export default reducers;
