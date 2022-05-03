import React from 'react';
import { useSelector } from 'react-redux';
import { BiFoodMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import classes from './Brand.module.css';

function Brand({ className, w100 }) {
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <div className={`d-flex ${w100 ? 'w-100' : ''}`}>
      <Link
        className={`${classes.brand} ${className ? className : ''}`}
        to={loggedIn ? '/patients' : '/'}
      >
        NutriTrack
        <BiFoodMenu />
      </Link>
    </div>
  );
}

export default Brand;
