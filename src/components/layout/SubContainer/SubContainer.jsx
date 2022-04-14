import React from 'react';
import classes from './SubContainer.module.css';

const SubContainer = ({ children, title, altHeading }) => {
  return (
    <div className={classes.subContainer}>
      <div className={altHeading ? classes.altHeading : classes.heading}>
        <div className={altHeading ? classes.titleDivAlt : classes.titleDiv}>
          <span className={classes.titleSpan}>{title}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SubContainer;
