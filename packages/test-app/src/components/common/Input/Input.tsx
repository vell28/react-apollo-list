import React, { useState, ChangeEvent, memo } from 'react';
import clsx from 'clsx';

import './styles.css';

type Props = {
  type: string;
  name: string;
  value: string | number;
  onChange: (name: string, value: string, isError: boolean) => void;
  validate?: (text: string) => boolean;
  formatter?: (text: string) => string;
}

export const Input: React.FC<Props> = memo(({ type, name, value, onChange, validate, formatter }) => {
  const [isError, setError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let error = isError;
    if (isError) {
      setError(!isError);
      error = !isError;
    }
    const { target } = e;
    const { name, value } = target;

    const newValue = formatter ? formatter(value) : value;
    if (!value || (validate && !validate(value))) { 
      setError(true);
      error = true;
    }

    onChange(name, newValue, error);
  }

  return (
    <input 
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className={clsx('input', isError && 'inputError')}
    />
  )
})