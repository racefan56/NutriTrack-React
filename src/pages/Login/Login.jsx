import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { login } from '../../features/auth/authSlice';
import { setPathname } from '../../features/navigation/navigationSlice';
import Card from '../../components/layout/Card/Card';
import Brand from '../../components/layout/Brand/Brand';
import ButtonMain from '../../components/layout/Button/ButtonMain/ButtonMain';
import FormGroup from '../../components/layout/Form/FormGroup/FormGroup';

import classes from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message && message.includes('401')) {
      toast.error(
        'The email and/or password you provided is incorrect. Please try again.'
      );
    }
    if (message && message.includes('500')) {
      toast.error(
        'There was a problem communicating with the server. Please try again later.'
      );
    }
  }, [message]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/patients');
      dispatch(setPathname('/patients'));
    }
  }, [loggedIn, navigate, dispatch]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');

    navigate('/patients');
    dispatch(setPathname('/patients'));
  };

  return (
    <div className='container d-flex align-items-center'>
      <Card className={classes['card-login']}>
        <div className='d-flex w-100 justify-content-center'>
          <Brand w100 className={classes['brand-login']} />
        </div>
        <div className={classes.formContainer}>
          <form onSubmit={handleSubmit}>
            <FormGroup
              id='email'
              label='Email'
              inputType='email'
              value={email}
              onChange={handleChangeEmail}
              placeholder='Enter email'
            />
            <FormGroup
              id='password'
              label='Password'
              inputType='password'
              value={password}
              onChange={handleChangePassword}
              placeholder='Enter password'
            />
            <ButtonMain type='submit' text='Login' />
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Login;
