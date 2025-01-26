"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Register required elements for Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend
);

const fetchCryptoPrices = async (): Promise<{ [key: string]: number }> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
    );
    const data = await response.json();
    return {
      btc: data.bitcoin.usd,
      eth: data.ethereum.usd,
      sol: data.solana.usd,
    };
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return { btc: 0, eth: 0, sol: 0 }; // Fallback values
  }
};

export default function Portfolio() {
  const [fakePortfolio, setFakePortfolio] = useState<
    { name: string; quantity: number; price: number }[]
  >([
    { name: "BTC", quantity: 30, price: 0 },
    { name: "ETH", quantity: 30, price: 0 },
    { name: "SOL", quantity: 40, price: 0 },
  ]);

  useEffect(() => {
    const updatePortfolioPrices = async () => {
      const prices = await fetchCryptoPrices();
      setFakePortfolio((prevPortfolio) =>
        prevPortfolio.map((stock) => ({
          ...stock,
          price: prices[stock.name.toLowerCase()] || 0, // Safeguard against missing data
        }))
      );
    };
    updatePortfolioPrices();

    const interval = setInterval(() => {
      updatePortfolioPrices();
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate total value for performance chart
  const totalValue = fakePortfolio.reduce(
    (total, stock) => total + stock.quantity * stock.price,
    0
  );

  // Simulate intermediate values for the portfolio performance
  const simulatePerformance = () => {
    const monthlyGrowthFactor = 1.05; // Example: 5% growth per month
    let simulatedValue = totalValue / Math.pow(monthlyGrowthFactor, 6); // Backtrack to calculate Aug value
    return Array.from({ length: 7 }, (_, i) => {
      const value = simulatedValue;
      simulatedValue *= monthlyGrowthFactor; // Increment for next month
      return value;
    });
  };

  // Portfolio Performance Data
  const portfolioData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Present"],
    datasets: [
      {
        label: "Portfolio Performance",
        data: simulatePerformance(),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.4,
      },
    ],
  };

  // Portfolio Composition Data
  const compositionData = {
    labels: fakePortfolio.map((stock) => stock.name),
    datasets: [
      {
        label: "Composition",
        data: fakePortfolio.map((stock) => stock.quantity * stock.price),
        backgroundColor: ["#22c55e", "#f97316", "#f9c916"],
        hoverOffset: 4,
      },
    ],
  };

  // Update portfolio state
  const handleUpdatePortfolio = (name: string, amount: number) => {
    setFakePortfolio((prevPortfolio) =>
      prevPortfolio.map((stock) =>
        stock.name === name
          ? { ...stock, quantity: stock.quantity + amount }
          : stock
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6 px-6 py-4">
        {/* Portfolio Performance */}
        <div className="col-span-2">
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
            <h2 className="mb-4 text-lg">Jack the Bulldog's Portfolio</h2>
            <div className="w-full">
              <Line
                data={portfolioData}
                options={{ responsive: true, maintainAspectRatio: false }}
                height={150}
              />
            </div>
            <div className="flex justify-around mt-4 text-sm text-gray-400">
              <span>1D</span>
              <span>1W</span>
              <span>1M</span>
              <span>3M</span>
              <span>YTD</span>
              <span>1Y</span>
              <span>ALL</span>
            </div>
          </div>

          <div className="w-full flex flex-row">
            {/* Composition */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg mt-6 mr-6 w-1/2">
              <h2 className="mb-4 text-lg">Composition</h2>
              <div className="w-[75%] mx-auto">
                <Doughnut
                  data={compositionData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: {
                          color: "white",
                        },
                      },
                      tooltip: {
                        bodyColor: "white",
                        titleColor: "white",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg mt-6 w-1/2">
              <h2 className="mb-4 text-lg">Details</h2>
              {fakePortfolio.map((stock, index) => (
                <div key={index}>
                  <div className="flex mt-4 gap-8">
                    <span className="text-sm w-[1/2]">{stock.name}</span>
                    <span className="text-sm w-[1/4]">{stock.quantity}</span>
                    <span className="text-sm w-[1/4]">${stock.price.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-[2px] bg-gray-700 mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Scores Split into Two Equal Boxes */}
        <div className="flex flex-col gap-6">
          {/* First Half */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex-grow">
            <h2 className="mb-4 text-lg">Portfolio Scores (Part 1)</h2>
            <ul className="space-y-4">
              <li className="text-gray-400">Environmental Score</li>
              <li className="text-gray-400">Exchange Potential</li>
            </ul>
          </div>

          {/* Second Half */}
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex-grow">
            <h2 className="mb-4 text-lg">Adjust Portfolio</h2>
            {fakePortfolio.map((stock, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <span className="text-gray-300">{stock.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdatePortfolio(stock.name, 10)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +10
                  </button>
                  <button
                    onClick={() => handleUpdatePortfolio(stock.name, -10)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -10
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
