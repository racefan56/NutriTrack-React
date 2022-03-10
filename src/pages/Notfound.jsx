import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/layout/Card';

function Notfound() {
  return (
    <Card>
      <h1 className='display-1'>Page not found</h1>
      <Link to='/'>Home</Link>
    </Card>
  );
}

export default Notfound;
