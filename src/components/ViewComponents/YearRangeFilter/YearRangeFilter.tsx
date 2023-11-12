import { useCallback, useState, useEffect, useRef, memo } from 'react';

import style from './YearRangeFilter.module.scss';
import Input from '../../ReUseComponents/Input/Input';
import Select from '../../ReUseComponents/Select/Select';

const valueToCreated = (str: string) =>
  str
    ? str +
      Array(4 - str.length)
        .fill('0')
        .join('')
    : '';

interface IYearRangeFilter {
  name: string;
  to: string;
  before: string;
  onChange: (range: { to: string; before: string }) => void;
  isDark: boolean;
}

function YearRangeFilter({ name, to, before, onChange, isDark}: IYearRangeFilter) {
  const refForm = useRef<HTMLFormElement>(null);

  const [range, setRange] = useState({ to, before });

  const inputRangeChange = useCallback(
    ({ target: { id, value } }: React.ChangeEvent<HTMLInputElement>) => {
      if ((Number(value) && value.length <= 4) || !value)
        setRange((prev) => ({ ...prev, [id]: valueToCreated(value) }));
    },
    [onChange]
  );

  const clearRange = useCallback(() => {
    setRange({ to: '', before: '' });
    refForm.current!.reset();
  }, []);

  useEffect(() => {
    onChange(range);
  }, [range]);

  return (
    <Select
      name={name}
      value={
        range.to || range.before ? `${range.to ? range.to : '...'} - ${range.before ? range.before : '...'}` : undefined
      }
      clear={clearRange}
      isDark={isDark}
      absolute={false}
    >
      <form className={style.inputContainer} ref={refForm}>
        <Input time={1000} type="text" placeholder="to" id="to" defaultValue={range.to} onChange={inputRangeChange} />
        —
        <Input
          time={1000}
          type="text"
          placeholder="before"
          id="before"
          onChange={inputRangeChange}
          defaultValue={range.before}
        />
      </form>
    </Select>
  );
}

export default memo(YearRangeFilter);


