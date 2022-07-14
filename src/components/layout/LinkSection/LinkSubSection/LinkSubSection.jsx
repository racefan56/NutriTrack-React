import React from 'react';
import classes from './LinkSubSection.module.css';

// Used in the sideNav to organize the different links into sub groups
function LinkSubSection({ children, title }) {
  return (
    <>
      <section className={classes['section-container']}>
        <h5 className={classes['section-heading']}>{title}</h5>
        <div className='row'>{children}</div>
      </section>
    </>
  );
}

export default LinkSubSection;
