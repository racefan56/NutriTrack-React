import React, { useContext } from 'react';
import Card from '../components/layout/Card';
import AuthContext from '../context/Auth/AuthContext';
import PatientResults from '../components/patients/PatientResults';
import Spinner from '../components/Spinner';

function Home() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Card>
      <PatientResults />
    </Card>
  );
}

export default Home;
