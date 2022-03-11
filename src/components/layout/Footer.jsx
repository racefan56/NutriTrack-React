import React, { useContext } from 'react';
import AuthContext from '../../context/Auth/AuthContext';

function Footer() {
  const { token } = useContext(AuthContext);

  if (token === '') {
    return <></>;
  } else {
    return <footer className='footer fixed-bottom'>FOOTER</footer>;
  }
}

export default Footer;
