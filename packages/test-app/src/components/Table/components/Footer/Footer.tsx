import React, { memo } from 'react';

import { Button } from '../../../../components/common';
import { LOAD_MORE } from './const';

type Props = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export const Footer: React.FC<Props> = memo(({ onClick, disabled, loading }) => {
  return (
    <tr>
      <th colSpan={5}>
        <Button text={LOAD_MORE} onClick={onClick} loading={loading} disabled={disabled}/>
      </th>
    </tr>
  )
})