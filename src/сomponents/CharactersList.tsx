import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetCharactersQuery } from '../services/charactersApi';
import { Character } from '@/types/character';
import SearchFilterForm from './SearchFilterForm';

const CharactersList: React.FC = () => {
  const router = useRouter();

  const page = Number(router.query.page) && Number(router.query.page) > 0 ? Number(router.query.page) : 1;
  const name = (router.query.name as string) || '';
  const status = (router.query.status as string) || '';
  const species = (router.query.species as string) || '';
  const gender = (router.query.gender as string) || '';

  const [search, setSearch] = useState(name);

  const { data, error, isLoading } = useGetCharactersQuery({
    page,
    name,
    status,
    species,
    gender,
  });

  const validateSearchInput = (input: string) => {
    return /^[a-zA-Z0-9\s-]*$/.test(input);
  };

  const handleSearchSubmit = (search: string) => {
    if (!validateSearchInput(search)) {
      alert('Invalid search input. Please use only letters, numbers, spaces, and dashes.');
      return;
    }

    setSearch(search);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, name: search },
    });
  };

  const handleFilterChange = (filterName: string, value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, [filterName]: value },
    });
  };

  const handlePageChange = (value: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: value },
    });
  };

  const handleCharacterClick = (id: number) => {
    router.push(`/character/${id}`);
  };

  if (isLoading) return <div className="text-center text-xl font-semibold">Loading...</div>;

  if (error) {
    if ((error as any).status === 404) {
      return <p className="text-center text-gray-500">No characters found. Try a different search.</p>;
    }
    return <div className="text-center text-red-500 font-semibold">Error: {(error as any).message}</div>;
  }

  const totalPages = data?.info?.pages || 1;

  const generatePageButtons = () => {
    const buttons: React.ReactNode[] = [];

    if (page > 1) {
      buttons.push(
        <button key="first" onClick={() => handlePageChange(1)} className="mx-1 px-3 py-2 border rounded-md text-gray-800">
          First
        </button>
      );
      
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(page - 1)} className="mx-1 px-3 py-2 border rounded-md text-gray-800">
          {'<'}
        </button>
      );
    }

    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, page + 1);

    if (startPage > 1) {
      buttons.push(
        <button key={startPage} onClick={() => handlePageChange(startPage)} className="mx-1 px-3 py-2 border rounded-md text-gray-500">
          {startPage}
        </button>
      );
    }

    buttons.push(
      <button key={page} className="mx-1 px-3 py-2 border rounded-md bg-blue-500 text-white">
        {page}
      </button>
    );

    if (endPage < totalPages) {
      buttons.push(
        <button key={endPage} onClick={() => handlePageChange(endPage)} className="mx-1 px-3 py-2 border rounded-md text-gray-500">
          {endPage}
        </button>
      );
    }

    if (page < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(page + 1)} className="mx-1 px-3 py-2 border rounded-md text-gray-800">
          {'>'}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Characters List</h1>

      <div className="mb-4">
        <SearchFilterForm
          onSearchSubmit={handleSearchSubmit}
          onFilterChange={handleFilterChange}
          initialSearchValue={search}
          filters={[{ name: 'status', value: status }, { name: 'species', value: species }, { name: 'gender', value: gender }]}
          filterOptions={{
            status: ['Alive', 'Dead', 'Unknown'],
            species: ['Human', 'Alien', 'Robot', 'Cronenberg'],
            gender: ['Male', 'Female', 'Genderless', 'Unknown'],
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.results?.map((character: Character) => (
          <div key={character.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300" onClick={() => handleCharacterClick(character.id)}>
            <img src={character.image} alt={character.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 text-center">{character.name}</h3>
            <p className="text-center text-gray-400">{character.species}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex items-center">{generatePageButtons()}</div>
      </div>
    </div>
  );
};

export default CharactersList;