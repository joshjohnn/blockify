"use client";

import React, { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price_change_percentage_24h: number;
}

const CACHE_KEY = "topMoversData";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const TopMovers = () => {
  const [gainers, setGainers] = useState<Coin[]>([]);
  const [losers, setLosers] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMovers = async () => {
      try {
        // Check for cached data
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
            setGainers(parsedData.gainers.slice(0, 5)); // Slice top 5 gainers
            setLosers(parsedData.losers.slice(0, 5)); // Slice top 5 losers
            setLoading(false);
            return;
          }
        }

        // Fetch new data if cache is expired or missing
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await response.json();

        // Calculate top gainers
        const topGainers = data
          .filter((coin: Coin) => coin.price_change_percentage_24h > 0)
          .sort((a: Coin, b: Coin) => b.price_change_percentage_24h - a.price_change_percentage_24h)
          .slice(0, 5); // Limit to top 5 gainers

        // Calculate top losers
        const topLosers = data
          .filter((coin: Coin) => coin.price_change_percentage_24h < 0)
          .sort((a: Coin, b: Coin) => a.price_change_percentage_24h - b.price_change_percentage_24h)
          .slice(0, 5); // Limit to top 5 losers

        // Save the data to state and cache it
        setGainers(topGainers);
        setLosers(topLosers);
        setLoading(false);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ gainers: topGainers, losers: topLosers, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Error fetching top movers:", error);
        setLoading(false);
      }
    };

    fetchTopMovers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-500 mb-4">Top Movers</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {/* Top Gainers */}
          <div>
            <h3 className="text-green-500 font-semibold mb-4 text-lg">Top Gainers</h3>
            <ul className="space-y-6">
              {gainers.map((coin) => (
                <li key={coin.id} className="flex justify-between text-gray-300 text-lg">
                  <span>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                  <span className="text-green-500 font-semibold">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Losers */}
          <div>
            <h3 className="text-red-500 font-semibold mb-4 text-lg">Top Losers</h3>
            <ul className="space-y-6">
              {losers.map((coin) => (
                <li key={coin.id} className="flex justify-between text-gray-300 text-lg">
                  <span>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                  <span className="text-red-500 font-semibold">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMovers;
