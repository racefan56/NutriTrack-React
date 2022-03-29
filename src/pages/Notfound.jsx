import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/layout/Card/Card';

function Notfound() {
  return (
    <Card className='card-main'>
      <h1 className='display-1'>Page not found</h1>
      <Link className='btn login-btn' to='/'>
        Home
      </Link>
    </Card>
  );
}

export default Notfound;
