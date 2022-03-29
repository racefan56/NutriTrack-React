import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import Card from './layout/Card/Card';

function Spinner() {
  return (
    <Card className='min-vh-100 d-flex align-items-center justify-content-center'>
      <FaSpinner className='spinner'></FaSpinner>
    </Card>
  );
}

export default Spinner;
