import { useRef } from 'react';
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

function FilterUL({ data, onClick, filterName, isDark }: IFilterUL) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={ref} className={cx('hover', { dark: isDark })} />
      <ul
        className={cx('filter', { dark: isDark })}
        onMouseLeave={() => ref.current!.style.setProperty('height', "0px")}
      >
        {data.map((item) => (
          <li
            key={item.id}
            onMouseEnter={(e) => hoverFunction(e.currentTarget, ref.current!)}
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

export default FilterUL;
