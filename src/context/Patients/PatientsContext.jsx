import React, { createContext, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PatientReducer from './PatientReducer';

const PatientContext = createContext();

const SERVER = process.env.REACT_APP_SERVER;

export const PatientProvider = ({ children }) => {
  const initialState = {
    patients: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(PatientReducer, initialState);

  
  const { token } = useSelector((state) => state.auth);

  const getPatients = async (queryString) => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(
      `${SERVER}/patients?${queryString ? queryString : ''}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const { data } = await response.json();
    dispatch({ type: 'SET_PATIENTS', payload: data.data });
  };

  return (
    <PatientContext.Provider
      value={{
        getPatients,
        loading: state.loading,
        patients: state.patients,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
