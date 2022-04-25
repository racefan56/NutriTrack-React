import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createPatient } from './../../features/patient/patientSlice';
import { getDiets } from './../../features/diet/dietSlice';
import { getRooms } from './../../features/room/roomSlice';

import {
  formEditMode,
  ISOdateOnly,
  titleCase,
  getToday,
  invalidInput,
  roomsAvailableByUnit,
} from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import Modal from '../../components/layout/Modal/Modal';

import classes from './CreatePatient.module.css';

const CreatePatient = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  formEditMode(true);

  const { patient, patients, loading, isSuccess, isError, message } =
    useSelector((state) => state.patient);
  const { diets } = useSelector((state) => state.diet);
  const { rooms } = useSelector((state) => state.room);

  const initialFormState = {
    firstName: '',
    lastName: '',
    dob: '1970-01-01',
    knownAllergies: [],
    roomNumber: rooms[0] ? rooms[0]._id : '',
    currentDiet: diets[0] ? diets[0]._id : '',
    supplements: 'none',
    status: 'NPO',
    isHighRisk: 'true',
  };

  const [formData, setFormData] = useState(initialFormState);

  const {
    firstName,
    lastName,
    dob,
    knownAllergies,
    roomNumber,
    currentDiet,
    supplements,
    status,
    isHighRisk,
  } = formData;

  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRooms());
  }, [dispatch]);

  useEffect(() => {
    if (rooms[0] && diets[0]) {
      setFormData((prevState) => ({
        ...prevState,
        roomNumber: rooms[0]._id,
        currentDiet: diets[0]._id,
      }));
    }
  }, [rooms, diets]);

  useEffect(() => {
    if (isSuccess && patient) {
      navigate(`/patients/${patient._id}`);
    }

    if (isSuccess) {
      toast.success('Patient data successfully created!');
      navigate('/patients');
    }

    if (isError) {
      if (message.keyValue?.roomNumber) {
        toast.error('That room is currently occupied.');
      }

      if (message.message) {
        toast.error(message.message);
      }
    }
  }, [isError, isSuccess, message, navigate, patient]);

  const openModal = (id) => {
    document.getElementById(id).style.display = 'flex';
  };

  const closeModal = (id) => {
    document.getElementById(id).style.display = 'none';
  };

  const handleChange = (e) => {
    const key = e.target.id;

    //remove inline style added to invalid inputs on submit attempt
    if (e.target.style) {
      e.target.removeAttribute('style');
    }

    if (e.target.type === 'checkbox') {
      const checked = Array.from(
        document.querySelectorAll(`input[type=checkbox][name=${key}]:checked`),
        (e) => e.value
      );
      return setFormData((prevState) => ({
        ...prevState,
        [key]: [...checked],
      }));
    }

    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName.length < 1 || lastName.length < 1 || dob > getToday()) {
      if (firstName.length < 1) {
        invalidInput('firstName');
        toast.error('First name is required.');
      }
      if (lastName.length < 1) {
        invalidInput('lastName');
        toast.error('Last name is required.');
      }
      if (dob > getToday()) {
        invalidInput('dob');
        toast.error(`DOB can't be in the future`);
      }
    } else {
      dispatch(createPatient(formData));
    }
  };

  const handleCancel = () => {
    closeModal('confirmCancel');
  };

  const handleConfirm = () => {
    navigate('/patients');
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            title={titleCase('Create Patient')}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='firstName'
              inputType='text'
              className='col-12 col-lg-4'
              label='First Name'
              value={firstName}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='lastName'
              inputType='text'
              className='col-12 col-lg-4'
              label='Last Name'
              value={lastName}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='dob'
              inputType='date'
              className='col-12 col-md-6 col-lg-4'
              label='DOB'
              value={ISOdateOnly(dob)}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='status'
              inputType='select'
              selectOptions={[
                { value: 'Eating', label: 'Eating' },
                { value: 'NPO', label: 'NPO' },
              ]}
              className='col-12 col-md-6 col-lg-4'
              label='Status'
              value={status}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='roomNumber'
              inputType='select'
              selectOptionsGroups={roomsAvailableByUnit(rooms, patients)}
              groupValue='_id'
              groupLabel='roomNumber'
              className='col-12 col-md-6 col-lg-4'
              label='Room'
              value={roomNumber._id}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='isHighRisk'
              inputType='select'
              selectOptions={[
                { value: 'true', label: 'true' },
                { value: 'false', label: 'false' },
              ]}
              className='col-12 col-md-6 col-lg-4'
              label='High Risk'
              value={isHighRisk.toString()}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='currentDiet'
              inputType='select'
              selectOptions={diets.map((diet) => {
                return { value: diet._id, label: diet.name };
              })}
              className='col-12 col-lg-6'
              label='Diet'
              value={currentDiet._id}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='supplements'
              inputType='text'
              className='col-12 col-lg-6'
              label='Supplements'
              value={supplements.toString()}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='knownAllergies'
              inputType='checkbox'
              checkboxOptions={[
                { value: 'milk', label: 'milk' },
                { value: 'eggs', label: 'eggs' },
                { value: 'fish', label: 'fish' },
                { value: 'shellfish', label: 'shellfish' },
                { value: 'tree nuts', label: 'tree nuts' },
                { value: 'peanuts', label: 'peanuts' },
                { value: 'wheat', label: 'wheat' },
                { value: 'soybean', label: 'soybean' },
              ]}
              className='col-12 col-lg-7'
              label='Allergies'
              value={knownAllergies}
              onChange={handleChange}
              editable
            />
            <FormActionBtnContainer>
              <ButtonMain
                className='mx-3'
                text='Submit'
                type='Submit'
                onClick={handleSubmit}
              />
              <ButtonSecondary
                className='m-3'
                text='Cancel'
                type='Button'
                onClick={() => openModal('confirmCancel')}
              />
              <Modal
                heading='Are you sure?'
                message='Any unsaved changes will be lost.'
                id='confirmCancel'
                handleCancel={handleCancel}
                handleConfirm={handleConfirm}
              />
            </FormActionBtnContainer>
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default CreatePatient;
