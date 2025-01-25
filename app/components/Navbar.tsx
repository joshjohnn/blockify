import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const currentPath = usePathname();

  const isActive = (path) =>  { 
    console.log("hello, currentPath is: ", currentPath);
    return currentPath === path};

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
        <Link href="/" className={`${isActive('/') ? 'text-green-500' : 'text-white'} hover:text-green-500`}>
          Home
        </Link>
        <Link href="/portfolio" className={`${isActive('/portfolio') ? 'text-green-500' : 'text-white'} hover:text-green-500`}>
          Portfolio
        </Link>
        <Link href="/explore" className={`${isActive('/explore') ? 'text-green-500' : 'text-white'} hover:text-green-500`}>
          Explore
        </Link>
        <Link href="/education" className={`${isActive('/education') ? 'text-green-500' : 'text-white'} hover:text-green-500`}>
          Education
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
