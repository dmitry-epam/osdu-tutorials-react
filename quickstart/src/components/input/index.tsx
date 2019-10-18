import React from 'react';
import './styles.css';

export const Input = ({className, type, placeholder, value}: any) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
    />
  );
};
