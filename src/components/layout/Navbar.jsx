import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ title }) {
  return (
    <nav>
      <Link to='/dashboard'>{title}</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to=''>Logout</Link>
    </nav>
  );
}

Navbar.defaultProps = {
  title: 'NutriTrack',
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
