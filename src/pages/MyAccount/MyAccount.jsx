import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ContainerSideNav from '../../components/layout/ContainerSideNav/ContainerSideNav';

import Spinner from '../../components/Spinner/Spinner';
import SideNav from '../../components/layout/SideNav/SideNav';
import FormContainer from '../../components/layout/Form/FormContainer/FormContainer';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';

function MyAccount() {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    email: '',
    role: '',
  });

  const { role, email, userName } = formData;

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  if (!user) {
    return <Spinner />;
  } else {
    return (
      <>
        <SideNav />
        <ContainerSideNav>
          <FormContainer category='My Account' title={email}>
            <FormGroup
              id='userName'
              inputType='text'
              className='col-12 col-lg-6'
              label='Username'
              defaultValue={userName}
              readonly
              minLength='7'
            />
            <FormGroup
              id='email'
              inputType='text'
              className='col-12 col-lg-6'
              label='Email'
              defaultValue={email}
              readonly
              minLength='7'
            />
            <FormGroup
              id='role'
              inputType='text'
              className='col-12 col-lg-6'
              label='Role'
              defaultValue={role}
              readonly
              minLength='3'
            />
          </FormContainer>
        </ContainerSideNav>
      </>
    );
  }
}

export default MyAccount;
