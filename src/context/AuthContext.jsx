import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const AuthContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const initialState = {
    email: '',
    token: '',
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Login user
  const loginUser = async (userObj) => {
    const response = await fetch(`${BACKEND_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    });
    console.log(response);
    const currentUser = await response.json();

    dispatch({ type: 'LOGIN', payload: currentUser });

    // const users = await fetch(`${BACKEND_URL}/patients`, {
    //   headers: {
    //     Authorization: `Bearer ${currentUser.token}`,
    //   },
    // });
    // console.log(users.json());
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
