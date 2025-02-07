import { GetServerSideProps } from 'next';
import { Character } from '../../types/character';
import Link from 'next/link';

type CharacterPageProps = {
  character: Character;
};

const CharacterPage = ({ character }: CharacterPageProps) => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-6">{character.name}</h1>

      <img
        src={character.image}
        alt={character.name}
        className="w-64 h-64 object-cover rounded-lg shadow-lg"
      />

      <div className="bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg w-full max-w-2xl">
        <p className="text-lg">
          <span className="font-semibold">Status:</span> {character.status}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Species:</span> {character.species}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Gender:</span> {character.gender}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Origin:</span>{' '}
          {character.origin.url ? (
            <Link href={`/locations/${character.origin.url.split('/').pop()}`} className="text-blue-400 hover:underline">
              {character.origin.name}
            </Link>
          ) : (
            character.origin.name
          )}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Last known location:</span>{' '}
          {character.location.url ? (
            <Link href={`/locations/${character.location.url.split('/').pop()}`} className="text-blue-400 hover:underline">
              {character.location.name}
            </Link>
          ) : (
            character.location.name
          )}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Total Episodes:</span> {character.episode.length}
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-8">Episodes</h2>
      <ul className="mt-4 bg-gray-800 text-white p-4 rounded-lg w-full max-w-2xl">
        {character.episode.map((episodeUrl, index) => {
          const episodeId = episodeUrl.split('/').pop();
          return (
            <li key={index} className="my-2">
              <Link href={`/episode/${episodeId}`} className="text-white hover:underline">
                Episode {episodeId}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    
    if (!res.ok) {
      return { notFound: true };
    }

    const character = await res.json();

    return {
      props: { character },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default CharacterPage;