import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPatient } from './../../features/patient/patientSlice';
import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';

import classes from './Patient.module.css';

const Patient = (props) => {
  const dispatch = useDispatch();

  const { patient, loading } = useSelector((state) => state.patient);
  const { patientId } = useParams();

  useEffect(() => {
    dispatch(getPatient(patientId));
  }, [dispatch, patientId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <SideNav />
      <ContainerSideNav>
        <h1>{patient.firstName}</h1>
      </ContainerSideNav>
    </>
  );
};

export default Patient;
