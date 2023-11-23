import { useCallback } from 'react';

import cn from 'classnames/bind';

import style from './Header.module.scss';
import useTheme from '@/hooks/useTheme';
import { ReactComponent as Light } from '@svg/light.svg';
import { ReactComponent as Logo } from '@svg/logo.svg';

const cx = cn.bind(style);

function Header() {
  const { isDark, setIsDark } = useTheme();

  const clickChange = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark, setIsDark]);

  return (
    <header
      className={cx('header', {
        dark: isDark,
      })}
    >
      <Logo />
      <button type="button" onClick={clickChange}>
        <Light />
      </button>
    </header>
  );
}
export default Header;
