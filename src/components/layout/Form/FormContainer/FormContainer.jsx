import React from 'react';
import classes from './FormContainer.module.css';

const FormContainer = ({
  children,
  status,
  category,
  title,
  altHeading,
  onSubmit,
}) => {
  return (
    <div className={classes.formContainer}>
      <div className={altHeading ? classes.altHeading : classes.heading}>
        {status ? (
          <div
            className={`${classes.statusTag} ${
              status === 'Eating' ? classes.eating : classes.npo
            }`}
          >
            {status}
          </div>
        ) : (
          <></>
        )}

        <div
          className={
            altHeading ? classes.categoryTitleDivAlt : classes.categoryTitleDiv
          }
        >
          {category ? (
            <span className={classes.categorySpan}>{category}</span>
          ) : (
            <></>
          )}
          <span className={classes.titleSpan}>{title}</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className='row m-0'>
        {children}
      </form>
    </div>
  );
};

export default FormContainer;
