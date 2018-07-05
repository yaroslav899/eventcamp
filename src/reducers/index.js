import {combineReducers } from 'redux';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import lastPostsReducer from './lastPostsReducer';

// Combine Reducers
const reducers = combineReducers({
    filterState         : filterReducer,
    totalPages          : paginationReducer,
    lastPosts           : lastPostsReducer
});

export default reducers;