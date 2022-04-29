import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createUnit } from '../../features/unit/unitSlice';

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
import Modal from '../../components/layout/Modal/Modal';

import classes from './CreateUnit.module.css';

const CreateUnit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSuccess, isError, message } = useSelector(
    (state) => state.unit
  );
  const [formData, setFormData] = useState({
    unitName: '',
    description: '',
  });

  const { unitName, description } = formData;

  useEffect(() => {
    formEditMode(true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Unit successfully created!');
      navigate('/control-panel/units');
    }

    if (isError) {
      formEditMode(true);
      if (message.keyValue?.unitName) {
        toast.error('That unit name is already taken.');
        invalidInput('unitName');
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

    if (unitName.length < 1 || description.length < 3) {
      if (unitName.length < 1) {
        invalidInput('unitName');
        toast.error('Unit name is required.');
      }
      if (description.length < 3) {
        invalidInput('description');
        toast.error('A description is required.');
      }
    } else {
      dispatch(createUnit(formData));
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
    navigate('/control-panel/units');
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Create Unit'
            title={unitName}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='unitName'
              inputType='text'
              className='col-12 col-lg-6'
              label='Area Name'
              value={unitName}
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

export default CreateUnit;
