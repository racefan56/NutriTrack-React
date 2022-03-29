import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/layout/Card/Card';
import PatientResults from '../components/patients/PatientResults';
import Spinner from '../components/Spinner';

function Home() {
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Card className={'card-main'}>
      <PatientResults />
    </Card>
  );
}

export default Home;
