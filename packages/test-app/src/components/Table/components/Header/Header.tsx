import React, { memo } from 'react';
import clsx from 'clsx';

import { Cell } from '../Cell';
import { TITLES } from './const';
import { SortProps } from '../../const';
import './styles.css';

type Props = {
  onClick: (name: string) => void;
  sort: SortProps;
}

export const Header: React.FC<Props> = memo(({ onClick, sort }) => {
  return (
    <tr>
      {TITLES.map(title => 
        <Cell key={title} onClick={() => title ? onClick(title) : null } className='titleWrapper' >
          {title && <span className={clsx('title', sort.field === title && sort.order)}>{title}</span>}
        </Cell>
      )}
    </tr>
  )
})