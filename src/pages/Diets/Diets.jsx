import React from 'react';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import DietResults from '../../components/DietResults/DietResults';

const Diets = () => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <DietResults />
      </ContainerSideNav>
    </>
  );
};

export default Diets;
