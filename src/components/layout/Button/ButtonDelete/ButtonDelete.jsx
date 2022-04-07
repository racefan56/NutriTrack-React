import React from 'react';
import classes from './ButtonDelete.module.css';

const ButtonDelete = ({ type, text, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${classes.btnDelete} ${className ? className : ''}`}
    >
      {text}
    </button>
  );
};

export default ButtonDelete;
