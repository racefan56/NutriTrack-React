import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  getUser,
  updateOtherUser,
  deleteOtherUser,
} from '../../features/user/userSlice';

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

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { loading, user, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  const [editMode, setEditMode] = useState();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    role: '',
  });

  const { userName, email, role } = formData;

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess && user) {
      toast.success('User successfully updated!');
      navigate('/control-panel/users');
    }

    if (isSuccess && !user) {
      toast.success('User successfully deleted!');
      navigate('/control-panel/users');
    }

    if (isError) {
      if (message.keyValue?.email) {
        toast.error('That email is already in use.');
      }

      if (message.message) {
        toast.error(message.message);
      }
    }
  }, [isError, isSuccess, message, navigate, user]);

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

    if (email.length < 1 || role.length < 3) {
      if (email.length < 1) {
        invalidInput('email');
        toast.error('Email is required.');
      }
      if (role.length < 3) {
        invalidInput('role');
        toast.error('A role is required.');
      }
    } else {
      dispatch(updateOtherUser([userId, formData]));
    }
  };

  const handleEdit = () => {
    formEditMode(true);
    setEditMode(true);
  };

  const handleCancel = () => {
    formEditMode(false);
    setEditMode(false);
    //Reset fields back to their original values
    setFormData({ ...user });
  };

  const handleDelete = (userId) => {
    dispatch(deleteOtherUser(userId));
    if (isSuccess) {
      toast.success('User successfully deleted!');
      //After user is deleted, return to users page
      navigate('/control-panel/users');
    }
  };

  if (loading || !user || !formData) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer category='User' title={email} onSubmit={handleSubmit}>
            <FormGroup
              id='userName'
              inputType='text'
              className='col-12 col-lg-6 col-xl-4'
              label='Username'
              value={userName}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='role'
              inputType='select'
              selectOptions={[
                { value: 'admin', label: 'Admin' },
                { value: 'nurse', label: 'Nurse' },
                { value: 'dietitian', label: 'Dietitian' },
                { value: 'nca', label: 'NCA' },
                { value: 'lead-nca', label: 'Lead-NCA' },
              ]}
              label='Role'
              className='col-12 col-lg-6 col-xl-4'
              value={role}
              onChange={handleChange}
              editable
            />
            <FormGroup
              id='email'
              inputType='text'
              className='col-12 col-xl-4'
              label='Email'
              value={email}
              onChange={handleChange}
              editable
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
                  id={userId}
                  itemName={user.email}
                  onDelete={() => {
                    handleDelete(userId);
                  }}
                  btnDelete
                />
              </FormActionBtnContainer>
            )}
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
};

export default User;
