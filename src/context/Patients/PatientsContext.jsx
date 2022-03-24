import React, { createContext, useContext, useReducer } from 'react';
import PatientReducer from './PatientReducer';
import AuthContext from '../Auth/AuthContext';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const initialState = {
    patients: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(PatientReducer, initialState);

  const { token, SERVER } = useContext(AuthContext);

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
