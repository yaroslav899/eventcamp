export default function (postReducer = {}, action) {
  switch (action.type) {
    case 'UPDATE_DETAIL_POST':
      return { ...postReducer, detail: action.post };
    default:
      return postReducer;
  }
}
