import React from 'react';

import Modal from '../../Modal/Modal';

import classes from './ButtonDelete.module.css';

const ButtonDelete = ({ className, onClick }) => {
  return (
    <>
      <button
        type='Button'
        onClick={onClick}
        className={`btn ${classes.btnDelete} ${className ? className : ''}`}
      >
        Delete
      </button>
    </>
  );
};

export default ButtonDelete;
