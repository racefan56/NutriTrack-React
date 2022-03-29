import React from 'react';
import classes from './ControlPanelSideNav.module.css';
import Card from '../Card/Card';

import MenuLink from '../LinkSection/MenuLink/MenuLink';
import LinkSubSection from '../LinkSection/LinkSubSection/LinkSubSection';

const ControlPanelSideNav = () => {
  const path = window.location.pathname;

  if (path.startsWith('/control-panel')) {
    return (
      <div className={classes['cp-side-nav-container']}>
        <LinkSubSection title={'User Accounts'}>
          <MenuLink to='/' text='View Users' />
          <MenuLink to='/' text='Create New User' />
        </LinkSubSection>

        <LinkSubSection title={'Dietary'}>
          <MenuLink to='/' text='Menus' />
          <MenuLink to='/' text='Menu Items' />
          <MenuLink to='/' text='Diets' />
          <MenuLink to='/' text='Production Areas' />
        </LinkSubSection>

        <LinkSubSection title={'Facility'}>
          <MenuLink to='/' text='Units' />
          <MenuLink to='/' text='Rooms' />
        </LinkSubSection>
      </div>
    );
  }

  if (path.startsWith('/patients')) {
    return (
      <div className={classes['cp-side-nav-container']}>
        <LinkSubSection title={'Updates & Orders'}>
          <MenuLink to='/patients/alerts' text='Alerts' />
          <MenuLink to='/patients/orders' text='Orders' />
        </LinkSubSection>
        <LinkSubSection title={'Patient Data'}>
          <MenuLink to='/patients' text='View Patients' />
          <MenuLink to='/patients/new-patient' text='Add Patient' />
          <MenuLink to='/patients/discharge' text='Discharge Patient' />
        </LinkSubSection>
      </div>
    );
  }

  if (path.startsWith('/my-account')) {
    return (
      <div className={classes['cp-side-nav-container']}>
        <LinkSubSection title={'My Account'}>
          <MenuLink to='/' text='Account Details' />
          <MenuLink to='/' text='Change Password' />
        </LinkSubSection>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ControlPanelSideNav;
