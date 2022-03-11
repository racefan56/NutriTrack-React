import React from 'react';

function PatientItem(props) {
  return (
    <tr>
      <th scope='row'>{props.patient.roomNumber.roomNumber}</th>
      <td>{props.patient.firstName}</td>
      <td>{props.patient.lastName}</td>
      <td>{props.patient.status}</td>
    </tr>
  );
}

export default PatientItem;
