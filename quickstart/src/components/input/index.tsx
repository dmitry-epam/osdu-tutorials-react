import React, { memo } from 'react';
import './styles.css';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | string[] | undefined;
}

export const Input = memo(function Input({ className, type, placeholder, value }: Props) {
  return <input className={className} type={type} placeholder={placeholder} value={value} />;
});
