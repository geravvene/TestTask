import { ButtonHTMLAttributes } from 'react';

import cn from 'classnames/bind';

import style from './PaginationPage.module.scss';

const cx = cn.bind(style);

export interface IPaginationPage extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme: boolean;
  disabled: boolean;
}

function PaginationPage({ isDarkTheme, className, disabled = false, onClick, children }: IPaginationPage) {
  return (
    <button
      type="button"
      className={cx(
        'PaginationPage',
        {
          dark: isDarkTheme,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PaginationPage;
