import React from 'react';
import SideNav from '../../components/layout/SideNav/SideNav';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import PatientOrderResults from '../../components/PatientOrderResults/PatientOrderResults';

const PatientOrders = (props) => {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <PatientOrderResults />
      </ContainerSideNav>
    </>
  );
};

export default PatientOrders;
