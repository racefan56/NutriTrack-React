import React, { useEffect, useState, useCallback, useRef } from 'react';
import { logout } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../layout/Modal/Modal';

const AutoLogout = (props) => {
  const dispatch = useDispatch();
  const { loggedIn, countDownAutoLogoutWarning, countDownToWarningPopUp } =
    useSelector((state) => state.auth);

  const [autoLogoutModal, setAutoLogoutModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(countDownAutoLogoutWarning);

  let startWarningPopupTimer = useRef();
  let startTimer = useRef();
  let timeTracker;
  let warningPopup;

  //START TIMER
  timeTracker = useCallback(() => {
    startTimer.current = setTimeout(() => {
      warningPopup();
    }, countDownToWarningPopUp);
  }, [countDownToWarningPopUp, warningPopup]);

  //RESET TIMER
  const resetTimer = useCallback(() => {
    clearTimeout(startTimer.current);

    if (loggedIn) {
      setAutoLogoutModal(false);
      setTimeLeft(countDownAutoLogoutWarning);
      clearInterval(startWarningPopupTimer.current);
      timeTracker();
    } else {
      setTimeLeft(countDownAutoLogoutWarning);
      clearInterval(startWarningPopupTimer.current);
    }
  }, [countDownAutoLogoutWarning, loggedIn, timeTracker]);

  warningPopup = useCallback(() => {
    clearTimeout(startTimer.current);
    setAutoLogoutModal(true);

    startWarningPopupTimer.current = setInterval(() => {
      setTimeLeft((prevState) => {
        if (prevState === 0) {
          clearInterval(startWarningPopupTimer.current);
          window.removeEventListener('click', resetTimer);
          return;
        } else {
          return prevState - 1000;
        }
      });
    }, 1000);
  }, [resetTimer]);

  useEffect(() => {
    if (!loggedIn) {
      window.removeEventListener('click', resetTimer);
      clearTimeout(startTimer.current);
      clearInterval(startWarningPopupTimer.current);
      return;
    } else {
      setAutoLogoutModal(false);
      window.addEventListener('click', resetTimer);
      timeTracker();
    }
  }, [loggedIn, resetTimer, timeTracker]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(countDownAutoLogoutWarning);
      dispatch(logout());
    }
  }, [countDownAutoLogoutWarning, dispatch, timeLeft]);

  return (
    <>
      {autoLogoutModal && loggedIn ? (
        <Modal
          popUp
          handleConfirm={() => dispatch(logout())}
          confirmTxt='Logout'
          handleCancel={() => resetTimer()}
          id='autoLogout'
          heading='Are you still there?'
          message={`Due to inactivity, you will be automatically logged out in ${
            timeLeft / 1000
          } seconds`}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AutoLogout;
