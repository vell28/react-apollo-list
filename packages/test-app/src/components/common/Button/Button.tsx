import React, { memo } from 'react';
import clsx from 'clsx';

import './styles.css';

type Props = {
  text: string;
  loading: boolean;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = memo(({ text, loading, className, onClick, disabled }) => {
  return (
    <>
      {!loading ? 
        <button onClick={onClick} className={clsx('button', className, disabled && 'disabled')}>{text}</button>
        :
        <img className='loader' src={require('./loader.gif')} alt="loading..." />
      }
    </>
  )
})