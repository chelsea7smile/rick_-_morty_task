import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacterById: builder.query({
      query: (id: number) => `character/${id}`,
    }),

    getCharacters: builder.query({
      query: ({ page = 1, name = '', status = '', species = '', gender = '' }: { page: number; name: string; status: string; species: string; gender: string }) => {
        const queryParams: string[] = [];
        if (name) queryParams.push(`name=${name}`);
        if (status) queryParams.push(`status=${status}`);
        if (species) queryParams.push(`species=${species}`);
        if (gender) queryParams.push(`gender=${gender}`);
        return `character?page=${page}&${queryParams.join('&')}`;
      },
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } = charactersApi;