import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/layout/Card/Card';

import classes from './NotFound.module.css';

function Notfound() {
  return (
    <Card className={classes['card-main']}>
      <h1 className='display-1'>Page Not Found</h1>
      <Link className={`btn ${classes['main-btn']}`} to='/patients'>
        Back
      </Link>
    </Card>
  );
}

export default Notfound;
