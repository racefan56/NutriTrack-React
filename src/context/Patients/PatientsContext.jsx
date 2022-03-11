import React, { createContext, useState, useContext } from 'react';
import AuthContext from '../Auth/AuthContext';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token, SERVER } = useContext(AuthContext);

  const getPatients = async (queryString) => {
    setIsLoading(true);
    const response = await fetch(
      `${SERVER}/patients?${queryString ? queryString : ''}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const { data } = await response.json();
    setPatients(data.data);
    setIsLoading(false)
  };

  return (
    <PatientContext.Provider
      value={{ getPatients, setIsLoading, patients, isLoading }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
