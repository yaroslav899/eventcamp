const initialFilterState = {
  data: {},
  listPosts: [],
};

export default function (userReducer = initialFilterState, action) {
  switch (action.type) {
    case 'UPDATE_USERDATA': {
      const data = {
        name: action.data.name,
        email: action.data.email,
        token: action.data.token,
        id: action.data.id,
      };
      return { ...userReducer, data };
    }
    case 'UPDATE_USER_POSTS':
      return { ...userReducer, listPosts: action.listPosts };
    default:
      return userReducer;
  }
}
