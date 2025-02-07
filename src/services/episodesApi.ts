import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Episode } from '@/types/episode';

const baseUrl = 'https://rickandmortyapi.com/api/';

export const episodesApi = createApi({
  reducerPath: 'episodesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEpisode: builder.query<Episode, { id: string }>({
      query: ({ id }) => `episode/${id}`,
    }),

    getEpisodes: builder.query<{ results: Episode[] }, { ids: string[] }>({
      query: ({ ids }) => `episode/${ids.join(',')}`,
    }),
  }),
});

export const { useGetEpisodeQuery, useGetEpisodesQuery } = episodesApi;