import React, { ReactNode, memo } from 'react';
import clsx from 'clsx';

import './styles.css';

type Props = {
  text?: string | number;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Cell: React.FC<Partial<Props>> = memo(({ text, children, onClick, className }) => {
  return <td onClick={onClick} className={clsx('cell', className)}>{text && text}{children && children}</td>
})