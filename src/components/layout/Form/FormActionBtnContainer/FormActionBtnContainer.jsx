import React from 'react';
import classes from './FormActionBtnContainer.module.css';

const FormActionBtnContainer = ({ children }) => {
  return (
    <div className={`row`}>
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