import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './../context/Auth/AuthContext';
import Card from '../components/layout/Card';
import Brand from '../components/Brand';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, loggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/home');
    }
  }, [loggedIn, navigate]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
    setEmail('');
    setPassword('');

    navigate('/home');
  };

  return (
    <div className='d-flex justify-content-center'>
      <Card>
        <div className='d-flex display-1 mb-3 justify-content-center'>
          <Brand />
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
          <button type='submit' className='btn login-btn'>
            Login
          </button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
