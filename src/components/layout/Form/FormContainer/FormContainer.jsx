import React from 'react';
import classes from './FormContainer.module.css';

// Used for forms that generally use the same display structure with a preceeding heading with a title and other possible info
const FormContainer = ({
  children,
  status,
  category,
  title,
  subTitle,
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
        {subTitle ? (
          <div className={classes.subTitle}> {subTitle} </div>
        ) : (
          <></>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className={`row m-0 ${classes.form}`}
      >
        {children}
      </form>
    </div>
  );
};

export default FormContainer;
