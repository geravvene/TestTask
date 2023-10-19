import debounce from 'debounce';
import cn from 'classnames/bind';
import style from './filterPanel.module.scss';
import Select from '../../ReUseComponents/Select/Select';
import { TParams, IPaintingList } from '../../../types';

const cx = cn.bind(style);

interface IFilterPanel extends IPaintingList {
  params: TParams;
  setParams: React.Dispatch<React.SetStateAction<TParams>>;
  isDark: boolean;
}

function FilterPanel({
  authors,
  locations,
  isDark = false,
  params,
  setParams,
}: IFilterPanel) {
  const setFilter = (property: string, value: string) => {
    setParams({ ...params, [property]: value, _page: '1' });
  };
  return (
    <div className={style.container}>
      <div>
        <input
          className={cx('searchInput', {
            dark: isDark,
          })}
          placeholder="Name"
          type="text"
          defaultValue={params.name_like}
          onChange={debounce(
            (e: React.ChangeEvent<HTMLInputElement>) =>
              setFilter('name_like', e.target.value),
            1000
          )}
        />
      </div>
      <Select
        name="Author"
        value={
          authors.find((author) => author.id === Number(params.authorId))?.name
        }
        clear={() => setFilter('authorId', '')}
        isDark={isDark}
      >
        <ul>
          {authors.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setFilter('authorId', String(item.id))}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </Select>
      <Select
        name="Location"
        value={
          locations.find(
            (location) => location.id === Number(params?.locationId)
          )?.location
        }
        clear={() => setFilter('locationId', '')}
        isDark={isDark}
      >
        <ul>
          {locations.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setFilter('locationId', String(item.id))}
              >
                {item.location}
              </button>
            </li>
          ))}
        </ul>
      </Select>
      <Select
        name="Created"
        value={
          params.created_gte || params.created_lte
            ? `${params.created_gte ? params.created_gte : '...'} - ${
                params.created_lte ? params.created_lte : '...'
              }`
            : undefined
        }
        clear={() => {
          setParams({ ...params, created_gte: '', created_lte: '' });
          $('#inputCreatedFrom').val('');
          $('#inputCreatedTo').val('');
        }}
        isDark={isDark}
      >
        <div className={style.inputContainer}>
          <input
            id="inputCreatedFrom"
            placeholder="from"
            type="text"
            defaultValue={params.created_gte}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={debounce(
              (e: React.ChangeEvent<HTMLInputElement>) =>
                Number(e.target.value) || e.target.value === ''
                  ? setFilter('created_gte', e.target.value)
                  : null,
              1000
            )}
          />
          —
          <input
            type="text"
            placeholder="before"
            id="inputCreatedTo"
            defaultValue={params.created_lte}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={debounce(
              (e: React.ChangeEvent<HTMLInputElement>) =>
                Number(e.target.value) || e.target.value === ''
                  ? setFilter('created_lte', e.target.value)
                  : null,
              1000
            )}
          />
        </div>
      </Select>
    </div>
  );
}

export default FilterPanel;
