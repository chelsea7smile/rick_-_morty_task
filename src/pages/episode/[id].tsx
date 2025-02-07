import { useState } from 'react';
import { useGetEpisodesQuery } from '@/services/episodesApi';
import SearchFilterForm from '@/сomponents/SearchFilterForm';

interface EpisodesProps {
  episodeUrls: string[];
}

const Episodes = ({ episodeUrls }: EpisodesProps) => {
  const { data, error, isLoading } = useGetEpisodesQuery({
    ids: Array.isArray(episodeUrls) && episodeUrls.length > 0 ? episodeUrls : [],
  });

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'name' | 'episode'>('name');

  if (isLoading) return <p>Loading episodes...</p>;
  if (error) return <p>Error loading episodes: {JSON.stringify(error)}</p>;

  if (!data || !data.results) {
    return <p>No data available</p>;
  }

  const filteredEpisodes = data.results.filter((episode) => {
    if (filterType === 'name') {
      return episode.name.toLowerCase().includes(search.toLowerCase());
    } else if (filterType === 'episode') {
      return episode.episode.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  });

  const handleSearchSubmit = (search: string) => {
    setSearch(search);
  };

  const handleFilterTypeChange = (type: 'name' | 'episode') => {
    setFilterType(type);
  };

  return (
    <div className="mt-8 flex justify-center items-center flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-center">Episodes</h2>

      <SearchFilterForm 
        onSearchSubmit={handleSearchSubmit}
        onFilterChange={() => {}}
        filters={[]} 
        filterOptions={{}}
      />

      {/* filter buttons */}
      <div className="mb-4 mt-5 flex justify-center gap-14">
  <button
    onClick={() => handleFilterTypeChange('name')}
    className={`px-4 py-2 ${filterType === 'name' ? 'bg-blue-500' : 'bg-gray-600'} text-white rounded-md`}
  >
    Filter by Name
  </button>
  <button
    onClick={() => handleFilterTypeChange('episode')}
    className={`px-4 py-2 ${filterType === 'episode' ? 'bg-blue-500' : 'bg-gray-600'} text-white rounded-md`}
  >
    Filter by Episode Code
  </button>
</div>

      {/* episodes List */}
      <ul className="list-disc pl-6 flex flex-col items-center space-y-4">
        {filteredEpisodes.map((episode) => (
          <li key={episode.id} className="w-full max-w-lg p-4 bg-gray-800 text-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold">{episode.name}</h3>
            <p className="text-sm">{episode.episode}</p>
            <p className="text-sm">ID: {episode.id}</p>
            <p className="text-sm">{episode.air_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Episodes;