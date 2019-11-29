import { imageUrlRecources } from '../../resources/url';

const initialFilterState = {
  data: {},
  listPosts: [],
};

export default function (userReducer = initialFilterState, action) {
  switch (action.type) {
    case 'UPDATE_USERPROFILE': {
      const data = {
        name: 'name' in action.data ? action.data.name : '',
        userID: 'userID' in action.data ? action.data.userID : null,
        email: 'email' in action.data ? action.data.email : '',
        phone: 'phone' in action.data ? action.data.phone : '',
        city: 'city' in action.data ? action.data.city : '',
        imageUrl: 'imageUrl' in action.data ? action.data.imageUrl : imageUrlRecources.noPhoto,
        subscribed: 'subscribed' in action.data ? action.data.subscribed : '',
      };

      return { ...userReducer, data };
    }
    case 'UPDATE_USER_POSTS':
      return { ...userReducer, listPosts: action.listPosts };
    default:
      return userReducer;
  }
}
