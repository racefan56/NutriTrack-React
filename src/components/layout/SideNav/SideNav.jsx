import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BiShow, BiHide } from 'react-icons/bi';

import MenuLink from '../LinkSection/MenuLink/MenuLink';
import LinkSubSection from '../LinkSection/LinkSubSection/LinkSubSection';

import classes from './SideNav.module.css';

const SideNav = () => {
  const { userRole } = useSelector((state) => state.auth);
  const { pathname } = useSelector((state) => state.navigation);

  const [hideSideBar, setHideSideBar] = useState(true);

  const toggleShowSideBar = () => {
    setHideSideBar((prevState) => {
      if (prevState === false) {
        return true;
      } else {
        return false;
      }
    });
  };

  if (pathname.startsWith('/control-panel')) {
    return (
      <>
        <div
          className={`${classes['cp-side-nav-container']} ${
            hideSideBar
              ? classes['cp-side-nav-mobile-hidden']
              : classes['cp-side-nav-mobile-show']
          } `}
        >
          <div
            onClick={toggleShowSideBar}
            className={classes.mobileSideNavToggleContainer}
          >
            {hideSideBar ? (
              <BiHide className={classes.showHideSideBar} />
            ) : (
              <BiShow className={classes.showHideSideBar} />
            )}
            <p className={classes.sideNavToggleTxt}>Side Nav</p>
          </div>

          {userRole === 'admin' ? (
            <LinkSubSection title={'User Accounts'}>
              <MenuLink to='/control-panel/users' text='View Users' />
              <MenuLink
                to='/control-panel/users/create'
                text='Create New User'
              />
            </LinkSubSection>
          ) : (
            <></>
          )}
          <LinkSubSection title={'Dietary'}>
            <MenuLink to='/control-panel/menus' text='Menus' />
            <MenuLink to='/control-panel/menu-items' text='Menu Items' />

            {userRole === 'admin' || userRole === 'lead-nca' ? (
              <MenuLink to='/control-panel/prepList' text='Prep Lists' />
            ) : (
              <></>
            )}

            {userRole === 'admin' || userRole === 'dietitian' ? (
              <MenuLink to='/control-panel/diets' text='Diets' />
            ) : (
              <></>
            )}
            {userRole === 'admin' ? (
              <MenuLink
                to='/control-panel/production-areas'
                text='Production Areas'
              />
            ) : (
              <></>
            )}
          </LinkSubSection>
          {userRole === 'admin' ? (
            <LinkSubSection title={'Facility'}>
              <MenuLink to='/control-panel/units' text='Units' />
              <MenuLink to='/control-panel/rooms' text='Rooms' />
            </LinkSubSection>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }

  if (pathname.startsWith('/patients')) {
    return (
      <div
        className={`${classes['cp-side-nav-container']} ${
          hideSideBar
            ? classes['cp-side-nav-mobile-hidden']
            : classes['cp-side-nav-mobile-show']
        } `}
      >
        <div
          onClick={toggleShowSideBar}
          className={classes.mobileSideNavToggleContainer}
        >
          {hideSideBar ? (
            <BiHide className={classes.showHideSideBar} />
          ) : (
            <BiShow className={classes.showHideSideBar} />
          )}
          <p className={classes.sideNavToggleTxt}>Side Nav</p>
        </div>
        {/* Future version feature */}
        {/* <LinkSubSection title={'Updates'}>
          <MenuLink to='/patients/alerts' text='Alerts' />
        </LinkSubSection> */}
        <LinkSubSection title={'Patient Data'}>
          <MenuLink to='/patients' text='Patients' />
          <MenuLink to='/patients/patient-orders' text='Orders' />
          {userRole === 'admin' ||
          userRole === 'lead-nca' ||
          userRole === 'nurse' ? (
            <MenuLink to='/patients/census' text='Census' />
          ) : (
            <></>
          )}
        </LinkSubSection>
      </div>
    );
  }

  if (pathname.startsWith('/my-account')) {
    return (
      <div
        className={`${classes['cp-side-nav-container']} ${
          hideSideBar
            ? classes['cp-side-nav-mobile-hidden']
            : classes['cp-side-nav-mobile-show']
        } `}
      >
        <div
          onClick={toggleShowSideBar}
          className={classes.mobileSideNavToggleContainer}
        >
          {hideSideBar ? (
            <BiHide className={classes.showHideSideBar} />
          ) : (
            <BiShow className={classes.showHideSideBar} />
          )}
          <p className={classes.sideNavToggleTxt}>Side Nav</p>
        </div>
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
