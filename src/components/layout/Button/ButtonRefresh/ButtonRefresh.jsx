import React from 'react';
import classes from './ButtonRefresh.module.css';
import { BiRefresh } from 'react-icons/bi';

const ButtonRefresh = ({ refresh }) => {
  return (
    <span title='Refresh' className={classes.refreshBtnContainer}>
      <BiRefresh className={classes.refreshBtn} onClick={refresh} />
    </span>
  );
};

export default ButtonRefresh;
