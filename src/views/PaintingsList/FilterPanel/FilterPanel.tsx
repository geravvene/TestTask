import { useCallback } from 'react';

import cn from 'classnames/bind';

import style from './filterPanel.module.scss';
import { TParams, IPaintingList } from '@/types';
import Input from '@/components/Input/Input';
import RangeFilter from '@/components/RangeFilter/RangeFilter';
import ListFilter from '@/components/ListFilter/ListFilter';

const cx = cn.bind(style);

interface IFilterPanel extends IPaintingList {
  params: TParams;
  setParams: React.Dispatch<React.SetStateAction<TParams>>;
  isDark: boolean;
}

const valueToCreated = (str: string) =>
  str
    ? str +
      Array(4 - str.length)
        .fill('0')
        .join('')
    : '';

function FilterPanel({ authors, locations, isDark, params, setParams }: IFilterPanel) {
  const setFilter = useCallback(
    (property: object) => {
      setParams((prev) => ({ ...prev, ...property, _page: '1' }));
    },
    [setParams]
  );

  const setRangeFilter = useCallback(
    ({ to, before }: { to: string; before: string }) => {
      if (((Number(to) && to.length <= 4) || !to) && ((Number(before) && before.length <= 4) || !before)) {
        setFilter({ created_gte: valueToCreated(to), created_lte: valueToCreated(before) });
      }
    },
    [setFilter]
  );

  const setAuthorFilter = useCallback(
    (obj: { id: number; name: string } | undefined) => {
      setFilter({ authorId: String(obj?.id ?? '') });
    },
    [setFilter]
  );

  const setLocationFilter = useCallback(
    (obj: { id: number; name: string } | undefined) => {
      setFilter({ locationId: String(obj?.id ?? '') });
    },
    [setFilter]
  );

  const inputSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ [e.target.id]: e.target.value });
  }, []);

  return (
    <div className={style.container}>
      <div>
        <Input
          onChange={inputSearchChange}
          id="name_like"
          time={1000}
          className={cx('searchInput', {
            dark: isDark,
          })}
          type="text"
          defaultValue={params.name_like}
          placeholder="Name"
        />
      </div>
      <ListFilter
        data={authors}
        name="Authors"
        filter={Number(params.authorId)}
        onChange={setAuthorFilter}
        isDark={isDark}
      />
      <ListFilter
        data={locations}
        name="Locations"
        filter={Number(params.locationId)}
        onChange={setLocationFilter}
        isDark={isDark}
      />
      <RangeFilter
        name="Created"
        to={params.created_gte}
        before={params.created_lte}
        onChange={setRangeFilter}
        isDark={isDark}
      />
    </div>
  );
}

export default FilterPanel;
