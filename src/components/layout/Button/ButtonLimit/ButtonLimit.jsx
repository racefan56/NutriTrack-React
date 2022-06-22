import React from 'react';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

import FormGroup from '../../Form/FormGroup/FormGroup';

import classes from './ButtonLimit.module.css';

const ButtonLimit = ({ limitId, limitValue, limitOnChange }) => {
  const limitOptions = [
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
  ];

  console.log(limitValue);

  return (
    <form className={classes.formContainer}>
      <FormGroup
        id={limitId}
        sideLabel
        label={<>Results&nbsp;Per&nbsp;Page</>}
        value={limitValue}
        inputType='select'
        selectOptions={limitOptions}
        onChange={limitOnChange}
        alwaysEditable
      />
    </form>
  );
};

export default ButtonLimit;
