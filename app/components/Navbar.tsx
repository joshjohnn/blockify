import Link from 'next/link';

import Image from 'next/image';
import logo from '../../public/icons/logo.svg';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const currentPath = usePathname();

  const isActive = (path) => currentPath === path;

  return (
    <header className="relative w-full flex items-center justify-between px-8 py-4 border-b border-gray-700">
    <Image src={logo} alt="Blockify Logo" className="mr-1" width={16} height={16} />
      <div className="text-green-500 text-xl font-bold pr-4">Blockify</div>

      <input
        type="text"
        placeholder="$EXAMPL"
        className="w-[25%] bg-gray-800 text-white text-sm px-4 py-1 rounded-lg outline-none border border-gray-700 focus:border-green-500"
      />

      <div className="flex flex-grow" />

      <nav className="flex gap-8 text-sm relative">
        <div className="relative">
          <Link
            href="/"
            className={`${
              isActive('/') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Home
          </Link>
          <span
            className={`absolute bottom-[-23px] left-0 h-[2px] w-full bg-green-500 transform scale-x-0 transition-transform duration-300 ease-in-out ${
              isActive('/') ? 'scale-x-100' : ''
            } hover:scale-x-100`}
          />
        </div>
        <div className="relative">
          <Link
            href="/portfolio"
            className={`${
              isActive('/portfolio') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Portfolio
          </Link>
          <span
            className={`absolute bottom-[-23px] left-0 h-[2px] w-full bg-green-500 transform scale-x-0 transition-transform duration-300 ease-in-out ${
              isActive('/portfolio') ? 'scale-x-100' : ''
            } hover:scale-x-100`}
          />
        </div>
        <div className="relative">
          <Link
            href="/explore"
            className={`${
              isActive('/explore') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Explore
          </Link>
          <span
            className={`absolute bottom-[-23px] left-0 h-[2px] w-full bg-green-500 transform scale-x-0 transition-transform duration-300 ease-in-out ${
              isActive('/explore') ? 'scale-x-100' : ''
            } hover:scale-x-100`}
          />
        </div>
        <div className="relative">
          <Link
            href="/education"
            className={`${
              isActive('/education') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Education
          </Link>
          <span
            className={`absolute bottom-[-23px] left-0 h-[2px] w-full bg-green-500 transform scale-x-0 transition-transform duration-300 ease-in-out ${
              isActive('/education') ? 'scale-x-100' : ''
            } hover:scale-x-100`}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
