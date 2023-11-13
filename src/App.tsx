import { useQuery } from '@tanstack/react-query';

import cn from 'classnames/bind';

import style from './app.module.scss';
import Header from '@/ui/Header/Header';
import PaintingList from '@/views/PaintingsList/PaintingsList';
import DataService from './services/data.service';
import useTheme from './hooks/useTheme';
import { TLocation } from './types';

const cx = cn.bind(style);

function App() {
  const { isDark } = useTheme();

  const authors = useQuery(['authors'], () => DataService.getData('authors'));

  const locations = useQuery(['locations'], () => DataService.getData('locations'));

  if (authors.isLoading || locations.isLoading) return null;

  if (authors.isError || locations.isError) return <p>Error</p>;

  return (
    <>
      <Header />
      <main
        className={cx('main', {
          dark: isDark,
        })}
      >
        <PaintingList
          authors={authors.data}
          locations={locations.data.map((item: TLocation) => ({
            id: item.id,
            name: item.location,
          }))}
        />
      </main>
    </>
  );
}

export default App;
