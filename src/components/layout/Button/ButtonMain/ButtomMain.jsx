import React from 'react';
import classes from './ButtonMain.module.css';

import { Link } from 'react-router-dom';

const ButtomMain = ({ type, text, onClick, path, className }) => {
  if (type === 'Link') {
    return (
      <Link
        className={`btn ${classes.btnMain} ${className ? className : ''}`}
        to={path}
      >
        {text}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${classes.btnMain} ${className ? className : ''}`}
    >
      {text}
    </button>
  );
};

export default ButtomMain;
