import { useCallback, useState, useEffect, memo } from 'react';

import FilterUL from '../../ReUseComponents/FilterUL/FilterUL';
import Select from '../../ReUseComponents/Select/Select';

interface IListFilter {
  name: string;
  data: { id: number; name: string }[];
  onChange: (id: number | undefined) => void;
  filter: number;
  isDark:boolean
}

function ListFilter({ name, data, onChange, filter, isDark }: IListFilter) {
  const [currentFilter, setCurrentFilter] = useState(data.find((item) => item.id === filter));

  const handleFilterChange = useCallback(
    (value: string) => {
      setCurrentFilter(JSON.parse(value));
    },
    [onChange]
  );

  const clearFilter = useCallback(() => {
    setCurrentFilter(undefined);
  }, []);

  useEffect(() => {
    onChange(currentFilter?.id);
  }, [currentFilter]);

  return (
    <Select name={name} value={currentFilter?.name} clear={clearFilter} isDark={isDark} absolute>
      <FilterUL data={data} change={handleFilterChange} isDark={isDark} />
    </Select>
  );
}

export default memo(ListFilter);
