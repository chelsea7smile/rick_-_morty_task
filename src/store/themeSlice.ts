import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
      document.body.classList.toggle('dark', state.isDark);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;