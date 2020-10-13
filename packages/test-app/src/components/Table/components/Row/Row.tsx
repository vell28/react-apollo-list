import React, { memo, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { Button } from '../../../../components/common';
import { Cell } from '../Cell';
import { DELETE, ERROR } from './const';
import { HiddenRow } from '../HiddenRow';
import { IUser } from '../../../../models';
import { DELETE_USER, GET_USERS } from '../../../../graphql';
import { NUMBER_OF_PAGE } from '../../const';

type Props = 
  IUser &
  { 
    onClick: () => void; 
    setTableDisabled: (hasTableDisable: boolean) => void;
  }

export const Row: React.FC<Props> = memo((props) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const { id, name, surname, age, email, setTableDisabled } = props;

  const [handleUserDelete, { loading, error }] = useMutation(DELETE_USER, {
    variables: { id },
    update: (store, { data }) => {
      if (data.deleteUser) {
        const list: { users: {usersList: IUser[], total: number} } | null = 
          store.readQuery({ query: GET_USERS, variables: { field: '', order: '', offset: 0, limit: NUMBER_OF_PAGE } });
        if (list) {
          const newUsersList = list.users.usersList.filter(user => user.id !== id);

          store.writeQuery({ 
            query: GET_USERS, 
            variables: { field: '', order: '', offset: 0, limit: NUMBER_OF_PAGE },
            data: {
              users: {
                ...data.users, 
                total: list.users.total - 1, 
                usersList: newUsersList,
              },
            }
          })
        }
      }
    }
  });

  const handleClick = useCallback(() => {
    setEdit(!isEdit);
    setTableDisabled(!isEdit);
  }, [isEdit, setTableDisabled])

  return (
    <>
      <tr>
        {[name, surname, age, email].map((cell) => <Cell key={cell} text={cell} onClick={handleClick} />)}
        <Cell>
          <Button text={DELETE} loading={loading} onClick={handleUserDelete} />
          {error && <span className='error'>{ERROR}</span>}
        </Cell>
      </tr>
      {isEdit && <HiddenRow {...props} onClick={handleClick} />}
    </>
  );
});