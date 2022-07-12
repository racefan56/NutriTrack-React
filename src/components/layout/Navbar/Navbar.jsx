import React from 'react';
import { toast } from 'react-toastify';
import { logout } from '../../../features/auth/authSlice';
import { setPathname } from '../../../features/navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Brand from '../Brand/Brand';

import classes from './Navbar.module.css';

function Navbar({ title }) {
  const dispatch = useDispatch();
  const { loggedIn, userRole } = useSelector((state) => state.auth);
  const { pathname } = useSelector((state) => state.navigation);

  //Only display navbar if user is logged in
  //Display links based on user role
  if (loggedIn) {
    return (
      <>
        <nav className={`d-flex ${classes['nav-container']}`}>
          <Brand className={classes['nav-brand']} />
          <div className='d-flex container justify-content-between'>
            <Link
              onClick={() => {
                return dispatch(setPathname('/control-panel/menu-items'));
              }}
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
