import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-xl font-bold px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
          >
            Characters
          </Link>
          <Link
            href="/episode/1"
            className="text-xl px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
          >
            Episodes
          </Link>
          <Link
            href="/locations/1"
            className="text-xl px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
          >
            Locations
          </Link>
        </div>
        <div className="flex space-x-6 items-center">
        </div>
      </div>
    </header>
  );
};

export default Header;