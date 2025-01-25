"use client";

import React, { useEffect } from "react";
import BitcoinChart from "./components/BitcoinChart";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import TopMovers from "./components/TopMovers"; // Import TopMovers component
import MarketTrends from "./components/MarketTrends"; // Import MarketTrends component

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await fetch("http://localhost:3000/api/db");
        const data_db = await res.json();
        console.log("MONGODB: "+ data_db);
  


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
          {/* Top Movers */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 col-span-2">
            {/* Only include TopMovers component */}
            <TopMovers />
          </div>

          {/* Market Trends */}
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <MarketTrends />
          </div>
        </div>
      </main>
    </div>
  );
}
