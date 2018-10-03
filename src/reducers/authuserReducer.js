export default function (authuserReducer = { state: {} }, action) {
  switch (action.type) {
    case 'UPDATE_USERAUTH': {
      const state = {
        name: action.state.name,
        email: action.state.email,
        token: action.state.token,
      };
      return { ...authuserReducer, state };
    }
    default:
      return authuserReducer;
  }
}
