import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import UnitResults from '../../components/UnitResults/UnitResults';

const Units = () => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <UnitResults />
      </ContainerSideNav>
    </>
  );
};

export default Units;
