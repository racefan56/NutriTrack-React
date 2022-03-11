import React, { useState, useContext } from 'react';
import AuthContext from './../context/Auth/AuthContext';
import Card from '../components/layout/Card';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useContext(AuthContext);

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
  };

  return (
    <>
      <Card>
        <h1 className='display-1 text-center'>NutriTrack</h1>
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
    </>
  );
}

export default Login;
