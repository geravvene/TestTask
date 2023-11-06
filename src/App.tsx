import { useQuery } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import cn from 'classnames/bind';

import style from './app.module.scss';
import Header from './components/ui/Header/Header';
import PaintingList from './components/ViewComponents/PaintingsList/PaintingsList';
import DataService from './services/data.service';
import useTypedSelector from './hooks/useTypedSelector';
import { TLocation } from './types';

const cx = cn.bind(style);

function App() {
  const { isDark } = useTypedSelector((state) => state.themeReducer);

  const authors = useQuery(['authors'], () => DataService.getData('authors'));

  const locations = useQuery(['locations'], () => DataService.getData('locations'));

  if (authors.isLoading || locations.isLoading) return null;

  if (authors.isError || locations.isError) return <p>Error</p>;
  
  return (
    <BrowserRouter>
      <Header isDark={isDark} />
      <main
        className={cx('main', {
          dark: isDark,
        })}
      >
        <Routes>
          <Route
            element={
              <PaintingList
                authors={authors.data}
                locations={locations.data.map((item: TLocation) => ({
                  id: item.id,
                  name: item.location,
                }))}
              />
            }
            path="*"
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
