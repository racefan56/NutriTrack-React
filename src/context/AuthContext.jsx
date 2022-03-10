import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const AuthContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const initialState = {
    email: '',
    password: '',
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Get search results
  const loginUser = async (userObj) => {
    const response = await fetch(`${BACKEND_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    });

    const user = await response.json();
    console.log(user);

    const users = await fetch(`${BACKEND_URL}/patients`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(users.json());
    // dispatch({ type: 'LOGIN', payload: user });
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
