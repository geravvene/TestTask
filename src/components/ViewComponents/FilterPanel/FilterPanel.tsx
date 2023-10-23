import { useCallback, memo } from 'react';
import { isEqual, omit } from 'lodash';
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
    isEqual(prev.authors, next.authors) &&
    isEqual(prev.locations, next.locations) &&
    prev.isDark === next.isDark &&
    isEqual(omit(prev.params, '_page'), omit(next.params, '_page')) &&
    isEqual(prev.setParams, next.setParams)
  );
}

function valueToCreated(str: string, func: (str: string) => void) {
  if (str === '') {
    func(str);
    return;
  }
  if (!Number(str) || !(str.length <= 4)) return;
  let newStr = str;
  while (newStr.length < 4) {
    newStr += '0';
  }
  func(newStr);
}

function FilterPanel({
  authors,
  locations,
  isDark = false,
  params,
  setParams,
}: IFilterPanel) {
  const setFilter = useCallback(
    (property: string, value: string) => {
      setParams({ ...params, [property]: value, _page: '1' });
    },
    [params]
  );
  return (
    <div className={style.container}>
      <div>
        <input
          className={cx('searchInput', {
            dark: isDark,
          })}
          placeholder='Name'
          type='text'
          defaultValue={params.name_like}
          onChange={debounce(
            (e: React.ChangeEvent<HTMLInputElement>) =>
              setFilter('name_like', e.target.value),
            1000
          )}
        />
      </div>
      <Select
        name='Author'
        value={
          authors.find((author) => author.id === Number(params.authorId))?.name
        }
        clear={() => setFilter('authorId', '')}
        isDark={isDark}
        absolute
      >
        <FilterUL
          data={authors}
          onClick={setFilter}
          filterName='authorId'
          isDark={isDark}
        />
      </Select>
      <Select
        name='Location'
        value={
          locations.find(
            (location) => location.id === Number(params?.locationId)
          )?.name
        }
        clear={() => setFilter('locationId', '')}
        isDark={isDark}
        absolute
      >
        <FilterUL
          data={locations}
          onClick={setFilter}
          filterName='locationId'
          isDark={isDark}
        />
      </Select>
      <Select
        name='Created'
        value={
          params.created_gte || params.created_lte
            ? `${params.created_gte ? params.created_gte : '...'} - ${
                params.created_lte ? params.created_lte : '...'
              }`
            : undefined
        }
        clear={() => {
          setParams({
            ...params,
            created_gte: '',
            created_lte: '',
            _page: '1',
          });
          $('#inputCreatedFrom').val('');
          $('#inputCreatedTo').val('');
        }}
        isDark={isDark}
        absolute={false}
      >
        <div className={style.inputContainer}>
          <input
            id='inputCreatedFrom'
            placeholder='from'
            type='text'
            defaultValue={params.created_gte}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={debounce(
              (e: React.ChangeEvent<HTMLInputElement>) =>
                valueToCreated(e.target.value, (str) =>
                  setFilter('created_gte', str)
                ),
              1000
            )}
          />
          —
          <input
            type='text'
            placeholder='before'
            id='inputCreatedTo'
            defaultValue={params.created_lte}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={debounce(
              (e: React.ChangeEvent<HTMLInputElement>) =>
                valueToCreated(e.target.value, (str) =>
                  setFilter('created_lte', str)
                ),
              1000
            )}
          />
        </div>
      </Select>
    </div>
  );
}

export default memo(FilterPanel, isEquals);
