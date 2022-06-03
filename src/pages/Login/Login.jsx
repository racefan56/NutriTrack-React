import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { setPathname } from '../../features/navigation/navigationSlice';
import React, { useState, useEffect } from 'react';
import Card from '../../components/layout/Card/Card';
import Brand from '../../components/layout/Brand/Brand';
import { useNavigate } from 'react-router-dom';
import ButtomMain from '../../components/layout/Button/ButtonMain/ButtonMain';

import classes from './Login.module.css';
import { toast } from 'react-toastify';

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
    <div className='container min-vh-100 d-flex align-items-center'>
      <Card className={classes['card-login']}>
        <div className='d-flex w-100 mb-3 justify-content-center'>
          <Brand w100 className={classes['brand-login']} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              className='form-control mb-3'
              id='email'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          <ButtomMain type='submit' text='Login' />
        </form>
      </Card>
    </div>
  );
}

export default Login;
