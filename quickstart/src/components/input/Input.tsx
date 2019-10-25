import React, { memo, ChangeEvent, MouseEvent, FormEvent } from 'react';
import './styles.css';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | string[] | undefined;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: FormEvent | MouseEvent) => void;
}

export const Input = memo(function Input({
  className,
  type,
  placeholder,
  value,
  name,
  onChange,
  onClick,
}: Props) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      onClick={onClick}
    />
  );
});
