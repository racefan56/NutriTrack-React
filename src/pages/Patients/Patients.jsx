import React from 'react';
import Card from '../../components/layout/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import ControlPanelSideNav from '../../components/layout/ControlPanelSideNav/ControlPanelSideNav';

import classes from './Patients.module.css';

function Patients() {
  return (
    <>
      <ControlPanelSideNav />
      <Card className={classes['card-main-control-panel']}>
        <h1>Patients control panel</h1>
      </Card>
    </>
  );
}

export default Patients;
