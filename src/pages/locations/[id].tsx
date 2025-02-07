import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGetLocationsQuery, useGetLocationByIdQuery } from '@/services/locationsApi';
import SearchFilterForm from '@/сomponents/SearchFilterForm';

const LocationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const isIdValid = typeof id === 'string' && id.trim() !== '';

  const { data: locationsData, isLoading: isLocationsLoading, error: locationsError } = useGetLocationsQuery();

  const { data: location, isLoading, error } = useGetLocationByIdQuery(id as string, { 
    skip: !router.isReady || !isIdValid 
  });

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const uniqueTypes = locationsData ? Array.from(new Set(locationsData.results.map(loc => loc.type))) : [];

  const handleSearchSubmit = (search: string) => {
    setSearch(search);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    if (filterName === 'type') {
      setSelectedType(value);
    }
  };

  const handleLocationClick = (locationId: string) => {
    router.push(`/locations/${locationId}`);
  };

  useEffect(() => {
    console.log('Router query id:', id);
  }, [id]);

  if (error || locationsError) {
    return <div>Error loading data.</div>;
  }

  if (isLoading || isLocationsLoading || !location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <SearchFilterForm
          onSearchSubmit={handleSearchSubmit}
          onFilterChange={handleFilterChange}
          filters={[
            { name: 'type', value: selectedType },
          ]}
          filterOptions={{
            type: uniqueTypes,
          }}
        />

        <h1 className="text-4xl mt-4 font-bold mb-6">{location?.name || "No name available"}</h1>

        <div className="bg-gray-700 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">Location Info (Rick and Morty)</h2>
          <p><strong>Name:</strong> {location?.name || "No info available"}</p>
          <p><strong>Type:</strong> {location?.type || "No info available"}</p>
          <p><strong>Dimension:</strong> {location?.dimension || "No info available"}</p>
          <p><strong>Residents:</strong> {location?.residents.length || "No info available"}</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg space-y-4">
          {locationsData?.results
            .filter((loc) => 
              (!selectedType || loc.type === selectedType) &&
              (!search || loc.name.toLowerCase().includes(search.toLowerCase()))
            )
            .map((loc) => (
              <div
                key={loc.id}
                className="p-4 bg-gray-600 rounded-lg cursor-pointer hover:bg-gray-500"
                onClick={() => handleLocationClick(loc.id.toString())}
              >
                <h2 className="text-2xl font-semibold">{loc.name}</h2>
                <p className="text-lg">Type: {loc.type}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LocationPage;