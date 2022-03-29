import React from 'react';
import Card from '../../components/layout/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import ControlPanelSideNav from '../../components/layout/ControlPanelSideNav/ControlPanelSideNav';

import classes from './ControlPanel.module.css';

function ControlPanel() {
  return (
    <>
      <ControlPanelSideNav />
      <Card className={classes['card-main-control-panel']}>
        <h1>Admin Control Panel</h1>
      </Card>
    </>
  );
}

export default ControlPanel;
