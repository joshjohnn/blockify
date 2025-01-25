"use client";

import React from "react";
import BitcoinChart from "./components/BitcoinChart";
import Watchlist from "./components/Watchlist";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-700">
        <div className="text-green-500 text-xl font-bold">Blockify</div>
        <input
          type="text"
          placeholder="$EXAMPL"
          className="bg-gray-800 text-white text-sm px-4 py-1 rounded-lg outline-none border border-gray-700 focus:border-green-500"
        />
        <nav className="flex gap-8 text-sm">
          <a href="#" className="text-green-500 border-b-2 border-green-500">
            Home
          </a>
          <a href="#" className="hover:text-green-500">Portfolio</a>
          <a href="#" className="hover:text-green-500">Explore</a>
          <a href="#" className="hover:text-green-500">Education</a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex-grow p-8 grid grid-cols-3 gap-6">
        {/* Bitcoin Chart */}
        <div className="col-span-2">
          <BitcoinChart />
        </div>

        {/* Watchlist */}
        <Watchlist />

        {/* Overall Market Chart */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 col-span-3">
          <h2 className="text-lg font-bold text-blue-500 mb-4">
            Overall Market
          </h2>
          <div className="bg-gray-800 h-40 rounded-lg"></div>
        </div>
      </main>
    </div>
  );
}
