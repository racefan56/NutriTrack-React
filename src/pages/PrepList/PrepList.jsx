import React from 'react';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import PrepListResults from '../../components/PrepListResults/PrepListResults';

const PrepList = (props) => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <PrepListResults />
      </ContainerSideNav>
    </>
  );
};

export default PrepList;
