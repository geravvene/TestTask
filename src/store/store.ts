import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme/theme.slice';

const store = configureStore({
  reducer: { themeReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
