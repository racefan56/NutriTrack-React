import React from 'react';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import SideNav from '../../components/layout/SideNav/SideNav';
import PatientResults from '../../components/patients/PatientResults/PatientResults';

import classes from './Patients.module.css';

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
