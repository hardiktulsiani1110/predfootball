/* eslint-disable prettier/prettier */
const initialState = {
  userId: null,
  username: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        userId: action.userId,
        username: action.username,
        email: action.email,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
