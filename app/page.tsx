"use client";

import React, { useEffect } from "react";
import BitcoinChart from "./components/BitcoinChart";
import Watchlist from "./components/Watchlist";
import Navbar from './components/Navbar';



export default function Home() {

  useEffect(() => {
    try {
      const response =  fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker:'PEPE' }),
      });

      const data = response;
      console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, []);
      

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
