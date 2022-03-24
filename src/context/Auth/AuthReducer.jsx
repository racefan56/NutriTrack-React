const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.payload.data.user.email,
        token: `Bearer ${action.payload.token}`,
        loading: false,
        userRole: action.payload.data.user.role,
        loggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        email: '',
        token: null,
        userRole: null,
        loggedIn: false,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
