import React, { useState, useContext } from 'react';
import AuthContext from './../context/AuthContext';

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
    loginUser({email, password});
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            className='w-100'
            placeholder='Enter email'
            onChange={handleChangeEmail}
          />
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='text'
            className='w-100'
            placeholder='Enter password'
            onChange={handleChangePassword}
          />
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
