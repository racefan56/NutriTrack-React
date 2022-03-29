import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MenuLink.module.css';

const MenuLink = ({ to, text }) => {
  return (
    <Link
      className={`${classes['control-panel-link']}  col-md-12 col-lg-6`}
      to={to}
    >
      {text}
    </Link>
  );
};

export default MenuLink;
