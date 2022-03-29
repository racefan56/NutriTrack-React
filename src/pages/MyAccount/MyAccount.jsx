import React from 'react';
import Card from '../../components/layout/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import ControlPanelSideNav from '../../components/layout/ControlPanelSideNav/ControlPanelSideNav';

import classes from './MyAccount.module.css';

function MyAccount() {
  return (
    <>
      <ControlPanelSideNav />
      <Card className={classes['card-main-control-panel']}>
        <h1>My Account</h1>
      </Card>
    </>
  );
}

export default MyAccount;
