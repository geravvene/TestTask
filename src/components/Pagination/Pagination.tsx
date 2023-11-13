import cn from 'classnames/bind';

import PaginationPageWithActive from './PaginationPageWithActive';
import PaginationPage from './PaginationPage';
import { ReactComponent as DoubleArrowL } from '../../../assets/svg/doubleArrowL.svg';
import { ReactComponent as ArrowR } from '../../../assets/svg/arrowR.svg';
import { ReactComponent as DoubleArrowR } from '../../../assets/svg/doubleArrowR.svg';
import { ReactComponent as ArrowL } from '../../../assets/svg/arrowL.svg';
import usePaginationSlice from '@/hooks/usePaginationSlice';
import style from './Pagination.module.scss';

const cx = cn.bind(style);

export interface IPagination {
  isDarkTheme: boolean;
  pagesAmount: number;
  currentPage: number;
  className: string;
  onChange: (currentPage: number) => void;
}

function Pagination({ currentPage = 1, isDarkTheme = false, pagesAmount, className, onChange }: IPagination) {
  const slicedPagesArray = usePaginationSlice({
    current: currentPage,
    amount: pagesAmount,
  });

  return (
    <div className={cx(className, 'Pagination')}>
      <PaginationPage isDarkTheme={isDarkTheme} disabled={currentPage < 2} onClick={() => onChange(1)}>
        <DoubleArrowL />
      </PaginationPage>
      <PaginationPage isDarkTheme={isDarkTheme} disabled={currentPage < 2} onClick={() => onChange(currentPage - 1)}>
        <ArrowL />
      </PaginationPage>

      {slicedPagesArray.map((el) => (
        <PaginationPageWithActive
          isDarkTheme={isDarkTheme}
          onClick={() => onChange(el)}
          isActive={currentPage === el}
          key={el}
          disabled={false}
        >
          {el}
        </PaginationPageWithActive>
      ))}
      <PaginationPage
        isDarkTheme={isDarkTheme}
        disabled={currentPage >= pagesAmount}
        onClick={() => onChange(currentPage + 1)}
      >
        <ArrowR />
      </PaginationPage>
      <PaginationPage
        isDarkTheme={isDarkTheme}
        disabled={currentPage >= pagesAmount}
        onClick={() => onChange(pagesAmount)}
      >
        <DoubleArrowR />
      </PaginationPage>
    </div>
  );
}

export default Pagination;
