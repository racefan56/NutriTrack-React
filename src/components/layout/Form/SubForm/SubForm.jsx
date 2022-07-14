import React from 'react';
import classes from './SubForm.module.css';

const SubForm = ({ children, title, className }) => {
  return (
    <form className={className ? className : ''}>
      <h3 className={classes.title}>{title}</h3>
      {children}
    </form>
  );
};

export default SubForm;
