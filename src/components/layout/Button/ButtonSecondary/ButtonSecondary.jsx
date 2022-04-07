import React from 'react';
import classes from './ButtonSecondary.module.css';

import { Link } from 'react-router-dom';

const ButtonSecondary = ({ type, text, onClick, path, className }) => {
  if (type === 'Link') {
    return (
      <Link className={`btn ${classes.btnSecondary}`} to={path}>
        {text}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${classes.btnSecondary} ${className ? className : ''}`}
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;