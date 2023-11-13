import { useCallback, useRef, memo } from 'react';

import style from './RangeFilter.module.scss';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';

export interface IRangeFilter {
  name: string;
  to: string;
  before: string;
  onChange: (range: { to: string; before: string }) => void;
  isDark: boolean;
}

function RangeFilter({ name, to, before, onChange, isDark }: IRangeFilter) {
  const refForm = useRef<HTMLFormElement>(null);

  const inputRangeChange = useCallback(
    ({ target: { id, value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ to, before, [id]: value });
    },
    [onChange, to, before]
  );

  const clearRange = useCallback(() => {
    onChange({ to: '', before: '' });
    refForm.current!.reset();
  }, [onChange]);

  return (
    <Select
      name={name}
      value={to || before ? `${to || '...'} - ${before || '...'}` : undefined}
      clear={clearRange}
      isDark={isDark}
      absolute={false}
    >
      <form className={style.inputContainer} ref={refForm}>
        <Input time={1000} type="text" placeholder="to" id="to" defaultValue={to} onChange={inputRangeChange} />
        —
        <Input
          time={1000}
          type="text"
          placeholder="before"
          id="before"
          onChange={inputRangeChange}
          defaultValue={before}
        />
      </form>
    </Select>
  );
}

export default memo(RangeFilter);
