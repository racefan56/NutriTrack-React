import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../features/auth/authSlice';
import Modal from '../layout/Modal/Modal';

const AutoLogout = () => {
  const dispatch = useDispatch();
  const { loggedIn, timeTilAutoLogout, timeTilAutoLogoutPopUp } = useSelector(
    (state) => state.auth
  );

  const [autoLogoutModal, setAutoLogoutModal] = useState(false);
  const [timeLeftTilAutoLogout, setTimeLeftTilAutoLogout] =
    useState(timeTilAutoLogout);
  const [timeLeftTilAutoLogoutPopup, setTimeLeftTilAutoLogoutPopup] = useState(
    timeTilAutoLogoutPopUp
  );
  const [logOut, setLogOut] = useState(false);

  let handleClick = useRef(() => {
    return setTimeLeftTilAutoLogoutPopup(timeTilAutoLogoutPopUp);
  });
  // Timer for auto logout popup to become visible
  let startTimer = useRef(null);
  // Timer ON auto logout popup, once it reaches 0, the user will be auto logged out
  let countDownTimer = useRef(null);

  const handleLogout = useCallback(() => {
    // Hide logout modal
    setAutoLogoutModal(false);

    // Clear both intertval timers
    clearInterval(startTimer.current);
    clearInterval(countDownTimer.current);

    // Remove event listener listening for any clicks to reset start timer
    document.body.removeEventListener('click', handleClick.current);

    // Reset state back to initial values
    setTimeLeftTilAutoLogout(timeTilAutoLogout);
    setTimeLeftTilAutoLogoutPopup(timeTilAutoLogoutPopUp);

    // Triggers useEffect below to logout user
    setLogOut(true);
  }, [timeTilAutoLogout, timeTilAutoLogoutPopUp]);

  // When handleLogout is run, it will set the state logOut to true, which will trigger the dispatch to logout
  useEffect(() => {
    if (logOut) {
      setLogOut(false);
      dispatch(logout());
    }
  }, [dispatch, logOut]);

  useEffect(() => {
    // If logged in, start timer for auto logout popup to become visible
    if (loggedIn) {
      startTimer.current = setInterval(() => {
        setTimeLeftTilAutoLogoutPopup((prevState) => {
          return prevState - 1000;
        });
      }, 1000);

      document.body.addEventListener('click', handleClick.current);
    }

    // If not logged in, clear both timers and remove the click event listener
    if (!loggedIn) {
      clearInterval(startTimer.current);
      clearInterval(countDownTimer.current);
      document.body.removeEventListener('click', handleClick.current);
    }
  }, [loggedIn, timeTilAutoLogoutPopUp]);

  // Shows autologout popup when the timer reaches 0, or less
  useEffect(() => {
    if (timeLeftTilAutoLogoutPopup <= 0) {
      setAutoLogoutModal(true);
    }
  }, [timeLeftTilAutoLogoutPopup]);

  // If autologout popup is visible, start the countdown timer to autologout the user
  useEffect(() => {
    if (autoLogoutModal) {
      countDownTimer.current = setInterval(() => {
        setTimeLeftTilAutoLogout((prevState) => {
          if (prevState === 0) {
            return handleLogout();
          } else {
            return prevState - 1000;
          }
        });
      }, 1000);
    } else {
      // If user clicks cancel/outside the popup, reset the timers and clear the countdown interval timer
      if (countDownTimer.current && loggedIn) {
        setTimeLeftTilAutoLogout(timeTilAutoLogout);
        setTimeLeftTilAutoLogoutPopup(timeTilAutoLogoutPopUp);
        clearInterval(countDownTimer.current);
      }
    }
  }, [
    autoLogoutModal,
    handleLogout,
    loggedIn,
    timeTilAutoLogout,
    timeTilAutoLogoutPopUp,
  ]);

  // Shows autologout popup if logged in & autoLogoutModal is true
  return (
    <>
      {autoLogoutModal && loggedIn ? (
        <Modal
          popUp
          handleConfirm={() => handleLogout()}
          confirmTxt='Logout'
          handleCancel={() => setAutoLogoutModal(false)}
          id='autoLogout'
          heading='Are you still there?'
          message={`Due to inactivity, you will be automatically logged out in ${
            timeLeftTilAutoLogout / 1000
          } seconds`}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AutoLogout;
