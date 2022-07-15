import React from 'react';
import classes from './ContainerSideNav.module.css';

// Main container used when a sideNav is present
const ContainerSideNav = ({ children, className }) => {
  return (
    <div
      className={`card ${classes['card-main-control-panel']} ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ContainerSideNav;
