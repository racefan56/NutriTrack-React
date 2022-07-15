import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/layout/Card/Card';

import classes from './NotFound.module.css';

function Notfound() {
  return (
    <Card className={classes['card-main']}>
      <h1 className={classes.notFoundTxt}>Page Not Found</h1>
      <div className={classes.backBtnContainer}>
        <Link className={`btn ${classes.backBtn}`} to='/patients'>
          Back
        </Link>
      </div>
    </Card>
  );
}

export default Notfound;
