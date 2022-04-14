import React from 'react';

import classes from './ButtonEdit.module.css';

const ButtonEdit = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`btn ${classes.btnEdit} ${className ? className : ''}`}
    >
      Edit
    </button>
  );
};

export default ButtonEdit;
