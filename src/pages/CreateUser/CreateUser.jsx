import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createUser, resetIsSuccess } from '../../features/auth/authSlice';

import {
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

import classes from './CreateUser.module.css';

const CreateUser = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    role: '',
    password: '',
    passwordConfirm: '',
  });

  const { userName, email, role, password, passwordConfirm } = formData;


  useEffect(() => {
    if (isSuccess) {
      toast.success('User successfully created!');
      dispatch(resetIsSuccess());
      navigate('/control-panel/users');
    }

    if (isError) {
      if (message.keyValue?.userName) {
        toast.error('That username is already taken.');
        invalidInput('userName');
      }
      if (message.keyValue?.email) {
        toast.error('That email is already in use.');
        invalidInput('email');
      }
      if (message.message) {
        toast.error(message.message);
      }
    }
  }, [dispatch, isError, isSuccess, message, navigate]);

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

    if (userName.length < 3) {
      invalidInput('userName');
      toast.error('Username must be at least 3 characters long.');
    } else if (email.length < 8) {
      invalidInput('email');
      toast.error('Email must be at least 8 chracters long.');
    } else if (password.length < 8) {
      invalidInput('password');
      toast.error(
        'Password is required, and must be a minimum of 8 characters.'
      );
    } else if (passwordConfirm.length < 8) {
      invalidInput('passwordConfirm');
      toast.error(
        'Password confirmation is required, and must be a minimum of 8 characters.'
      );
    } else if (password !== passwordConfirm) {
      invalidInput('password');
      invalidInput('passwordConfirm');
      toast.error('Passwords do not match');
    } else {
      dispatch(createUser(formData));
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
    navigate('/control-panel/users');
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='Create User'
            title={userName}
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='userName'
              inputType='text'
              className='col-12 col-lg-6 col-xl-4'
              label='Username'
              value={userName}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='role'
              inputType='select'
              selectOptions={[
                { value: 'nca', label: 'NCA' },
                { value: 'lead-nca', label: 'Lead NCA' },
                { value: 'nurse', label: 'Nurse' },
                { value: 'dietitian', label: 'Dietitian' },
                { value: 'admin', label: 'Admin' },
              ]}
              className='col-12 col-lg-6 col-xl-4'
              label='Role'
              value={role}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='email'
              inputType='email'
              className='col-12 col-xl-4'
              label='Email'
              value={email}
              onChange={handleChange}
              alwaysEditable
            />

            <FormGroup
              id='password'
              inputType='password'
              className='col-12 col-xl-6'
              label='Password'
              value={password}
              onChange={handleChange}
              alwaysEditable
            />
            <FormGroup
              id='passwordConfirm'
              inputType='password'
              className='col-12 col-xl-6'
              label='Password Confirm'
              value={passwordConfirm}
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
  }
};

export default CreateUser;
