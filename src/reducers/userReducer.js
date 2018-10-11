const initialFilterState = {
  state: {},
  listPosts: [],
};

export default function (userReducer = initialFilterState, action) {
  switch (action.type) {
    case 'UPDATE_USERAUTH': {
      const state = {
        name: action.state.name,
        email: action.state.email,
        token: action.state.token,
      };
      return { ...userReducer, state };
    }
    case 'UPDATE_USER_POSTS':
      return { ...userReducer, listPosts: action.listPosts };
    default:
      return userReducer;
  }
}
