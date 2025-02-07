import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from '../services/charactersApi';
import { episodesApi } from '../services/episodesApi';
import { locationsApi } from '../services/locationsApi';
import themeReducer from '@/store/themeSlice';
import formReducer from '@/store/formSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    [episodesApi.reducerPath]: episodesApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware, episodesApi.middleware, locationsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;