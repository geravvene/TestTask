/* eslint-disable no-self-assign */
import { memo } from 'react';

import { isEqual } from 'lodash';

import Card from '../../ReUseComponents/Card/Card';
import { TPainting, IPaintingList } from '../../../types';
import style from './paintings.module.scss';

interface IPaintings extends IPaintingList {
  data: TPainting[];
}

function isEquals(prev: IPaintings, next: IPaintings) {
  return (
    isEqual(prev.authors, next.authors) && isEqual(prev.locations, next.locations) && isEqual(prev.data, next.data)
  );
}

const imgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = e.currentTarget.src;
  e.currentTarget.onerror = null;
};

function Paintings({ data, authors, locations }: IPaintings) {
  return !data.length ? (
    <p>Do not found</p>
  ) : (
    <div className={style.grid}>
      {data.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          description={[
            {
              id: 1,
              property: 'Author',
              value: authors.find((author) => author.id === item.authorId)?.name ?? 'Not Stated',
            },
            {
              id: 2,
              property: 'Created',
              value: item.created,
            },
            {
              id: 3,
              property: 'Location',
              value: locations.find((location) => location.id === item.locationId)?.name ?? 'Not Stated',
            },
          ]}
          className={style.painting}
        >
          <img
            alt={item.name}
            src={`https://test-front.framework.team${item.imageUrl}`}
            loading="lazy"
            onError={imgError}
          />
        </Card>
      ))}
    </div>
  );
}
export default memo(Paintings, isEquals);
