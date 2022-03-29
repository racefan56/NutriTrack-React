import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './PatientItem.module.css';

function PatientItem({ patient }) {
  const navigate = useNavigate();
  return (
    <tr
      className={classes['patient-item-row']}
      onClick={() => navigate(`/patients/${patient._id}`)}
    >
      <th scope='row'>{patient.roomNumber.roomNumber}</th>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>{patient.currentDiet.name}</td>
      <td>{patient.status}</td>
    </tr>
  );
}

export default PatientItem;
