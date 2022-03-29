import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPatient } from './../../features/patient/patientSlice';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormGroup from '../../components/layout/FormGroup/FormGroup';

import classes from './Patient.module.css';

const Patient = (props) => {
  const dispatch = useDispatch();
  const { patientId } = useParams();

  useEffect(() => {
    dispatch(getPatient(patientId));
  }, [dispatch, patientId]);

  const { patient, loading } = useSelector((state) => state.patient);

  console.log(patient);

  if (loading) {
    return <Spinner />;
  }

  if (patient.roomNumber) {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <form>
            <FormGroup
              id='unit'
              label='Unit'
              type='text'
              value={patient.unit}
            />
            <FormGroup
              id='roomNumber'
              label='Room Number'
              type='number'
              value={patient.roomNumber.roomNumber}
            />
            <FormGroup
              id='firstName'
              label='First Name'
              type='text'
              value={patient.firstName}
            />
            <FormGroup
              id='lastName'
              label='Last Name'
              type='text'
              value={patient.lastName}
            />
            <FormGroup
              id='currentDiet'
              label='Diet'
              type='text'
              value={patient.currentDiet.name}
            />
            <FormGroup
              id='status'
              label='Status'
              type='text'
              value={patient.status}
            />
            <FormGroup
              id='knownAllergies'
              label='Known Allergies'
              type='text'
              value={patient.knownAllergies.toString()}
            />
            <FormGroup
              id='supplements'
              label='Supplements'
              type='text'
              value={patient.supplements.toString()}
            />
            <FormGroup
              id='isHighRisk'
              label='High Risk'
              type='text'
              value={patient.isHighRisk}
            />
            <FormGroup
              id='createdAt'
              label='Created'
              type='text'
              value={patient.createdAt}
            />
            <FormGroup
              id='updatedAt'
              label='Last Updated'
              type='text'
              value={patient.updatedAt}
            />
          </form>
        </ContainerSideNav>
      </>
    );
  } else {
    return <></>;
  }
};

export default Patient;
