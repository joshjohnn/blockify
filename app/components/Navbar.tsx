
import Link from 'next/link';
import { useRouter } from 'next/router';

const router = useRouter();
const Navbar = () => {
    let homePage = router.pathname === '/';
    let portfolioPage = router.pathname === '/portfolio';
    let explorePage = router.pathname === '/explore';
    let educationPage = router.pathname === '/education';


    return (
        <header className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-700">
            <div className="text-green-500 text-xl font-bold pr-4">Blockify</div>

            <input
                type="text"
                placeholder="$EXAMPL"
                className="bg-gray-800 text-white text-sm px-4 py-1 rounded-lg outline-none border  border-gray-700 focus:border-green-500"
            />
            <div className="flex flex-grow" />
            <nav className="flex gap-8 text-sm">
                <Link className={`hover:text-green-500` } href="/">
                    Home
                </Link>
                <a href="/portfolio" className="hover:text-green-500">Portfolio</a>
                <a href="#" className="hover:text-green-500">Explore</a>
                <a href="#" className="hover:text-green-500">Education</a>
            </nav>
        </header>
    )

}

export default Navbar;

