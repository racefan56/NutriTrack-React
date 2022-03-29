import React from 'react';
import { logout } from '../../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Brand from '../Brand/Brand';

import classes from './Navbar.module.css';

function Navbar({ title }) {
  const dispatch = useDispatch();
  const { loggedIn, userRole } = useSelector((state) => state.auth);

  //Only display navbar if user is logged in
  //Display links based on user role
  if (loggedIn) {
    return (
      <nav className={`d-flex ${classes['nav-container']}`}>
        <Brand className={classes['nav-brand']} />
        <div className='d-flex container justify-content-between'>
          {userRole === 'admin' || userRole === 'dietitian' ? (
            <Link className={classes['navbar-link']} to='/control-panel'>
              Control Panel
            </Link>
          ) : (
            <></>
          )}
          <Link className={classes['navbar-link']} to='/patients'>
            Patients
          </Link>
          <Link className={classes['navbar-link']} to='/my-account'>
            My Account
          </Link>
          <Link
            className={classes['navbar-link']}
            to='/'
            onClick={() => {
              return dispatch(logout());
            }}
          >
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