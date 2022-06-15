import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './SideNav.module.css';

import Card from '../Card/Card';

import MenuLink from '../LinkSection/MenuLink/MenuLink';
import LinkSubSection from '../LinkSection/LinkSubSection/LinkSubSection';

const SideNav = () => {
  const path = window.location.pathname;

  if (path.startsWith('/control-panel')) {
    return (
      <div className={classes['cp-side-nav-container']}>
        <LinkSubSection title={'User Accounts'}>
          <MenuLink to='/control-panel/users' text='View Users' />
          <MenuLink to='/control-panel/users/create' text='Create New User' />
        </LinkSubSection>

        <LinkSubSection title={'Dietary'}>
          <MenuLink to='/control-panel/menus' text='Menus' />
          <MenuLink to='/control-panel/menu-items' text='Menu Items' />
          <MenuLink to='/control-panel/diets' text='Diets' />
          <MenuLink
            to='/control-panel/production-areas'
            text='Production Areas'
          />
        </LinkSubSection>

        <LinkSubSection title={'Facility'}>
          <MenuLink to='/control-panel/units' text='Units' />
          <MenuLink to='/control-panel/rooms' text='Rooms' />
        </LinkSubSection>
      </div>
    );
  }

  if (path.startsWith('/patients')) {
    return (
      <div className={classes['cp-side-nav-container']}>
        {/* Future version feature */}
        {/* <LinkSubSection title={'Updates'}>
          <MenuLink to='/patients/alerts' text='Alerts' />
        </LinkSubSection> */}
        <LinkSubSection title={'Patient Data'}>
          <MenuLink to='/patients' text='Patients' />
          <MenuLink to='/patients/patient-orders' text='Orders' />
          <MenuLink to='/patients/census' text='Census' />
        </LinkSubSection>
      </div>
    );
  }

  if (path.startsWith('/my-account')) {
    return (
      <div className={classes['cp-side-nav-container']}>
        <LinkSubSection title={'My Account'}>
          <MenuLink to='/my-account' text='Account Details' />
          <MenuLink to='/my-account/change-password' text='Change Password' />
        </LinkSubSection>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SideNav;
