import React from 'react';
import classes from './ContainerSideNav.module.css';

const ContainerSideNav = ({ children, className }) => {
  return (
    <div
      className={`container card ${classes['card-main-control-panel']} ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ContainerSideNav;
