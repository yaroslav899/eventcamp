export const updateUserProfile = data => ({
  type: 'UPDATE_USERPROFILE',
  data,
});

export const updateUserPosts = listPosts => ({
  type: 'UPDATE_USER_POSTS',
  listPosts,
});
