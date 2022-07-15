import React from 'react';

// Houses form action buttons (edit, delete, submit, cancel, etc.)
const FormActionBtnContainer = ({ children }) => {
  return (
    // Outputs a seprate div for each child supplied
    <div className={`row mt-5`}>
      {children.map((child, index) => {
        return (
          <div key={index} className='col-12 col-md-6'>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default FormActionBtnContainer;
