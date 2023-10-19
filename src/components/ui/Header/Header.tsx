import cn from 'classnames/bind';
import style from './header.module.scss';
import useActions from '../../../hooks/useActions';
import { ReactComponent as Light } from '../../../assets/svg/light.svg';
import { ReactComponent as Logo } from '../../../assets/svg/logo.svg';

const cx = cn.bind(style);

interface IHeader {
  isDark: boolean
}

function Header({ isDark }: IHeader) {
  const { change } = useActions();
  return (
    <header
      className={cx('header', {
        dark: isDark,
      })}
    >
      <Logo />
      <button type="button" onClick={() => change()}>
        <Light />
      </button>
    </header>
  );
}
export default Header;
