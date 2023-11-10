import { useCallback, memo, useMemo } from 'react';

import { omit, isEqual } from 'lodash';
import debounce from 'debounce';
import cn from 'classnames/bind';

import style from './filterPanel.module.scss';
import Select from '../../ReUseComponents/Select/Select';
import { TParams, IPaintingList } from '../../../types';
import FilterUL from '../../ReUseComponents/FilterUL/FilterUL';

const cx = cn.bind(style);

interface IFilterPanel extends IPaintingList {
  params: TParams;
  setParams: React.Dispatch<React.SetStateAction<TParams>>;
  isDark: boolean;
}

function isEquals(prev: IFilterPanel, next: IFilterPanel) {
  return (
    prev.authors === next.authors &&
    prev.locations === next.locations &&
    prev.isDark === next.isDark &&
    isEqual(omit(prev.params, '_page'), omit(next.params, '_page')) &&
    prev.setParams === next.setParams
  );
}

const valueToCreated = (str: string) =>
  str +
  Array(4 - str.length)
    .fill('0')
    .join('');

function FilterPanel({ authors, locations, isDark, params, setParams }: IFilterPanel) {
  const setFilter = useCallback(
    (property: string, value: string) => {
      setParams((prev) => ({ ...prev, [property]: value, _page: '1' }));
    },
    [setParams]
  );

  const currentLocation = useMemo(
    () => locations.find((location) => location.id === Number(params?.locationId)),
    [params, locations]
  );

  const currentAuthor = useMemo(
    () => authors.find((author) => author.id === Number(params?.authorId)),
    [params, authors]
  );

  const inputSearchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.id, e.target.value), 1000),
    []
  );

  const inputRangeChange = useCallback(
    debounce(
      ({ target: { id, value } }: React.ChangeEvent<HTMLInputElement>) =>
        (!Number(value) || !(value.length <= 4)) && value ? null : setFilter(id, value ? valueToCreated(value) : value),
      1000
    ),
    []
  );

  return (
    <div className={style.container}>
      <div>
        <input
          className={cx('searchInput', {
            dark: isDark,
          })}
          placeholder="Name"
          id="name_like"
          type="text"
          defaultValue={params.name_like}
          onChange={inputSearchChange}
        />
      </div>
      <Select
        name="Author"
        value={currentAuthor?.name}
        clear={() => setFilter('authorId', '')}
        isDark={isDark}
        absolute
      >
        <FilterUL data={authors} change={setFilter} filterName="authorId" isDark={isDark} />
      </Select>
      <Select
        name="Location"
        value={currentLocation?.name}
        clear={() => setFilter('locationId', '')}
        isDark={isDark}
        absolute
      >
        <FilterUL data={locations} change={setFilter} filterName="locationId" isDark={isDark} />
      </Select>
      <Select
        name="Created"
        value={
          params.created_gte || params.created_lte
            ? `${params.created_gte ? params.created_gte : '...'} - ${params.created_lte ? params.created_lte : '...'}`
            : undefined
        }
        clear={() => {
          setParams({
            ...params,
            created_gte: '',
            created_lte: '',
            _page: '1',
          });
          $('#created_gte').val('');
          $('#created_lte').val('');
        }}
        isDark={isDark}
        absolute={false}
      >
        <div className={style.inputContainer}>
          <input
            id="created_gte"
            placeholder="from"
            type="text"
            defaultValue={params.created_gte}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={inputRangeChange}
          />
          —
          <input
            type="text"
            placeholder="before"
            id="created_lte"
            defaultValue={params.created_lte}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={inputRangeChange}
          />
        </div>
      </Select>
    </div>
  );
}

export default memo(FilterPanel, isEquals);
