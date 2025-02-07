import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  search: string;
  filters: { [key: string]: string };
  error: string | null;
}

const initialState: FormState = {
  search: '',
  filters: {},
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilter(state, action: PayloadAction<{ name: string; value: string }>) {
      state.filters[action.payload.name] = action.payload.value;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setSearch, setFilter, setError } = formSlice.actions;

export default formSlice.reducer;