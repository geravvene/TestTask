import cn from 'classnames/bind';

import style from './card.module.scss';
import { TDescriptionLine } from '@/types';

const cx = cn.bind(style);

export interface ICard {
  name: string;
  description: TDescriptionLine[];
  children: React.ReactNode;
  className: string;
}

function Card({ name, description=[], children, className }: ICard) {
  return (
    <div className={cx('card', className)}>
      {children}
      <div className={style.info}>
        {name}
        {description.map((line) => (
          <p key={line.id}>
            {`${line.property}:`}
            <span>{line.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Card;
