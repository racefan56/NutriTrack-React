import React from 'react';
import { BiRefresh } from 'react-icons/bi';

import classes from './ButtonRefresh.module.css';

const ButtonRefresh = ({ refresh }) => {
  return (
    <span title='Refresh'>
      <BiRefresh className={classes.refreshBtn} onClick={refresh} />
    </span>
  );
};

export default ButtonRefresh;
