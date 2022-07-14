import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowFromRight, BiArrowFromLeft } from 'react-icons/bi';

import classes from './ButtonMain.module.css';

const ButtonMain = ({
  type,
  text,
  onClick,
  path,
  className,
  previous,
  next,
  value,
}) => {
  if (type === 'Link') {
    return (
      <Link
        className={`btn ${classes.btnMain} ${className ? className : ''}`}
        onClick={onClick}
        to={path}
      >
        {next ? <BiArrowFromRight className={classes.arrowRight} /> : <></>}
        {text}
        {previous ? <BiArrowFromLeft className={classes.arrowLeft} /> : <></>}
      </Link>
    );
  }
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={`btn ${classes.btnMain} ${className ? className : ''}`}
      value={value}
    >
      {previous ? <BiArrowFromRight className={classes.arrowRight} /> : <></>}
      {text}
      {next ? <BiArrowFromLeft className={classes.arrowLeft} /> : <></>}
    </button>
  );
};

export default ButtonMain;
