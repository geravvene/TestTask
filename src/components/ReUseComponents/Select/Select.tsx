import cn from 'classnames/bind';
import { useRef, useCallback } from 'react';
import style from './select.module.scss';
import { ReactComponent as SelectArrow } from '../../../assets/svg/selectArrow.svg';
import { ReactComponent as Cross } from '../../../assets/svg/cross.svg';
import useOutsideClick from '../../../hooks/useOutsideClick';

const cx = cn.bind(style);

export interface ISelect {
  children: React.ReactNode;
  isDark: boolean;
  value: string | undefined;
  name: string;
  absolute: boolean;
  clear: () => void;
}

function Select({ children, value, clear, name, isDark, absolute }: ISelect) {
  const ref = useRef<HTMLInputElement>(null);
  useOutsideClick(ref, () => ref.current?.classList.remove(style.active));
  const clearSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      clear();
    },
    []
  );
  const toggleSelect = useCallback(
    (e: any) => {
      e.currentTarget.classList.toggle(style.active);
    },
    []
  );
  return (
    <div
      onKeyDown={toggleSelect}
      role="button"
      tabIndex={0}
      ref={ref}
      className={cx('menu', {
        dark: isDark,
        absolute,
      })}
      onClick={toggleSelect}
    >
      <div className={style.choice}>
        {value ? (
          <div>
            <p>{value}</p>
            <button type="button" onClick={clearSelect}>
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