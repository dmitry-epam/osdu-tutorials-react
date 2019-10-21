import React, { memo, ChangeEvent } from 'react';
import './styles.css';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | string[] | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export const Input = memo(function Input({
  className,
  type,
  placeholder,
  value,
  onChange,
  onClick,
}: Props) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
});
