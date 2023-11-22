import cn from 'classnames/bind';

import PaginationPage, { IPaginationPage } from './PaginationPage';
import style from './PaginationPage.module.scss';

const cx = cn.bind(style);

interface IPaginationPageWithActive extends IPaginationPage {
  isActive: boolean;
}

function PaginationPageWithActive({
  isDarkTheme,
  isActive,
  className,
  disabled,
  onClick,
  children,
}: IPaginationPageWithActive) {
  return (
    <PaginationPage
      isDarkTheme={isDarkTheme}
      className={cx(className, {
        WithActive: isActive,
        dark: isDarkTheme && isActive,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </PaginationPage>
  );
}

export default PaginationPageWithActive;
