import React from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Brand() {
  return (
    <div className='d-flex'>
      <Link className='brand' to='/home'>
        NutriTrack
        <BiFoodMenu />
      </Link>
    </div>
  );
}

export default Brand;
