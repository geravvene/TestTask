import cn from 'classnames/bind';
import { useRef } from 'react';
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
  clear: () => void;
}

function Select({ children, value, clear, name, isDark }: ISelect) {
  const ref = useRef<HTMLInputElement>(null);
  useOutsideClick(ref, () => ref.current?.classList.remove(style.active));
  return (
    <div
      onKeyDown={(e) => e.currentTarget.classList.add(style.active)}
      role="button"
      tabIndex={0}
      ref={ref}
      className={cx('menu', {
        dark: isDark,
      })}
      onClick={(e) => e.currentTarget.classList.toggle(style.active)}
    >
      <div className={style.choice}>
        {value ? (
          <div>
            <p>{value}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
            >
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
