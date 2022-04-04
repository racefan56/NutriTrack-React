import React from 'react';
import classes from './FormGroup.module.css';

const FormGroup = ({ id, label, type, value, fgClass }) => {
  return (
    <div className={`form-group ${fgClass ? fgClass : ''}`}>
      <label htmlFor='roomNumber'>{label}</label>
      <input
        type={type}
        className={`${classes.formInput}`}
        id={id}
        value={value}
        readOnly
      />
    </div>
  );
};

export default FormGroup;
