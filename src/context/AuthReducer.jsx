const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.email,
        password: action.password,
      };
    default:
      return state;
  }
};

export default AuthReducer;
