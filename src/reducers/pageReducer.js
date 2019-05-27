const initialPages = {
  main: '',
  info: '',
  callback: '',
};

export default function (pageReducer = initialPages, action) {
  switch (action.type) {
    case 'UPDATE_MAIN_PAGE':
      return { ...pageReducer, main: action.main };
    case 'UPDATE_INFO_PAGE':
      return { ...pageReducer, info: action.info };
    case 'UPDATE_CALLBACK_PAGE':
      return { ...pageReducer, callback: action.callback };
    default:
      return pageReducer;
  }
}
