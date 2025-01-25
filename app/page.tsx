"use client";

import Link from 'next/link';


import React from "react";
import BitcoinChart from "./components/BitcoinChart";
import Watchlist from "./components/Watchlist";
import Navbar from './components/Navbar';



export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      {/* Navbar */}


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
