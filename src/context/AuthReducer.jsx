const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.payload.data.user.email,
        token: `Bearer ${action.payload.token}`,
      };
    case 'LOGOUT':
      return {
        ...state,
        email: '',
        token: '',
      };
    default:
      return state;
  }
};

export default AuthReducer;
