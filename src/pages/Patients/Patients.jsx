import React from 'react';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import PatientResults from '../../components/patients/PatientResults/PatientResults';

function Patients() {
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <PatientResults />
      </ContainerSideNav>
    </>
  );
}

export default Patients;
