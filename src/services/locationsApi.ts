import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Location } from '@/types/location';

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getLocations: builder.query<{ results: Location[] }, void>({
      query: () => '/location',
    }),
    getLocationById: builder.query<Location, string>({
      query: (id) => `/location/${id}`,
    }),
  }),
});

export const { useGetLocationsQuery, useGetLocationByIdQuery } = locationsApi;