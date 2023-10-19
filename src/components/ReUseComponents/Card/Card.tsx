import { useState } from 'react';
import cn from 'classnames/bind';
import style from './card.module.scss';
import { TDescriptionLine } from '../../../types';

const cx = cn.bind(style);

interface ICard {
  item: { id: number; imageUrl: string; name: string }
  description: TDescriptionLine[]
}

function Card({ item, description }: ICard) {
  const [active, setActive] = useState(false);
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={style.card}
    >
      <img
        alt={item.name}
        src={`https://test-front.framework.team${item.imageUrl}`}
      />
      <div id={`info${item.id}`} className={cx('info', { active })}>
        {item.name}
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
