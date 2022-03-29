import React from 'react';

function Card({ children, className }) {
  return (
    <div
      className={`container card ${className ? className : ''}`}
    >
      {children}
    </div>
  );
}

export default Card;
