import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import UserResults from '../../components/UserResults/UserResults';

const Users = () => {
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
