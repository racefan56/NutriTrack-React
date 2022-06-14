import React from 'react';

import {
  capitalizeWord,
  getToday,
} from '../../../helperFunctions/helperFunctions';

import classes from './FormGroup.module.css';

import { v4 as uuidv4 } from 'uuid';

const FormGroup = ({
  id,
  label,
  value,
  placeholder,
  defaultValue,
  editable,
  readonly,
  onChange,
  inputType,
  selectOptions,
  selectOptionsGroups,
  groupValue,
  groupLabel,
  checkboxOptions,
  noOptionsMessage,
  step,
  textarea,
  mealItemArr,
  mealItemObj,
  className,
}) => {
  if (mealItemArr) {
    return mealItemArr.map((item, index) => {
      return (
        <fieldset className={classes.groupContainer} key={uuidv4()}>
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
        </fieldset>
      );
    });
  }

  if (mealItemObj) {
    return (
      <fieldset className={classes.groupContainer}>
        <label
          htmlFor={label.replace(/\s+/g, '')}
          className={classes.groupLabel}
        >
          {label}:{' '}
        </label>
        <div className={classes.groupData}>
          <span className={classes.portion}>
            {mealItemObj.portionSize} {mealItemObj.portionUnit}
          </span>
          {mealItemObj.name}
        </div>
      </fieldset>
    );
  }

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
            {selectOptionsGroups ? (
              selectOptionsGroups.map((group, index) => {
                // Each element in the array is an object with two keys. The first key is the actual value that will be sent to the database on a file CRUD (usually an ID), the second key is the label used on the client side page.
                const key = Object.keys(group)[0];
                return (
                  <optgroup key={key} label={key}>
                    {[...group[key]].map((option) => {
                      return (
                        <option
                          key={`${option[groupLabel]}${index}`}
                          value={option[groupValue]}
                        >
                          {capitalizeWord(key + ' ' + option[groupLabel])}
                        </option>
                      );
                    })}
                  </optgroup>
                );
              })
            ) : (
              <></>
            )}
            {selectOptions.length === 0 ? (
              // if no options are provided, display this message
              <option>{noOptionsMessage}</option>
            ) : (
              selectOptions.map((option, index) => {
                // Each element in the array is an object with two keys. The first key is the actual value that will be sent to the database on a file CRUD (usually an ID), the second key is the label used on the client side page.
                if (Object.keys(value).length === 0 && index === 0) {
                  return (
                    <React.Fragment key={'noValFragment'}>
                      <option key={`noVal`} defaultValue>
                        -- select an option --
                      </option>
                      <option
                        key={`${option.label}${index}`}
                        value={option.value}
                      >
                        {capitalizeWord(option.label)}
                      </option>
                    </React.Fragment>
                  );
                }
                return (
                  <option key={`${option.label}${index}`} value={option.value}>
                    {capitalizeWord(option.label)}
                  </option>
                );
              })
            )}
          </select>
        </fieldset>
      </div>
    );
  }

  if (inputType === 'checkbox') {
    if (checkboxOptions.length === 0) {
      console.log('YERP');
    }
    return (
      <div className={className ? className : ''}>
        <fieldset className={`row ${classes.groupContainer}`}>
          <label htmlFor={id} className={classes.groupLabel}>
            {label}
          </label>
          {checkboxOptions.length === 0 ? (
            // if no options are provided, display this message
            <p>{noOptionsMessage}</p>
          ) : (
            checkboxOptions.map((option, index) => {
              // Each element in the array is an object with two keys. The first key is the actual value that will be sent to the database on a file CRUD (usually an ID), the second key is the label used on the client side page.
              return (
                <fieldset
                  className={`col-12 col-md-6`}
                  key={`${option.value}${index}`}
                >
                  {value ? (
                    value.includes(option.value) ? (
                      <label>
                        <input
                          className={`${editable ? 'editable' : ''} ${
                            classes.inputCheck
                          }`}
                          type='checkbox'
                          id={id}
                          name={id}
                          value={option.value}
                          onChange={onChange}
                          defaultChecked
                          disabled
                        />
                        {capitalizeWord(option.label)}
                      </label>
                    ) : (
                      <label>
                        <input
                          className={`${editable ? 'editable' : ''} ${
                            classes.inputCheck
                          }`}
                          type='checkbox'
                          id={id}
                          name={id}
                          value={option.value}
                          onChange={onChange}
                          disabled
                        />
                        {capitalizeWord(option.label)}
                      </label>
                    )
                  ) : (
                    <></>
                  )}
                </fieldset>
              );
            })
          )}
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
                  className={`${editable ? 'editable' : ''} ${classes.input} ${
                    readonly ? classes.readonly : ''
                  }`}
                  defaultValue={defaultValue}
                  disabled={editable ? true : false}
                  readOnly={readonly ? true : false}
                />
              )}
            </>
          ) : (
            <></>
          )}
          {!defaultValue ? (
            <>
              {textarea && (
                <textarea
                  id={id}
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  placeholder={placeholder}
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
                  placeholder={placeholder}
                  onChange={onChange}
                />
              )}
              {inputType === 'text' && (
                <input
                  id={id}
                  type='text'
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
              )}
              {inputType === 'date' && (
                <input
                  id={id}
                  type='date'
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
              )}
              {inputType === 'password' && (
                <input
                  id={id}
                  type='password'
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
              )}
              {inputType === 'email' && (
                <input
                  id={id}
                  type='email'
                  className={`${editable ? 'editable' : ''} ${classes.input}`}
                  disabled
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
              )}
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
