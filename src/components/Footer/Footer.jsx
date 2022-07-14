import React from 'react';

import classes from './Footer.module.css';

function Footer() {
  const VERSION = process.env.REACT_APP_APP_VERSION;
  const footerText = `NutriTrack App Version ${VERSION}`;
  return (
    <div className={classes.footer}>
      <footer>&copy; 2022 {footerText}</footer>
    </div>
  );
}

export default Footer;
