import { useCallback } from 'react';

import cn from 'classnames/bind';

import style from './filterPanel.module.scss';
import { TParams, IPaintingList } from '../../../types';
import Input from '../../ReUseComponents/Input/Input';
import YearRangeFilter from '../YearRangeFilter/YearRangeFilter';
import ListFilter from '../ListFilter/ListFilter';

const cx = cn.bind(style);

interface IFilterPanel extends IPaintingList {
  params: TParams;
  setParams: React.Dispatch<React.SetStateAction<TParams>>;
  isDark: boolean;
}

function FilterPanel({ authors, locations, isDark, params, setParams }: IFilterPanel) {
  const setFilter = useCallback(
    (property: object) => {
      setParams((prev) => ({ ...prev, ...property, _page: '1' }));
    },
    [setParams]
  );

  const setRangeFilter = useCallback(
    (range: { to: string; before: string }) => {
      setFilter({ created_gte: range.to, created_lte: range.before });
    },
    [setFilter]
  );

  const setAuthorFilter = useCallback(
    (id: number | undefined) => {
      setFilter({ authorId: String(id ?? '') });
    },
    [setFilter]
  );

  const setLocationFilter = useCallback(
    (id: number | undefined) => {
      setFilter({ locationId: String(id ?? '') });
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
      <YearRangeFilter
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
