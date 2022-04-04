import React from 'react';
import classes from './DetailCardCategory.module.css';

const DetailCardCategory = ({ children, title }) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
};

export default DetailCardCategory;
