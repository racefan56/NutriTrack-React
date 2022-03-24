import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import Card from './layout/Card';

function Spinner() {
  return (
    <Card className='align-items-center'>
      <FaSpinner className='spinner'></FaSpinner>
    </Card>
  );
}

export default Spinner;
