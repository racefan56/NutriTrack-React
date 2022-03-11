import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const AuthContext = createContext();

const SERVER = process.env.REACT_APP_SERVER;

export const AuthProvider = ({ children }) => {
  const initialState = {
    email: '',
    token: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Login user
  const loginUser = async (userObj) => {
    const response = await fetch(`${SERVER}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    });
    console.log(response);
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
        SERVER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
