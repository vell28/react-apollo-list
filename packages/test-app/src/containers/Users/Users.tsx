import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { IUser } from '../../models';

import { GET_USERS } from '../../graphql/queries/users';
import { Table, NUMBER_OF_PAGE, PageProps, SortProps } from '../../components/Table';
import { ERROR_TEXT, FETCH_ERROR_TEXT } from './const';
import './styles.css';

export const Users = () => {
  const [fetchError, setFetchError] = useState<boolean>(false);

  const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
    variables: { field: '', order: '', offset: 0, limit: NUMBER_OF_PAGE },
  });

  const handleFetchMore = useCallback( 
    async ({ field, order, offset, limit }: PageProps & SortProps) => {
      if (fetchError) setFetchError(!fetchError);
      try {
        await fetchMore({
          variables: { field, order, offset, limit },
          updateQuery: (
            prev: { users: {usersList: IUser[], total: number} }, 
            props: { fetchMoreResult?: { users: {usersList: IUser[], total: number} } }
          ) => {
            const { fetchMoreResult } = props;
    
            if (!fetchMoreResult) return prev;
            if (offset === 0) return fetchMoreResult;
    
            return { 
              users: {
                ...fetchMoreResult.users, 
                usersList: [...prev.users.usersList, ...fetchMoreResult.users.usersList] 
              }
            };
          },
        })
      } catch(e) {
        setFetchError(true);
      }
  }, [fetchError, fetchMore]);

  return (
    <div className="container">
      {error && <div className='error tableError'>{ERROR_TEXT}</div>}
      <Table data={data} onFetchMore={handleFetchMore} loading={loading || !data || Boolean(error)} />
      {fetchError && <div className='error tableError'>{FETCH_ERROR_TEXT}</div>}
    </div>
  )
};