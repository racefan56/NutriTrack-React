import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient } from './../../features/patient/patientSlice';
import { getDiets } from './../../features/diet/dietSlice';

import {
  capitalizeWord,
  formatDate,
  formEditMode,
} from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import SubContainer from '../../components/layout/SubContainer/SubContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import Modal from '../../components/layout/Modal/Modal';

import classes from './Patient.module.css';
import MealResults from '../../components/meal/MealResults/MealResults';

const Patient = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId } = useParams();

  const { patient, loading } = useSelector((state) => state.patient);
  const { diets } = useSelector((state) => state.diet);

  const [firstRender, setfirstRender] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    knownAllergies: [],
    unit: 'ER',
    roomNumber: {},
    currentDiet: {},
    supplements: [],
    status: 'eating',
    isHighRisk: false,
  });

  const {
    firstName,
    lastName,
    dob,
    knownAllergies,
    unit,
    roomNumber,
    currentDiet,
    supplements,
    status,
    isHighRisk,
  } = formData;

  useEffect(() => {
    setfirstRender(false);
    if (patientId) {
      dispatch(getPatient(patientId));
    }

    dispatch(getDiets());
  }, [dispatch, patientId]);

  useEffect(() => {
    if (patient) {
      setFormData({ ...patient });
    }
  }, [patient]);

  useEffect(() => {
    formEditMode(editMode);
  }, [editMode]);

  const handleChange = (e) => {
    const key = e.target.id;
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

    // dispatch(updateMenuItem([menuItemId, formData]));
    // setEditMode(false);
    // if (isSuccess) {
    //   toast.success('Menu item successfully updated!');
    // }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    //Reset menu item fields back to their original values
    setFormData({ ...patient });
  };

  const handleDelete = (patientId) => {
    // dispatch(deleteMenuItem(menuItemId));
    // //After a menu item is deleted, return to menuItems page
    // navigate('/control-panel/menu-items');
    // if (isSuccess) {
    //   toast.success('Menu item successfully deleted!');
    // }
  };

  if (loading || firstRender || !patient) {
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
              id='firstName'
              inputType='text'
              className='col-12 col-lg-6'
              label='First Name'
              value={firstName}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='lastName'
              inputType='text'
              className='col-12 col-lg-6'
              label='Last Name'
              value={lastName}
              onChange={handleChange}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-12 col-md-6 col-lg-3'
              label='DOB'
              value={formatDate(dob, { dateOnly: true })}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='status'
              inputType='select'
              selectOptions={[
                { value: 'eating', label: 'eating' },
                { value: 'NPO', label: 'NPO' },
              ]}
              className='col-12 col-md-6 col-lg-3'
              label='Status'
              value={status}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='unit'
              inputType='text'
              className='col-12 col-md-6 col-lg-3'
              label='Unit'
              value={unit}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='roomNumber'
              inputType='number'
              className='col-12 col-md-6 col-lg-3'
              label='Room Number'
              value={roomNumber && roomNumber.roomNumber}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='currentDiet'
              inputType='select'
              selectOptions={diets.map((diet) => {
                return { value: diet._id, label: diet.name };
              })}
              className='col-12 col-md-6'
              label='Diet'
              value={currentDiet._id}
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
              className='col-12 col-md-6'
              label='High Risk'
              value={isHighRisk.toString()}
              onChange={handleChange}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-12 col-lg-6'
              label='Supplements'
              value={supplements.toString()}
              editable
            />
            <FormGroup
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
              className='col-12 col-lg-6'
              label='Allergies'
              value={knownAllergies}
              editable
            />
            <FormGroup
              inputType='text'
              className='col-12 col-md-6'
              label='Created'
              value={formatDate(patient.createdAt)}
            />
            <FormGroup
              inputType='text'
              className='col-12 col-md-6'
              label='Updated'
              value={formatDate(patient.updatedAt)}
            />
            <div className={classes.btnDiv}>
              {editMode ? (
                <>
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
                </>
              ) : (
                <>
                  <ButtonEdit onClick={handleEdit} />
                  <Modal
                    id={patientId}
                    itemName={patient.firstName + ' ' + patient.lastName}
                    onDelete={() => {
                      handleDelete(patientId);
                    }}
                    btnDelete
                  />
                </>
              )}
            </div>
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
