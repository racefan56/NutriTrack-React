import React from 'react';
import classes from './DetailCardCategory.module.css';

const DetailCardCategory = ({ children, title, className }) => {
  return (
    <div className={className ? className : ''}>
      <h3 className={classes.title}>{title}</h3>
      {children}
    </div>
  );
};

export default DetailCardCategory;
