const initialPages = {
  main: '',
  info: '',
};

export default function (pageReducer = initialPages, action) {
  switch (action.type) {
    case 'UPDATE_MAIN_PAGE':
      return { ...pageReducer, main: action.main };
    case 'UPDATE_INFO_PAGE':
      return { ...pageReducer, info: action.info };
    default:
      return pageReducer;
  }
}
