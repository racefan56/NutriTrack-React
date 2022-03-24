import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';
import Spinner from './Spinner';

const PrivateRoute = (props) => {
  const { loggedIn, loading, userRole } = useContext(AuthContext);
  if (loading) {
    return <Spinner />;
  }

  if (loggedIn) {
    if (props.validRoles) {
      if (props.validRoles.includes(userRole)) {
        return <Outlet />;
      } else {
        return <Navigate to='/' />;
      }
    }
    return <Outlet />;
  } else {
    return <Navigate to='/' />;
  }
};

export default PrivateRoute;
