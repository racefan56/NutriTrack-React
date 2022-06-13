import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';
import {
  formatDate,
  ISOdateOnly,
  formEditMode,
  invalidInput,
  getToday,
  roomsAvailableByUnit,
} from '../../components/helperFunctions/helperFunctions';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';
import FormActionBtnContainer from '../../components/layout/Form/FormActionBtnContainer/FormActionBtnContainer';
import SubContainer from '../../components/layout/SubContainer/SubContainer';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import ButtonSecondary from '../../components/layout/Button/ButtonSecondary/ButtonSecondary';
import ButtonEdit from '../../components/layout/Button/ButtonEdit/ButtonEdit';
import Modal from '../../components/layout/Modal/Modal';

import classes from './MyAccount.module.css';

function MyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState();
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    role: '',
  });

  const { role, email } = formData;

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

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

  if (!user) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer
            category='My Account'
            title={email}
          >
            <FormGroup
              id='email'
              inputType='text'
              className='col-12 col-lg-6'
              label='Email'
              value={email}
              onChange={handleChange}
              required
              minLength='7'
            />
            <FormGroup
              id='role'
              inputType='text'
              className='col-12 col-lg-6'
              label='Role'
              value={role}
              onChange={handleChange}
              required
              minLength='3'
            />
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
}

export default MyAccount;
