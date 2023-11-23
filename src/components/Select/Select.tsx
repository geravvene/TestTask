/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useCallback, useState, PropsWithChildren } from 'react';

import cn from 'classnames/bind';

import style from './Select.module.scss';
import { ReactComponent as SelectArrow } from '@svg/selectArrow.svg';
import { ReactComponent as Cross } from '@svg/cross.svg';
import useOutsideClick from '@/hooks/useOutsideClick';

const cx = cn.bind(style);

export interface ISelect extends PropsWithChildren {
  isDark: boolean;
  value: string | undefined;
  name: string;
  absolute: boolean;
  clear: () => void;
}

function Select({ children, value, clear, name, isDark, absolute }: ISelect) {
  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  useOutsideClick(ref, () => setActive(false));

  const handleToggleActive = () => setActive(!active);

  const clearSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      clear();
    },
    [clear]
  );

  return (
    <div
      role="select"
      tabIndex={0}
      ref={ref}
      className={cx('menu', {
        dark: isDark,
        absolute,
        active,
      })}
      onClick={handleToggleActive}
    >
      <div className={style.choice}>
        {value ? (
          <div>
            <p>{value}</p>
            <button type="reset" onClick={clearSelect}>
              <Cross />
            </button>
          </div>
        ) : (
          `${name}`
        )}
        <SelectArrow />
      </div>
      <div className={style.dropdown}>{children}</div>
    </div>
  );
}

export default Select;
