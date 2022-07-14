import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import MenuItemResults from '../../components/menuItems/MenuItemResults/MenuItemResults';

const MenuItems = () => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <MenuItemResults />
      </ContainerSideNav>
    </>
  );
};

export default MenuItems;
