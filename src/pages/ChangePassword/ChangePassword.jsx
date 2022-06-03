import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logout, updateUserPassword } from '../../features/auth/authSlice';
import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import {
  formEditMode,
  invalidInput,
} from '../../components/helperFunctions/helperFunctions';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import Modal from '../../components/layout/Modal/Modal';

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    passwordCurrent: '',
    updatedPassword: '',
    updatedPasswordConfirm: '',
  });

  useEffect(() => {
    formEditMode(true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        'Password successfully updated! Please login with your new password.'
      );
      return dispatch(logout());
    }
  }, [dispatch, isSuccess]);

  const { passwordCurrent, updatedPassword, updatedPasswordConfirm } = formData;

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

    if (updatedPassword.length < 1 || updatedPasswordConfirm < 1) {
      if (updatedPassword.length < 1) {
        invalidInput('updatedPassword');
        toast.error('New password is required.');
      }
      if (updatedPasswordConfirm.length < 1) {
        invalidInput('updatedPasswordConfirm');
        toast.error('Password confirmation is required.');
      }
    } else if (updatedPassword !== updatedPasswordConfirm) {
      invalidInput('updatedPassword');
      invalidInput('updatedPasswordConfirm');
      toast.error('Passwords do not match');
    } else if (passwordCurrent === updatedPassword && updatedPasswordConfirm) {
      invalidInput('passwordCurrent');
      toast.error('New password must be different than your current password');
    } else {
      dispatch(updateUserPassword(formData));
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
    navigate('/my-account');
  };

  if (!user) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='My Account'
            title='Change Password'
            onSubmit={handleSubmit}
          >
            <FormGroup
              id='passwordCurrent'
              inputType='text'
              className='col-12 col-lg-6'
              label='Current Password'
              value={passwordCurrent}
              onChange={handleChange}
              editable
              required
              minLength='7'
            />
            <FormGroup
              id='updatedPassword'
              inputType='text'
              className='col-12 col-lg-6'
              label='New Password'
              value={updatedPassword}
              onChange={handleChange}
              editable
              required
              minLength='3'
            />
            <FormGroup
              id='updatedPasswordConfirm'
              inputType='text'
              className='col-12 col-lg-6'
              label='Confirm New Password'
              value={updatedPasswordConfirm}
              onChange={handleChange}
              editable
              required
              minLength='3'
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
}

export default ChangePassword;
