import { isEqual } from 'lodash';
import { useRef, useState, memo, useCallback } from 'react';
import cn from 'classnames/bind';
import style from './filterUL.module.scss';

const cx = cn.bind(style);

interface IFilterUL {
  data: { id: number; name: string }[];
  onClick: (filterName: string, value: any) => void;
  filterName: string;
  isDark: boolean;
}

const hoverFunction = (elem: HTMLLIElement, hoverElem: HTMLDivElement) => {
  hoverElem.style.setProperty('height', `${elem.clientHeight}px`);
  hoverElem.style.setProperty(
    'margin-top',
    `${
      elem.getBoundingClientRect().y -
      hoverElem.parentElement!.getBoundingClientRect().y
    }px`
  );
};

function isEquals(prev: IFilterUL, next: IFilterUL) {
  return (
    isEqual(prev.data, next.data) &&
    isEqual(prev.onClick, next.onClick) &&
    prev.filterName === next.filterName &&
    prev.isDark === next.isDark
  );
}

function FilterUL({ data, onClick, filterName, isDark }: IFilterUL) {
  const [hover, setHover] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const resetHover = useCallback(() => {
    ref.current!.style.setProperty('height', '0px');
    setHover(0);
  }, []);
  const onHover = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setHover(e.currentTarget.value);
      hoverFunction(e.currentTarget, ref.current!);
    },
    []
  );
  return (
    <>
      <div ref={ref} className={cx('hoverBlock', { dark: isDark })} />
      <ul className={cx('filter', { dark: isDark })} onScroll={resetHover}>
        {data.map((item) => (
          <li
            className={cx({ hover: hover === item.id })}
            key={item.id}
            value={item.id}
            onMouseEnter={onHover}
            onMouseLeave={resetHover}
          >
            <button
              type="button"
              onClick={() => onClick(filterName, String(item.id))}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default memo(FilterUL, isEquals);
