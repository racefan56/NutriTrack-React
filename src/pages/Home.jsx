import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/layout/Card';
import AuthContext from '../context/Auth/AuthContext';
import PatientResults from '../components/patients/PatientResults';
import Spinner from '../components/Spinner';

function Home() {
  const { token, loading } = useContext(AuthContext);


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
