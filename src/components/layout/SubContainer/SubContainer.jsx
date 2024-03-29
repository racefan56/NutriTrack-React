import React from 'react';
import classes from './SubContainer.module.css';

const SubContainer = ({ children, altHeading, title, text, className }) => {
  return (
    <div className={`${className ? className : ''} ${classes.subContainer}`}>
      <div className={altHeading ? classes.altHeading : classes.heading}>
        <div className={altHeading ? classes.titleDivAlt : classes.titleDiv}>
          <span className={classes.titleSpan}>{title}</span>
        </div>
      </div>
      {text}
      {children}
    </div>
  );
};

export default SubContainer;
