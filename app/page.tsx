"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from "react";
import BitcoinChart from "./components/BitcoinChart";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticker: "PEPE" }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow p-8 grid grid-cols-3 gap-6">
        {/* Bitcoin Chart */}
        <div className="col-span-2">
          <BitcoinChart />
        </div>

        {/* Watchlist */}
        <Watchlist />

        {/* Split Overall Market Section */}
        <div className="col-span-3 grid grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 col-span-2">
            <h2 className="text-lg font-bold text-blue-500 mb-4">Market Data</h2>
            <div className="bg-gray-800 h-40 rounded-lg"></div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h2 className="text-lg font-bold text-blue-500 mb-4">Market Trends</h2>
            <div className="bg-gray-800 h-[calc(100%-20px)] rounded-lg"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
