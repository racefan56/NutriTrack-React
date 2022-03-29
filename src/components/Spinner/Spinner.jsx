import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import Card from './../layout/Card/Card';

import classes from './Spinner.module.css';

function Spinner() {
  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center'>
      <Card className={classes['card-spinner']}>
        <FaSpinner className={classes['spinner']}></FaSpinner>
      </Card>
    </div>
  );
}

export default Spinner;
