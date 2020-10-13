import React, { useState } from 'react';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';

import { Header, Row, Footer } from './components';
import { IUser } from '../../models';
import { ORDER, NUMBER_OF_PAGE, PAGES_PARAMS, PageProps, SortProps, DELAY, SKELETON_COUNT } from './const';
import './styles.css';

let isCooldown: boolean = false;

type DataProps = { users: {usersList: IUser[], total: number} };

type Props = {
  data: DataProps;
  onFetchMore: ({ field, order, offset, limit }: PageProps & SortProps) => void;
  loading: boolean;
}

export const Table = ({ data, onFetchMore, loading }: Props) => {
  const [sort, setSort] = useState<SortProps>({ field: '', order: '' });
  const [pagesParams, setPagesParams] = useState<PageProps>(PAGES_PARAMS);
  const [hasTableDisabled, setTableDisabled] = useState<boolean>(false);
  const [isLoadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);

  const isLastPage: boolean = Math.ceil(data?.users?.usersList.length / NUMBER_OF_PAGE) 
    < Math.ceil(data?.users?.total / NUMBER_OF_PAGE);

  const handleLoadMore = (): void => {
    setLoadMoreLoading(true);
    const offset = pagesParams.limit;
    const limit = pagesParams.limit + NUMBER_OF_PAGE;

    onFetchMore({ ...sort, offset, limit });
    setPagesParams({ offset, limit })
    setLoadMoreLoading(false);
  }

  const handleSort =  (name: string): void => {
    if (!isCooldown) {
      isCooldown = true;
      const {field, order} = sort;
      let sortType: ORDER.ASC | ORDER.DESC | '' = '';

      if (field === name) {
        switch(order) {
          case ORDER.ASC:
            sortType = ORDER.DESC;
            break;
          case ORDER.DESC:
            break;
          default:
            sortType = ORDER.ASC;
            break;
        }
      }

      if (field !== name) {
        sortType = ORDER.ASC;
      }
      setSort({ field: name, order: sortType });
      onFetchMore({ field: name, order: sortType, ...PAGES_PARAMS })

      if (pagesParams.offset !== 0) {
        setPagesParams(PAGES_PARAMS);
      }

      setTimeout(() => {
        isCooldown = false;
      }, DELAY)
    }
  }

  return(
    <div className={clsx("tableContainer", hasTableDisabled && 'disable')}>
      {!loading ?
        <table className='table'>
          <thead>
            <Header onClick={handleSort} sort={sort} />
          </thead>
          <tbody>
            {data?.users?.usersList.map((user: IUser) => 
              <Row key={user.id} {...user} onClick={() =>{}} setTableDisabled={setTableDisabled} />
            )}
          </tbody>
          <tfoot>
            <Footer onClick={handleLoadMore} disabled={!isLastPage} loading={isLoadMoreLoading} />
          </tfoot>
        </table>
        :
        <Skeleton count={SKELETON_COUNT} />
      }
    </div>
  )
}