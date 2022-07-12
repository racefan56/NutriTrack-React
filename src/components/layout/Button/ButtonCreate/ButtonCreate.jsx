import React from 'react';
import { Link } from 'react-router-dom';

import { BiPlus } from 'react-icons/bi';

import classes from './ButtonCreate.module.css';

const ButtonCreate = ({ path }) => {
  return (
    <div className={classes.btnCreateContainer}>
      <Link title='Create' to={path}>
        <BiPlus className={classes.btnCreate} />
      </Link>
    </div>
  );
};

export default ButtonCreate;
