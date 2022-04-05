import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPatient } from './../../features/patient/patientSlice';

import formatDate from '../../components/helperFunctions/formatDate';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import DetailCard from '../../components/layout/DetailCard/DetailCard';
import DetailCardGroup from '../../components/layout/DetailCard/DetailCardGroup/DetailCardGroup';

import classes from './Patient.module.css';
import MealResults from '../../components/meal/MealResults/MealResults';

const Patient = (props) => {
  const dispatch = useDispatch();
  const { patientId } = useParams();

  useEffect(() => {
    dispatch(getPatient(patientId));
  }, [dispatch, patientId]);

  const { patient, loading } = useSelector((state) => state.patient);

  if (loading) {
    return <Spinner />;
  }

  if (patient.roomNumber) {
    console.log(patient);

    const unitRoom = `${patient.unit} ${patient.roomNumber.roomNumber}`;

    const patientName = `${patient.firstName} ${patient.lastName}`;

    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <DetailCard
            status={patient.status}
            category={unitRoom}
            title={patientName}
          >
            <DetailCardGroup
              className='col-4'
              label='DOB'
              data={formatDate(patient.dob, { dateOnly: true })}
            />
            <DetailCardGroup
              className='col-4'
              label='Diet'
              data={patient.currentDiet.name}
            />
            <DetailCardGroup
              className='col-4'
              label='High Risk'
              data={patient.isHighRisk.toString().toUpperCase()}
            />
            <DetailCardGroup
              className='col-6'
              label='Allergies'
              data={patient.knownAllergies.toString()}
            />
            <DetailCardGroup
              className='col-6'
              label='Supplements'
              data={patient.supplements.toString()}
            />
            <DetailCardGroup
              className='col-6'
              label='Created'
              data={formatDate(patient.createdAt)}
            />
            <DetailCardGroup
              className='col-6'
              label='Updated'
              data={formatDate(patient.updatedAt)}
            />
          </DetailCard>

          {patient.mealOrders.length > 0 ? (
            <DetailCard title='Meal Orders' altHeading='true'>
              <MealResults meals={patient.mealOrders} />
            </DetailCard>
          ) : (
            <DetailCard altHeading='true'>
              <p className={classes.noMeals}>This patient has no meal orders</p>
            </DetailCard>
          )}
        </ContainerSideNav>
      </>
    );
  } else {
    return <></>;
  }
};

export default Patient;
