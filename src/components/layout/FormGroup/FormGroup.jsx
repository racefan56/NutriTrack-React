import React from 'react';

const FormGroup = ({ id, label, type, value }) => {
  return (
    <div className='form-group'>
      <label htmlFor='roomNumber'>{label}</label>
      <input
        type={type}
        className='form-control mb-3'
        id={id}
        value={value}
        readOnly
      />
    </div>
  );
};

export default FormGroup;
