import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createDiet } from '../../features/diet/dietSlice';

import {
  formEditMode,
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

import classes from './CreateDiet.module.css';

const CreateDiet = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSuccess, isError, message } = useSelector(
    (state) => state.diet
  );
  const [formData, setFormData] = useState({
    name: '',
    sodiumInMG: 0,
    carbsInGrams: 0,
    description: '',
  });

  const { name, sodiumInMG, carbsInGrams, description } = formData;

  useEffect(() => {
    formEditMode(true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Diet successfully created!');
      navigate('/control-panel/diets');
    }

    if (isError) {
      formEditMode(true);
      if (message.keyValue?.name) {
        toast.error('That diet name is already taken.');
        invalidInput('name');
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

    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.length < 1 ||
      description.length < 3 ||
      sodiumInMG < 0 ||
      carbsInGrams < 0
    ) {
      if (name.length < 1) {
        invalidInput('name');
        toast.error('Area name is required.');
      }
      if (description.length < 3) {
        invalidInput('description');
        toast.error('A description is required.');
      }
      if (sodiumInMG < 0) {
        invalidInput('sodiumInMG');
        toast.error(`Sodium count can't be negative`);
      }
      if (carbsInGrams < 0) {
        invalidInput('carbsInGrams');
        toast.error(`Carb count can't be negative`);
      }
    } else {
      dispatch(createDiet(formData));
    }
  };

  const openModal = (id) => {
    document.getElementById(id).style.display = 'flex';
  };

  const closeModal = (id) => {
    document.getElementById(id).style.display = 'none';
  };

  const handleCancel = () => {
    closeModal('confirmCancel');
  };

  const handleConfirm = () => {
    navigate('/control-panel/diets');
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Create Diet'
            title={name}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='name'
              inputType='text'
              className='col-12 col-lg-6'
              label='Area Name'
              value={name}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='sodiumInMG'
              inputType='number'
              className='col-12 col-lg-6'
              label='Sodium (miligrams/meal)'
              value={sodiumInMG}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='carbsInGrams'
              inputType='number'
              className='col-12 col-lg-6'
              label='Carbs (grams/meal)'
              value={carbsInGrams}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='description'
              textarea
              className='col-12 col-lg-6'
              label='Description'
              value={description}
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

export default CreateDiet;
