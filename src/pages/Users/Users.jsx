import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import UserResults from '../../components/UserResults/UserResults';

import classes from './Users.module.css';

const Users = (props) => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <UserResults />
      </ContainerSideNav>
    </>
  );
};

export default Users;
