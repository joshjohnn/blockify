"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/logo.svg";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const currentPath = usePathname();

  const isActive = (path: string) => currentPath === path;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim() === "") return; // Prevent empty search

    // Send search query to your backend (OpenAI or custom backend)
    try {
      const response = await fetch("/api/process-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error sending search query:", error);
    }

    // Navigate to the Explore page with the search query
    router.push(`/explore/${searchQuery}`);
  };

  return (
    <header className="relative w-full flex items-center justify-between px-8 py-4 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="Blockify Logo" className="mr-1" width={16} height={16} />
        <div className="text-green-500 text-xl font-bold pr-4">Blockify</div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Search Cryptocurrency"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[25%] bg-gray-800 text-white text-sm px-4 py-1 rounded-lg outline-none border border-gray-700 focus:border-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white text-sm px-4 py-1 rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Navigation Links */}
      <nav className="flex gap-8 text-sm">
        {["/", "/portfolio", "/explore", "/education"].map((path, index) => (
          <div key={index} className="relative">
            <Link
              href={path}
              className={`${
                isActive(path) ? "text-green-500" : "text-white"
              } hover:text-green-500`}
            >
              {path === "/"
                ? "Home"
                : path.charAt(1).toUpperCase() + path.slice(2)}
            </Link>
            <span
              className={`absolute bottom-[-23px] left-0 h-[2px] w-full bg-green-500 transform scale-x-0 transition-transform duration-300 ease-in-out ${
                isActive(path) ? "scale-x-100" : ""
              } hover:scale-x-100`}
            />
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
