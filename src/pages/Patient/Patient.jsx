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
import SubContainer from '../../components/layout/SubContainer/SubContainer';

import classes from './Patient.module.css';
import MealResults from '../../components/meal/MealResults/MealResults';

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
              inputType='text'
              className='col-4'
              label='DOB'
              value={formatDate(patient.dob, { dateOnly: true })}
            />
            <FormGroup
              inputType='text'
              className='col-4'
              label='Diet'
              value={patient.currentDiet.name}
            />
            <FormGroup
              inputType='text'
              className='col-4'
              label='High Risk'
              value={patient.isHighRisk.toString().toUpperCase()}
            />
            <FormGroup
              inputType='text'
              className='col-6'
              label='Allergies'
              value={patient.knownAllergies.toString()}
            />
            <FormGroup
              inputType='text'
              className='col-6'
              label='Supplements'
              value={patient.supplements.toString()}
            />
            <FormGroup
              inputType='text'
              className='col-6'
              label='Created'
              value={formatDate(patient.createdAt)}
            />
            <FormGroup
              inputType='text'
              className='col-6'
              label='Updated'
              value={formatDate(patient.updatedAt)}
            />
          </FormContainer>

          {patient.mealOrders.length > 0 ? (
            <SubContainer title='Meal Orders' altHeading='true'>
              <MealResults meals={patient.mealOrders} />
            </SubContainer>
          ) : (
            <SubContainer altHeading='true'>
              <p className={classes.noMeals}>This patient has no meal orders</p>
            </SubContainer>
          )}
        </ContainerSideNav>
      </>
    );
  }
};

export default Patient;
