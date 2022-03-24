import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const AuthContext = createContext();

const SERVER = process.env.REACT_APP_SERVER;

export const AuthProvider = ({ children }) => {
  const initialState = {
    email: '',
    token: null,
    loading: false,
    userRole: null,
    loggedIn: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Login user
  const loginUser = async (userObj) => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(`${SERVER}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    });

    const currentUser = await response.json();

    dispatch({ type: 'LOGIN', payload: currentUser });
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        token: state.token,
        loading: state.loading,
        userRole: state.userRole,
        loggedIn: state.loggedIn,
        SERVER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
