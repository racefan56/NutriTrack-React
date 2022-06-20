import React from 'react';

import FormGroup from '../../Form/FormGroup/FormGroup';

import classes from './ButtonLimit.module.css';

const ButtonLimit = ({ limitId, limitValue, limitOnChange }) => {
  const limitOptions = [
    { value: 10, label: 10 },
    { value: 25, label: 25 },
    { value: 50, label: 50 },
  ];

  return (
    <form className={classes.formContainer}>
      <FormGroup
        id={limitId}
        sideLabel
        label={'Limit'}
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
