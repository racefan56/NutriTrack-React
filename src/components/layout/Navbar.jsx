import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/Auth/AuthContext';
import Brand from '../Brand';

function Navbar({ title }) {
  const { logoutUser, loggedIn, userRole } = useContext(AuthContext);

  //Only display navbar links if user is logged in
  //Display links based on user role
  if (loggedIn) {
    return (
      <nav className='d-flex nav-container'>
        <Brand />
        <div className='d-flex container justify-content-between'>
          {userRole === 'admin' ? (
            <Link className='navbar-link' to='/control-panel'>
              Control Panel
            </Link>
          ) : (
            <></>
          )}
          {userRole === 'admin' || 'nca-lead' ? (
            <Link className='navbar-link' to='/alerts'>
              Alerts
            </Link>
          ) : (
            <></>
          )}
          {userRole === 'admin' || 'nurse' ? (
            <Link className='navbar-link' to='/patients'>
              Patients
            </Link>
          ) : (
            <></>
          )}
          {userRole === 'admin' || 'nca-lead' ? (
            <Link className='navbar-link' to='/census'>
              Census
            </Link>
          ) : (
            <></>
          )}
          <Link className='navbar-link' to='/patient-orders'>
            Patient Orders
          </Link>
          <Link className='navbar-link' to='/' onClick={logoutUser}>
            Logout
          </Link>
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
}

Navbar.defaultProps = {
  title: 'NutriTrack ',
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
