import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { logout } from '../../../features/auth/authSlice';
import { setPathname } from '../../../features/navigation/navigationSlice';
import Brand from '../Brand/Brand';

import classes from './Navbar.module.css';

function Navbar() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);
  const { pathname } = useSelector((state) => state.navigation);

  //Only display navbar if user is logged in
  if (loggedIn) {
    return (
      <>
        <nav className={`d-flex ${classes['nav-container']}`}>
          <Brand className={classes['nav-brand']} />
          <Brand text={'NT'} className={classes['nav-brand-mobile']} />
          <div className='d-flex container justify-content-between'>
            <Link
              onClick={() => {
                return dispatch(setPathname('/control-panel/menu-items'));
              }}
              // Sets the active navbar tab based on the pathname
              className={
                pathname.startsWith('/control-panel')
                  ? classes.navbarLinkActive
                  : classes.navbarLink
              }
              to='/control-panel/menu-items'
            >
              Control Panel
            </Link>

            <Link
              onClick={() => {
                return dispatch(setPathname('/patients'));
              }}
              // Sets the active navbar tab based on the pathname
              className={
                pathname.startsWith('/patients')
                  ? classes.navbarLinkActive
                  : classes.navbarLink
              }
              to='/patients'
            >
              Patients
            </Link>
            <Link
              onClick={() => {
                return dispatch(setPathname('/my-account'));
              }}
              // Sets the active navbar tab based on the pathname
              className={
                pathname.startsWith('/my-account')
                  ? classes.navbarLinkActive
                  : classes.navbarLink
              }
              to='/my-account'
            >
              My Account
            </Link>
            <Link
              onClick={() => {
                toast.success(`You've successfully logged out`);
                return dispatch(logout());
              }}
              className={classes.navbarLink}
              to='/'
            >
              Logout
            </Link>
          </div>
        </nav>
      </>
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
