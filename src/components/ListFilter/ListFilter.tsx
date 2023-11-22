import { useCallback, memo } from 'react';

import FilterUL from '@/components/FilterUL/FilterUL.tsx';
import Select from '@/components/Select/Select';

export interface IListFilter {
  name: string;
  data: { id: number; name: string }[];
  onChange: (obj: { id: number; name: string } | undefined) => void;
  filter: number;
  isDark: boolean;
}

function ListFilter({ name, data, onChange, filter, isDark }: IListFilter) {
  const handleFilterChange = useCallback(
    (value: string) => {
      onChange(JSON.parse(value));
    },
    [onChange]
  );

  const clearFilter = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  return (
    <Select
      name={name}
      value={data.find((item) => item.id === filter)?.name}
      clear={clearFilter}
      isDark={isDark}
      absolute
    >
      <FilterUL data={data} change={handleFilterChange} isDark={isDark} />
    </Select>
  );
}

export default memo(ListFilter);
