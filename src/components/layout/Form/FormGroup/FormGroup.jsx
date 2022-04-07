import React from 'react';
import classes from './FormGroup.module.css';

import { v4 as uuidv4 } from 'uuid';

const FormGroup = ({ label, data, mealItemArr, mealItemObj, className }) => {
  return (
    <div className={`${className ? className : ''}`}>
      <div className={classes.groupContainer}>
        {data ? (
          <>
            <label
              htmlFor={label.replace(/\s+/g, '')}
              className={classes.groupLabel}
            >
              {label}:{' '}
            </label>
            <input
              id={label.replace(/\s+/g, '')}
              className={classes.groupData}
              disabled
              value={data}
            />
          </>
        ) : mealItemArr ? (
          mealItemArr.map((item, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                {index === 0 ? (
                  <div className={classes.groupLabel}>{label}</div>
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
            <div className={classes.groupLabel}>{label} </div>
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
