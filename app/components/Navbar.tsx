'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter(); // Move useRouter inside the component

  const currentPath = router.pathname; // Get current path
  const isActive = (path) => currentPath === path;

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-700">
      <div className="text-green-500 text-xl font-bold pr-4">Blockify</div>

      <input
        type="text"
        placeholder="$EXAMPL"
        className="bg-gray-800 text-white text-sm px-4 py-1 rounded-lg outline-none border border-gray-700 focus:border-green-500"
      />
      <div className="flex flex-grow" />
      <nav className="flex gap-8 text-sm">
        <Link href="/">
          <a
            className={`${
              isActive('/') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Home
          </a>
        </Link>
        <Link href="/portfolio">
          <a
            className={`${
              isActive('/portfolio') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Portfolio
          </a>
        </Link>
        <Link href="/explore">
          <a
            className={`${
              isActive('/explore') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Explore
          </a>
        </Link>
        <Link href="/education">
          <a
            className={`${
              isActive('/education') ? 'text-green-500' : 'text-white'
            } hover:text-green-500`}
          >
            Education
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
