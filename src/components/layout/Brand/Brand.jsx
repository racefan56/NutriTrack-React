import React from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import classes from './Brand.module.css';

function Brand({ className }) {
  return (
    <div className='d-flex'>
      <Link className={`brand ${className ? className : ''}`} to='/home'>
        NutriTrack
        <BiFoodMenu />
      </Link>
    </div>
  );
}

export default Brand;
