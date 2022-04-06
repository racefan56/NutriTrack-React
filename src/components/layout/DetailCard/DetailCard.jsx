import React from 'react';

import classes from './DetailCard.module.css';

function DetailCard({ children, status, category, title, altHeading }) {
  return (
    <div className={classes.DetailCardContainer}>
      <div className={altHeading ? classes.altHeading : classes.heading}>
        {status ? (
          <div
            className={`${classes.statusTag} ${
              status === 'eating' ? classes.eating : classes.npo
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

      <div className='row m-0'>{children}</div>
    </div>
  );
}

export default DetailCard;
