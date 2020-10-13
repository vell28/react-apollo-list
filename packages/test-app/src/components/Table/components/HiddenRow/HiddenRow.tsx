import React, { useState, useRef }  from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { useMutation } from '@apollo/client';

import { UPDATE_USER, GET_USERS } from '../../../../graphql';
import { Button, Input } from '../../../../components/common';
import { Cell } from '../Cell';
import { IUser } from  '../../../../models';
import { SAVE, FIELDS_NAME, VALIDATE, ERROR_TEXT } from './const';
import { NUMBER_OF_PAGE } from '../../const';
import { isFieldsEqual } from './utils';
import './styles.css';

type Props = IUser & { onClick: () => void; }

export const HiddenRow: React.FC<Props> = (props) => {
  const { onClick, id, name, surname, age, email } = props;

  const [isError, setError] = useState<boolean>(false);
  const [fieldsValue, setFieldsValue] = useState<{[key: string]: string}>({
    name, surname, age: age.toString(), email
  });

  const rootRef = useRef<HTMLTableRowElement>(null);

  const [mutate, { loading, error }] = useMutation(UPDATE_USER, {
    variables: { id, ...fieldsValue },
    update: (store, { data }) => {
      let storeUsers: { users: {usersList: IUser[], total: number} } | null = 
        store.readQuery({ query: GET_USERS, variables: { field: '', order: '', offset: 0, limit: NUMBER_OF_PAGE } });

      if (storeUsers) {
        const newUsersList = storeUsers.users.usersList.map(user => user.id === data.updatedUser.id ? data.updatedUser : user);
        store.writeQuery({ 
          query: GET_USERS, 
          variables: { field: '', order: '', offset: 0, limit: NUMBER_OF_PAGE },
          data: {
            users: {
              ...storeUsers.users, 
              usersList: newUsersList,
            },
          }
        })
      }
    }
  });

  const handleUserUpdate = async () => 
    await mutate().catch((e) => { console.error(e); });

  useOnClickOutside(rootRef, () => {
    onClick();
  });

  const handleChange = (name: string, value: string, error: boolean) => {
    setFieldsValue({...fieldsValue, [name]: value });
    if (isError !== error) {
      setError(error);
    }
  };

  return (
    <tr ref={rootRef} className='hiddenWrapper'>
      {FIELDS_NAME.map(field => 
        <Cell key={field}>
          <Input
            value={fieldsValue[field]}
            name={field}
            type='text'
            onChange={handleChange}
            validate={VALIDATE[field].validate as (text: string) => boolean}
            formatter={VALIDATE[field].formatter as (text: string) => string}
          />
        </Cell>
      )}
      <Cell>
        <Button
          disabled={isError || isFieldsEqual(fieldsValue, { name, surname, age: age.toString(), email })} 
          text={SAVE} 
          loading={loading} 
          onClick={handleUserUpdate} 
        />
        {error && <span className='error'>{ERROR_TEXT}</span>}
      </Cell> 
    </tr>
  )
}