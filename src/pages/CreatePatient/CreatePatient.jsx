import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createPatient } from './../../features/patient/patientSlice';
import { getDiets } from './../../features/diet/dietSlice';
import { getRooms } from './../../features/room/roomSlice';
import { getMenuItems } from '../../features/menuItem/menuItemSlice';

import {
  ISOdateOnly,
  getToday,
  invalidInput,
  roomsAvailableByUnit,
} from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SubContainer from '../../components/layout/SubContainer/SubContainer';
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

  const { patient, patients, loading, isSuccess, isError, message } =
    useSelector((state) => state.patient);
  const { diets } = useSelector((state) => state.diet);
  const { rooms } = useSelector((state) => state.room);
  const { menuItems } = useSelector((state) => state.menuItem);

  const initialFormState = {
    firstName: '',
    lastName: '',
    dob: '1970-01-01',
    knownAllergies: [],
    roomNumber: '',
    currentDiet: '',
    supplements: [],
    status: 'NPO',
    isHighRisk: 'true',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [availableRooms, setAvailableRooms] = useState();

  const [enableForm] = useState(true);

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
    dispatch(getRooms('isOutOfService=false'));
    dispatch(getMenuItems('category=supplement'));
  }, [dispatch]);

  useEffect(() => {
    if (rooms && rooms[0] && diets && diets[0]) {
      setAvailableRooms(roomsAvailableByUnit(rooms, patients));
    }
  }, [rooms, diets, patients]);

  useEffect(() => {
    if (availableRooms && availableRooms[1].length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        roomNumber: availableRooms[1][0],
        currentDiet: diets[0]._id,
      }));
    }
  }, [availableRooms, diets]);

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

  if (loading || !diets || !menuItems || !rooms || !availableRooms) {
    return <Spinner />;
  } else if (availableRooms[1].length > 0) {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Create Patient'
            title={`${firstName} ${lastName}`}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='firstName'
              inputType='text'
              className='col-12 col-lg-4'
              label='First Name'
              value={firstName}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='lastName'
              inputType='text'
              className='col-12 col-lg-4'
              label='Last Name'
              value={lastName}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='dob'
              inputType='date'
              className='col-12 col-md-6 col-lg-4'
              label='DOB'
              value={ISOdateOnly(dob)}
              onChange={handleChange}
              alwaysEditable
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
              alwaysEditable
            />
            <FormGroup
              id='roomNumber'
              inputType='select'
              selectOptionsGroups={roomsAvailableByUnit(rooms, patients)[0]}
              groupValue='_id'
              groupLabel='roomNumber'
              className='col-12 col-md-6 col-lg-4'
              label='Room'
              value={roomNumber._id}
              onChange={handleChange}
              alwaysEditable
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
              alwaysEditable
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
              alwaysEditable
            />
            <FormGroup
              id='supplements'
              inputType='checkbox'
              checkboxOptions={menuItems.map((item) => {
                return { value: item._id, label: item.name };
              })}
              className='col-12 col-lg-6'
              label='Supplements'
              value={supplements}
              onChange={handleChange}
              alwaysEditable
              required
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
              alwaysEditable
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
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <SubContainer
            altHeading
            title={`Can't Create New Patient`}
            text='All rooms are currently occupied.'
          />
        </ContainerSideNav>
      </>
    );
  }
};

export default CreatePatient;
