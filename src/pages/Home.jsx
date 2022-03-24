import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/layout/Card';
import PatientResults from '../components/patients/PatientResults';
import Spinner from '../components/Spinner';

function Home() {
  const { loading } = useSelector((state) => state.auth);

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
