export default function (lastPostsReducer = [], action) {
  switch (action.type) {
    case 'UPDATE_LAST_POSTS':
      return { ...lastPostsReducer, list: action.list };
    default:
      return lastPostsReducer;
  }
}
