import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import MenuResults from '../../components/MenuResults/MenuResults';

import classes from './Menus.module.css';

const Menus = (props) => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <MenuResults />
      </ContainerSideNav>
    </>
  );
};

export default Menus;
