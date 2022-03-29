import React from 'react';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import SideNav from '../../components/layout/SideNav/SideNav';

import classes from './MyAccount.module.css';

function MyAccount() {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <h1>My Account</h1>
      </ContainerSideNav>
    </>
  );
}

export default MyAccount;
