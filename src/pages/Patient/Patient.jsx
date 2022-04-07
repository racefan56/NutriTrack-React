import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPatient } from './../../features/patient/patientSlice';

import { formatDate } from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';

import classes from './Patient.module.css';
import MealResults from '../../components/meal/MealResults/MealResults';
import { Form } from 'react-bootstrap';

const Patient = (props) => {
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const [firstRender, setfirstRender] = useState(true);

  useEffect(() => {
    setfirstRender(false);
    dispatch(getPatient(patientId));
  }, [dispatch, patientId]);

  const { patient, loading } = useSelector((state) => state.patient);

  if (loading || firstRender) {
    return <Spinner />;
  } else {
    const unitRoom = `${patient.unit} ${patient.roomNumber.roomNumber}`;

    const patientName = `${patient.firstName} ${patient.lastName}`;
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            status={patient.status}
            category={unitRoom}
            title={patientName}
          >
            <FormGroup
              className='col-4'
              label='DOB'
              data={formatDate(patient.dob, { dateOnly: true })}
            />
            <FormGroup
              className='col-4'
              label='Diet'
              data={patient.currentDiet.name}
            />
            <FormGroup
              className='col-4'
              label='High Risk'
              data={patient.isHighRisk.toString().toUpperCase()}
            />
            <FormGroup
              className='col-6'
              label='Allergies'
              data={patient.knownAllergies.toString()}
            />
            <FormGroup
              className='col-6'
              label='Supplements'
              data={patient.supplements.toString()}
            />
            <FormGroup
              className='col-6'
              label='Created'
              data={formatDate(patient.createdAt)}
            />
            <FormGroup
              className='col-6'
              label='Updated'
              data={formatDate(patient.updatedAt)}
            />
          </FormContainer>

          {patient.mealOrders.length > 0 ? (
            <FormContainer title='Meal Orders' altHeading='true'>
              <MealResults meals={patient.mealOrders} />
            </FormContainer>
          ) : (
            <FormContainer altHeading='true'>
              <p className={classes.noMeals}>This patient has no meal orders</p>
            </FormContainer>
          )}
        </ContainerSideNav>
      </>
    );
  }
};

export default Patient;
