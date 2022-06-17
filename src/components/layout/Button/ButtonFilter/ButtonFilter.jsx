import React, { useState } from 'react';
import { BiFilter } from 'react-icons/bi';

import { capitalizeWord } from '../../../helperFunctions/helperFunctions';

import FormGroup from '../../Form/FormGroup/FormGroup';
import ButtonMain from '../ButtonMain/ButtonMain';
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';

import classes from './ButtonFilter.module.css';

const ButtonFilter = ({
  filterHeading,
  filterOptions,
  filterValues,
  filterOnChange,
  filterSubmit,
}) => {
  const [isVisibile, setIsVisibile] = useState(false);

  console.log(filterOptions);

  return (
    <>
      <span
        title='Filter'
        onClick={() => setIsVisibile(true)}
        className={classes.filterBtnContainer}
      >
        <BiFilter
          className={isVisibile ? classes.filterBtnActive : classes.filterBtn}
        />
      </span>
      {isVisibile && (
        <div className={classes.filterContainer}>
          <form className={classes.filterForm}>
            <div className={classes.heading}>Filter {filterHeading} </div>
            {filterOptions ? (
              Object.entries(filterOptions).map((option, index) => {
                return (
                  <FormGroup
                    id={option[0]}
                    key={option[0]}
                    label={capitalizeWord(option[0])}
                    value={filterValues[index]}
                    inputType='select'
                    selectOptions={option[1]}
                    onChange={filterOnChange}
                    alwaysEditable
                  />
                );
              })
            ) : (
              <></>
            )}
            <div className={classes.btnContainer}>
              <ButtonMain onClick={filterSubmit} text='Filter Results' />
              <ButtonSecondary
                className={'my-3'}
                text='Cancel'
                onClick={() => setIsVisibile(false)}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ButtonFilter;
