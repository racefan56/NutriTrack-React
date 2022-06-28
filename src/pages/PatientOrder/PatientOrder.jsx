import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getPatientOrder,
  getPatient,
  updatePatientOrder,
  deletePatientOrder,
  reset,
} from '../../features/patient/patientSlice';
import { getMenuItems } from '../../features/menuItem/menuItemSlice';

import {
  formEditMode,
  getToday,
  formatDate,
  invalidInput,
} from '../../components/helperFunctions/helperFunctions';

import Spinner from './../../components/Spinner/Spinner';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import Modal from '../../components/layout/Modal/Modal';

import classes from './PatientOrder.module.css';

const PatientOrder = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId, orderId } = useParams();

  const { patient, patientOrder, loading, isSuccess, isError, message } =
    useSelector((state) => state.patient);
  const { menuItems } = useSelector((state) => state.menuItem);

  const [editMode, setEditMode] = useState(false);
  const [firstRender, setfirstRender] = useState(true);
  const [formData, setFormData] = useState({
    day: '',
    mealPeriod: '',
    option: '',
    entree: {},
    dietAvailability: [],
    sides: [],
    dessert: [],
    drinks: [],
    condiments: [],
  });
  const today = getToday({ mmddyyyy: true });

  const {
    day,
    mealPeriod,
    option,
    entree,
    sides,
    dessert,
    drinks,
    condiments,
  } = formData;

  useEffect(() => {
    formEditMode(editMode);
  }, [editMode]);

  useEffect(() => {
    dispatch(getPatient(patientId));
    dispatch(getPatientOrder([patientId, orderId]));

    setfirstRender(false);
  }, [dispatch, orderId, patientId]);

  useEffect(() => {
    if (patient) {
      dispatch(getMenuItems(`dietAvailability=${patient.currentDiet._id}`));
    }
  }, [dispatch, patient]);

  useEffect(() => {
    if (patientOrder) {
      setFormData({ ...patientOrder });
    }
  }, [patientOrder]);

  useEffect(() => {
    if (isSuccess && patientOrder) {
      dispatch(reset());
      toast.success('Patient order successfully updated!');
    }

    if (isSuccess && !patientOrder) {
      dispatch(reset());
      toast.success('Patient order successfully deleted!');
      navigate(`/patients/${patientId}`);
    }

    if (isError) {
      setEditMode(true);
      if (message && message.message) {
        toast.error(message.message);
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    }
  }, [
    dispatch,
    isError,
    isSuccess,
    message,
    navigate,
    patientId,
    patientOrder,
  ]);

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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!entree) {
      invalidInput('entree');
      toast.error('An entree is required.');
    } else {
      dispatch(updatePatientOrder([patientId, orderId, formData]));
    }
  };

  const handleDelete = () => {
    dispatch(deletePatientOrder([patientId, orderId]));
    //After a order is deleted, return to patient page
    if (isSuccess) {
      navigate(`/patients/${patientId}`);
      toast.success('Order successfully deleted!');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    //Reset patient order fields back to their original values
    setFormData({ ...patientOrder });
  };

  const noOptionsTemplate = (item) => {
    return `There are currently no ${item} available for the patients current diet.`;
  };

  if (loading || !patient || !menuItems || !patientOrder || firstRender) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Menu'
            title={`${day} ${mealPeriod}`}
            subTitle={`${patient.firstName} ${patient.lastName}: ${patient.currentDiet.name}`}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='day'
              inputType='text'
              className='col-12 col-md-6 col-lg-4'
              label='Day'
              defaultValue={day}
              readonly
            />
            <FormGroup
              id='mealPeriod'
              inputType='text'
              className='col-12 col-md-6 col-lg-4'
              label='Meal Period'
              defaultValue={mealPeriod}
              readonly
            />
            <FormGroup
              id='option'
              inputType='text'
              className='col-12 col-md-6 col-lg-4'
              label='Option'
              defaultValue={option ? option : 'Custom'}
              readonly
            />
            <FormGroup
              id='entree'
              inputType='select'
              selectOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'entree'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              noOptionsMessage='-- No options available --'
              label='Entree'
              className='col-12 col-lg-6'
              value={entree}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='sides'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'side'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              noOptionsMessage={noOptionsTemplate('sides')}
              label='Sides'
              className='col-12 col-lg-6'
              value={sides.map((side) => {
                return side._id;
              })}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='dessert'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'dessert'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              noOptionsMessage={noOptionsTemplate('desserts')}
              label='Desserts'
              className='col-12 col-lg-6'
              value={dessert.map((item) => {
                return item._id;
              })}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='drinks'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'drink'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              noOptionsMessage={noOptionsTemplate('drinks')}
              label='Drinks'
              className='col-12 col-lg-6'
              value={drinks.map((drink) => {
                return drink._id;
              })}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='condiments'
              inputType='checkbox'
              checkboxOptions={menuItems.flatMap((menuItem) => {
                return menuItem.category === 'condiment'
                  ? { value: menuItem._id, label: menuItem.name }
                  : [];
              })}
              noOptionsMessage={noOptionsTemplate('condiments')}
              label='Condiments'
              className='col-12 col-lg-6'
              value={condiments.map((condiment) => {
                return condiment._id;
              })}
              onChange={handleChange}
              editable
            />
            {/* If the meal date is NOT today, don't allow editing of the meal */}
            {formatDate(patientOrder.mealDate, { dateOnly: true }) === today ? (
              editMode ? (
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
                    id={patientOrder._id}
                    itemName={`this order`}
                    onDelete={() => {
                      handleDelete();
                    }}
                    btnDelete
                  />
                </FormActionBtnContainer>
              )
            ) : (
              <div className={classes.mealDatePassed}>
                This meals date has passed. It is no longer editable.
              </div>
            )}
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default PatientOrder;
