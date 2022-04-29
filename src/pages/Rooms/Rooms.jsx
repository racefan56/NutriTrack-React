import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import RoomResults from '../../components/RoomResults/RoomResults';

import classes from './Rooms.module.css';

const Rooms = (props) => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <RoomResults />
      </ContainerSideNav>
    </>
  );
};

export default Rooms;
