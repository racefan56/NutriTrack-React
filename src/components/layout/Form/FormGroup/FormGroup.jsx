import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import classes from './FormGroup.module.css';

import { v4 as uuidv4 } from 'uuid';

const FormGroup = ({
  label,
  value,
  editable,
  inputType,
  radioName,
  radioOptions,
  step,
  textarea,
  mealItemArr,
  mealItemObj,
  className,
}) => {
  const [searchParams] = useSearchParams({});
  const [inputValue, setinputValue] = useState(value);

  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      const elements = [...document.getElementsByClassName('editable')];
      elements.map((el) => {
        return (el.disabled = false);
      });
    } else {
      const elements = [...document.getElementsByClassName('editable')];
      elements.map((el) => {
        return (el.disabled = true);
      });
    }
  }, [searchParams]);

  const handleValueChange = (e) => {
    setinputValue(e.target.value);
  };

  const handleRadioValueChange = (option) => {
    setinputValue(option);
  };

  return (
    <div className={`${className ? className : ''}`}>
      {label && inputType !== 'radio' ? (
        <label
          htmlFor={label.replace(/\s+/g, '')}
          className={classes.groupLabel}
        >
          {label}
        </label>
      ) : (
        <></>
      )}
      <div className={classes.groupContainer}>
        {value ? (
          <>
            {textarea && (
              <textarea
                id={label.replace(/\s+/g, '')}
                className={`${editable ? 'editable' : ''} ${classes.input}`}
                disabled
                value={inputValue}
                onChange={handleValueChange}
              />
            )}
            {inputType === 'number' && (
              <input
                id={label.replace(/\s+/g, '')}
                type='number'
                step={step ? step : ''}
                className={`${editable ? 'editable' : ''} ${classes.input}`}
                disabled
                value={inputValue}
                onChange={handleValueChange}
              />
            )}
            {inputType === 'text' && (
              <input
                id={label.replace(/\s+/g, '')}
                type='text'
                className={`${editable ? 'editable' : ''} ${classes.input}`}
                disabled
                value={inputValue}
                onChange={handleValueChange}
              />
            )}
            {inputType === 'radio' &&
              radioOptions.map((option, index) => {
                return (
                  <div key={option}>
                    {index === 0 ? (
                      <p className={classes.radioGroupLabel}>{label}</p>
                    ) : (
                      <></>
                    )}
                    <label
                      htmlFor={option.replace(/\s+/g, '')}
                      className={classes.radioLabel}
                    >
                      {option}:{' '}
                    </label>

                    <input
                      id={option.replace(/\s+/g, '')}
                      type='radio'
                      name={radioName}
                      className={`${editable ? 'editable' : ''} ${
                        (classes.input, classes.radioInput)
                      }`}
                      disabled
                      value={inputValue}
                      checked={inputValue === option}
                      onChange={() => handleRadioValueChange(option)}
                    />
                  </div>
                );
              })}
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
        ) : (
          <>
            <div className={classes.groupData}>
              <span className={classes.portion}>
                {mealItemObj.portionSize} {mealItemObj.portionUnit}
              </span>
              {mealItemObj.name}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormGroup;
