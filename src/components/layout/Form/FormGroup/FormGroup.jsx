import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { capitalizeWord } from '../../../helperFunctions/helperFunctions';

import classes from './FormGroup.module.css';

import { v4 as uuidv4 } from 'uuid';

const FormGroup = ({
  id,
  label,
  value,
  defaultValue,
  editable,
  onChange,
  inputType,
  selectOptions,
  step,
  textarea,
  mealItemArr,
  mealItemObj,
  className,
}) => {
  if (inputType === 'select') {
    return (
      <div className={className ? className : ''}>
        <fieldset className={classes.groupContainer}>
          <label htmlFor={id} className={classes.groupLabel}>
            {label}
          </label>
          <select
            id={id}
            name={id}
            className={`${editable ? 'editable' : ''} ${classes.input}`}
            disabled
            value={value}
            onChange={onChange}
          >
            {selectOptions.map((option, index) => {
              return (
                <option key={`${option}${index}`} value={option}>
                  {capitalizeWord(option)}
                </option>
              );
            })}
          </select>
        </fieldset>
      </div>
    );
  }

  return (
    <div className={className ? className : ''}>
      <fieldset className={classes.groupContainer}>
        {label ? (
          <label htmlFor={id} className={classes.groupLabel}>
            {label}
          </label>
        ) : (
          <></>
        )}
        <>
          {defaultValue ? (
            <>
              {inputType === 'text' && (
                <input
                  id={id}
                  type='text'
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  defaultValue={defaultValue}
                  disabled
                />
              )}
            </>
          ) : (
            <></>
          )}
          {value ? (
            <>
              {textarea && (
                <textarea
                  id={id}
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  value={value}
                  onChange={onChange}
                />
              )}
              {inputType === 'number' && (
                <input
                  id={id}
                  type='number'
                  step={step ? step : ''}
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  value={value}
                  onChange={onChange}
                />
              )}
              {inputType === 'text' && (
                <input
                  id={id}
                  type='text'
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  value={value}
                  onChange={onChange}
                />
              )}
              {inputType === 'select' && (
                <select
                  id={id}
                  name={id}
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  value={value}
                  onChange={onChange}
                >
                  {selectOptions.map((option, index) => {
                    return (
                      <option key={`${option}${index}`} value={option}>
                        {capitalizeWord(option)}
                      </option>
                    );
                  })}
                </select>
              )}
            </>
          ) : mealItemArr ? (
            mealItemArr.map((item, index) => {
              return (
                <React.Fragment key={uuidv4()}>
                  {index === 0 ? (
                    <label
                      htmlFor={label.replace(/\s+/g, '')}
                      className={classes.groupLabel}
                    >
                      {label}:{' '}
                    </label>
                  ) : (
                    <></>
                  )}
                  <div className={classes.groupData}>
                    <span className={classes.portion}>
                      {item.portionSize} {item.portionUnit}
                    </span>
                    {item.name}
                  </div>
                </React.Fragment>
              );
            })
          ) : mealItemObj ? (
            <>
              <div className={classes.groupData}>
                <span className={classes.portion}>
                  {mealItemObj.portionSize} {mealItemObj.portionUnit}
                </span>
                {mealItemObj.name}
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      </fieldset>
    </div>
  );
};

export default FormGroup;
