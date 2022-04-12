import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import classes from './ButtonEdit.module.css';

const ButtonEdit = ({ path, className }) => {
  const navigate = useNavigate();
  const curPath = window.location.pathname;

  const editItem = () => {
    return navigate({
      pathname: `${path ? path : `${curPath}`}`,
      search: createSearchParams({ edit: 'true' }).toString(),
    });
  };

  return (
    <button
      onClick={() => editItem()}
      type='button'
      className={`btn ${classes.btnEdit} ${className ? className : ''}`}
    >
      Edit
    </button>
  );
};

export default ButtonEdit;
