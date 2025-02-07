import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-8 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-6 w-full justify-between sm:space-x-6 sm:justify-start">
          <Link
            href="/"
            className="text-xl font-bold px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700 w-full sm:w-auto text-center"
          >
            Characters
          </Link>
          <Link
            href="/episode/1"
            className="text-xl px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700 w-full sm:w-auto text-center"
          >
            Episodes
          </Link>
          <Link
            href="/locations/1"
            className="text-xl px-4 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700 w-full sm:w-auto text-center"
          >
            Locations
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;