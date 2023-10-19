import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { useSearchParams } from 'react-router-dom';
import DataService from '../../../services/data.service';
import style from './paintingsList.module.scss';
import useTypedSelector from '../../../hooks/useTypedSelector';
import { TParams, IPaintingList } from '../../../types';
import Paintings from '../Paintings/Paintings';
import FilterPanel from '../FilterPanel/FilterPanel';

const limit = 12;

const deleteEmptyStringProperties = (obj: object) => Object.fromEntries(Object.entries(obj).filter((v) => v[1] !== ''));

function PaintingList({ authors, locations }: IPaintingList) {
  const { isDark } = useTypedSelector((state) => state.themeReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<TParams>({
    _page: '1',
    name_like: '',
    authorId: '',
    locationId: '',
    created_gte: '',
    created_lte: '',
  });
  const {
    data, isLoading, isFetching, isError,
  } = useQuery(
    ['paintings', qs.stringify(params)],
    () => DataService.getResponse(
      `paintings?${qs.stringify(
        deleteEmptyStringProperties(params),
      )}&_limit=${limit}`,
    ),
  );
  useEffect(() => {
    setParams({ ...params, ...Object.fromEntries([...searchParams]) });
  }, []);
  useEffect(() => {
    setSearchParams(qs.stringify(deleteEmptyStringProperties(params)));
  }, [params]);
  return (
    <>
      <FilterPanel
        params={params}
        setParams={setParams}
        authors={authors}
        locations={locations}
        isDark={isDark}
      />
      <div className={style.content}>
        {isLoading || isFetching || isError ? null : (
          <Paintings
            data={data.data}
            params={params}
            setParams={setParams}
            pagesAmount={Math.ceil(data.headers['x-total-count'] / limit)}
            authors={authors}
            locations={locations}
            isDark={isDark}
          />
        )}
      </div>
    </>
  );
}
export default PaintingList;
