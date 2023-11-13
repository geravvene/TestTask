/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import DataService from '@/services/data.service';
import style from './paintingsList.module.scss';
import useTheme from '@/hooks/useTheme';
import { TParams, IPaintingList } from '@/types';
import Paintings from './Paintings/Paintings';
import FilterPanel from './FilterPanel/FilterPanel';
import Pagination from '@/components/Pagination/Pagination';

const limit = 12;

const deleteEmptyStringProperties = (obj: object) => Object.fromEntries(Object.entries(obj).filter((v) => v[1] !== ''));

function PaintingList({ authors, locations }: IPaintingList) {
  const { isDark } = useTheme();

  const [params, setParams] = useState(
    (): TParams => ({
      _page: '1',
      name_like: '',
      authorId: '',
      locationId: '',
      created_gte: '',
      created_lte: '',
      ...Object.fromEntries(new URLSearchParams(window.location.search).entries()),
    })
  );

  const { data, isLoading, isError } = useQuery(['paintings', new URLSearchParams((params)).toString()], () =>
    DataService.getResponse(`paintings`, { ...deleteEmptyStringProperties(params), _limit: limit })
  );

  useEffect(() => {
    window.history.pushState(null, '', `?${new URLSearchParams(deleteEmptyStringProperties(params)).toString()}`);
  }, [params]);

  const changePage = useCallback(
    (currentPage: number) => {
      setParams((prev) => ({ ...prev, _page: String(currentPage) }));
    },
    [setParams]
  );

  return (
    <>
      <FilterPanel params={params} setParams={setParams} authors={authors} locations={locations} isDark={isDark} />
      <div className={style.content}>
        {isLoading || isError ? null : (
          <>
            <Paintings data={data.data} authors={authors} locations={locations} />
            <Pagination
              className=""
              pagesAmount={Math.ceil(data.headers['x-total-count'] / limit)}
              currentPage={Number(params._page)}
              onChange={changePage}
              isDarkTheme={isDark}
            />
          </>
        )}
      </div>
    </>
  );
}
export default PaintingList;
