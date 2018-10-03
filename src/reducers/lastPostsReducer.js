export default function (lastPostsReducer = [], action) {
  switch (action.type) {
    case 'LAST_POSTS_UPDATE':
      return { ...lastPostsReducer, list: action.list };
    default:
      return lastPostsReducer;
  }
}
