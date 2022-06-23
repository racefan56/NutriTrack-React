import React from 'react';
import { BiSortAlt2 } from 'react-icons/bi';

import FormGroup from '../../Form/FormGroup/FormGroup';

import classes from './ButtonSort.module.css';

const ButtonSort = ({ sortId, sortValue, sortOptions, sortOnChange }) => {
  return (
    <form className={classes.formContainer}>
      <FormGroup
        id={sortId}
        sideLabel
        label={'Sort'}
        value={sortValue}
        inputType='select'
        selectOptions={sortOptions}
        onChange={sortOnChange}
        alwaysEditable
      />
    </form>
  );
};

export default ButtonSort;
