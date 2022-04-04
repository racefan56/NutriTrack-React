import React from 'react';
import classes from './DetailCardGroup.module.css';

const DetailCardGroup = ({ label, data }) => {
  return (
    <div className={classes.groupContainer}>
      <span className={classes.groupLabel}>{label}</span>:{' '}
      <span className={classes.groupData}>{data}</span>
    </div>
  );
};

export default DetailCardGroup;
