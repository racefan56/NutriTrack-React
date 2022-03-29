import React from 'react';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import SideNav from '../../components/layout/SideNav/SideNav';

import classes from './ControlPanel.module.css';

function ControlPanel() {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <h1>Admin Control Panel</h1>
      </ContainerSideNav>
    </>
  );
}

export default ControlPanel;
