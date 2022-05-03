import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getPatient,
  updatePatient,
  deletePatient,
} from './../../features/patient/patientSlice';
import { getDiets } from './../../features/diet/dietSlice';
import { getRooms } from './../../features/room/roomSlice';

import {
  formatDate,
  ISOdateOnly,
  formEditMode,
  invalidInput,
  getToday,
  roomsAvailableByUnit,
} from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import SubContainer from '../../components/layout/SubContainer/SubContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import Modal from '../../components/layout/Modal/Modal';

import classes from './Patient.module.css';
import MealResults from '../../components/meal/MealResults/MealResults';
import { getMenuItems } from '../../features/menuItem/menuItemSlice';

const Patient = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId } = useParams();

  const { patient, patients, loading, isSuccess, isError, message } =
    useSelector((state) => state.patient);
  const { diets } = useSelector((state) => state.diet);
  const { rooms } = useSelector((state) => state.room);
  const { menuItems } = useSelector((state) => state.menuItem);

  const [editMode, setEditMode] = useState();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '1970-01-01T00:00:00.000Z',
    knownAllergies: [],
    roomNumber: { _id: '' },
    currentDiet: { _id: '' },
    mealOrders: [],
    supplements: [],
    status: 'eating',
    isHighRisk: 'false',
    createdAt: '1970-01-01T00:00:00.000Z',
    updatedAt: '1970-01-01T00:00:00.000Z',
  });
  const [availableRooms, setAvailableRooms] = useState();

  const {
    firstName,
    lastName,
    dob,
    knownAllergies,
    roomNumber,
    currentDiet,
    mealOrders,
    supplements,
    status,
    isHighRisk,
    createdAt,
    updatedAt,
  } = formData;

  useEffect(() => {
    dispatch(getPatient(patientId));
    dispatch(getDiets());
    dispatch(getRooms());
    dispatch(getMenuItems('category=supplement'));
  }, [dispatch, patientId]);

  useEffect(() => {
    if (
      rooms &&
      rooms.length > 0 &&
      patients &&
      patients.length > 0 &&
      patient
    ) {
      setAvailableRooms(roomsAvailableByUnit(rooms, patients, patient));
    }
  }, [rooms, diets, patients, patient]);

  useEffect(() => {
    if (patient) {
      setFormData({ ...patient });
    }
  }, [patient]);

  useEffect(() => {
    if (isSuccess && patient) {
      toast.success('Patient data successfully updated!');
      navigate('/patients');
    }

    if (isSuccess && !patient) {
      toast.success('Patient data successfully deleted!');
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
  }, [isError, isSuccess, message, navigate]);

  const handleChange = (e) => {
    const key = e.target.id;

    //remove inline style added to invalid inputs on submit attempts when edited
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
      dispatch(updatePatient([patientId, formData]));
    }
  };

  const handleEdit = () => {
    formEditMode(true);
    setEditMode(true);
  };

  const handleCancel = () => {
    formEditMode(false);
    setEditMode(false);
    //Reset menu item fields back to their original values
    setFormData({ ...patient });
  };

  const handleDelete = (patientId) => {
    dispatch(deletePatient(patientId));
    //After a patient is deleted, return to patients page
    if (isSuccess) {
      navigate('/patients');
      toast.success('Patient successfully deleted!');
    }
  };

  if (
    loading ||
    !patient ||
    !rooms ||
    !diets ||
    !patient ||
    !menuItems ||
    !formData ||
    !availableRooms
  ) {
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
              required
              minLength='3'
            />
            <FormGroup
              id='lastName'
              inputType='text'
              className='col-12 col-lg-4'
              label='Last Name'
              value={lastName}
              onChange={handleChange}
              editable
              required
            />
            <FormGroup
              id='dob'
              inputType='date'
              className='col-12 col-md-6 col-lg-4'
              label='DOB'
              value={ISOdateOnly(dob)}
              onChange={handleChange}
              editable
              required
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
              required
            />
            <FormGroup
              id='roomNumber'
              inputType='select'
              selectOptionsGroups={availableRooms[0]}
              groupValue='_id'
              groupLabel='roomNumber'
              className='col-12 col-md-6 col-lg-4'
              label='Room'
              value={roomNumber._id}
              onChange={handleChange}
              editable
              required
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
              required
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
              required
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
              editable
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
              editable
            />
            <FormGroup
              id='createdAt'
              inputType='text'
              className='col-12 col-md-6'
              label='Created'
              value={formatDate(createdAt)}
              readonly
            />
            <FormGroup
              id='updatedAt'
              inputType='text'
              className='col-12 col-md-6'
              label='Updated'
              value={formatDate(updatedAt)}
              readonly
            />
            {editMode ? (
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
                  onClick={handleCancel}
                />
              </FormActionBtnContainer>
            ) : (
              <FormActionBtnContainer>
                <ButtonEdit onClick={handleEdit} />
                <Modal
                  id={patientId}
                  itemName={patient.firstName + ' ' + patient.lastName}
                  onDelete={() => {
                    handleDelete(patientId);
                  }}
                  btnDelete
                />
              </FormActionBtnContainer>
            )}
          </FormContainer>

          {mealOrders ? (
            mealOrders.length > 0 ? (
              <SubContainer title='Meal Orders' altHeading='true'>
                <MealResults meals={mealOrders} />
              </SubContainer>
            ) : (
              <SubContainer
                className='mt-3'
                altHeading
                text='This patient has no meal orders.'
              />
            )
          ) : (
            <></>
          )}
        </ContainerSideNav>
      </>
    );
  }
};

export default Patient;
