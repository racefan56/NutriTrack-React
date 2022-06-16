import React, { useState } from 'react';
import { BiFilter } from 'react-icons/bi';

import FormGroup from '../../Form/FormGroup/FormGroup';

import classes from './ButtonFilter.module.css';

const ButtonFilter = ({ filterOptions }) => {
  const [isVisibile, setIsVisibile] = useState(false);
  const [filter, setFilter] = useState('');

  return (
    <span
      title='Filter'
      onClick={() => setIsVisibile(true)}
      className={classes.filterBtnContainer}
    >
      <BiFilter
        className={isVisibile ? classes.filterBtnActive : classes.filterBtn}
      />
      {isVisibile && (
        <form className={classes.filterForm}>
          {filterOptions ? (
            Object.entries(filterOptions).map((option) => {
              console.log(option);
              return (
                <FormGroup
                  id={`filter${option[0]}`}
                  label={option[0]}
                  value={filter}
                  inputType='select'
                  selectOptions={option[1]}
                  alwaysEditable
                />
              );
            })
          ) : (
            <></>
          )}
        </form>
      )}
    </span>
  );
};

export default ButtonFilter;
