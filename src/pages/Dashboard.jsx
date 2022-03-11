import React, { useContext } from 'react';
import Card from '../components/layout/Card';
import AuthContext from '../context/Auth/AuthContext';
import PatientResults from '../components/patients/PatientResults';

function Dashboard() {
  const { token } = useContext(AuthContext);

  if (token) {
    return (
      <Card>
        <PatientResults />
      </Card>
    );
  } else {
    return <Card>You're not logged in!</Card>;
  }
}

export default Dashboard;
