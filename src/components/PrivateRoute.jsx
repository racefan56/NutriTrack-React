import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner/Spinner';

const PrivateRoute = (props) => {

  const { loading, loggedIn, userRole } = useSelector((state) => state.auth);

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
