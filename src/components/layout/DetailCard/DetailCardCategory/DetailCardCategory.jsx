import React from 'react';
import classes from './DetailCardCategory.module.css';

const DetailCardCategory = ({ children, title }) => {
  return (
    <>
      <h3 className={classes.title}>{title}</h3>
      {children}
    </>
  );
};

export default DetailCardCategory;
