import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiFoodMenu } from 'react-icons/bi';

import { setPathname } from '../../../features/navigation/navigationSlice';
import { Link } from 'react-router-dom';
import classes from './Brand.module.css';

function Brand({ className, w100 }) {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    // w100 just sets the bootstrap class w-100 on the main div
    <div className={`d-flex ${w100 ? 'w-100' : ''}`}>
      <Link
        className={`${classes.brand} ${className ? className : ''}`}
        to={loggedIn ? '/patients' : '/'}
        onClick={() => {
          if (loggedIn) {
            return dispatch(setPathname('/patients'));
          }
        }}
      >
        NutriTrack
        <BiFoodMenu />
      </Link>
    </div>
  );
}

export default Brand;
