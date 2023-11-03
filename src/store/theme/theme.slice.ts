/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: JSON.parse(localStorage.getItem('darkTheme') ?? 'true'),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    change: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem('darkTheme', JSON.stringify(state.isDark));
    },
  },
});

export const { change } = themeSlice.actions;
export default themeSlice.reducer;
