import React, { useEffect, useState, useCallback, useRef } from 'react';
import { logout } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../layout/Modal/Modal';

const AutoLogout = (props) => {
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
  let startTimer = useRef(null);
  let countDownTimer = useRef(null);

  const handleLogout = useCallback(() => {
    // Hide logout modal
    setAutoLogoutModal(false);

    // Clear both intrtval timers
    clearInterval(startTimer.current);
    clearInterval(countDownTimer.current);

    // Remove event listener listening for any clicks to reset start timer
    document.body.removeEventListener('click', handleClick.current);

    // Reset state back to initial values
    setTimeLeftTilAutoLogout(timeTilAutoLogout);
    setTimeLeftTilAutoLogoutPopup(timeTilAutoLogoutPopUp);

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
    if (loggedIn) {
      startTimer.current = setInterval(() => {
        setTimeLeftTilAutoLogoutPopup((prevState) => {
          return prevState - 1000;
        });
      }, 1000);

      document.body.addEventListener('click', handleClick.current);
    }
  }, [loggedIn, timeTilAutoLogoutPopUp]);

  useEffect(() => {
    if (timeLeftTilAutoLogoutPopup <= 0) {
      setAutoLogoutModal(true);
    }
  }, [timeLeftTilAutoLogoutPopup]);

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
      if (countDownTimer.current && loggedIn) {
        setTimeLeftTilAutoLogout(timeTilAutoLogout);
        setTimeLeftTilAutoLogoutPopup(timeTilAutoLogoutPopUp);
        clearInterval(countDownTimer.current);
      }
    }
  }, [
    autoLogoutModal,
    dispatch,
    handleLogout,
    loggedIn,
    timeTilAutoLogout,
    timeTilAutoLogoutPopUp,
  ]);

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
