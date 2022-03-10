import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/AuthContext';

function Navbar({ title }) {
  const { logoutUser, token } = useContext(AuthContext);

  //Only display navbar if user is logged in
  if (token === '') {
    return (
      <nav className='nav-links d-flex justify-content-between p-3 mb-3'>
        <Link to='/dashboard'>{title}</Link>

      </nav>
    );
  } else {
    return (
      <nav className='nav-links d-flex justify-content-between p-3 mb-3'>
        <Link to='/dashboard'>{title}</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/' onClick={logoutUser}>
          Logout
        </Link>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  title: 'NutriTrack',
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
