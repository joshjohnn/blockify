"use client";

import React, { useState } from "react";
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

export default function Portfolio() {
  const [fakePortfolio, setFakePortfolio] = useState<
    { name: string; quantity: number; price: number }[]
  >([
    { name: "BTC", quantity: 30, price: 10000 },
    { name: "ETH", quantity: 30, price: 300 },
    { name: "SOL", quantity: 40, price: 300 },
  ]);

  // Calculate total value for performance chart
  const totalValue = fakePortfolio.reduce(
    (total, stock) => total + stock.quantity * stock.price,
    0
  );

  // Portfolio Performance Data
  const portfolioData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Present"],
    datasets: [
      {
        label: "Portfolio Performance",
        data: [20000, 25000, 30000, 35000, 40000, 45000, totalValue], // Updated dynamically
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
                    <span className="text-sm w-[1/4]">${stock.price}</span>
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
            <h2 className="mb-4 text-lg">Potential Uses of Your Crypto</h2>
            <ul className="space-y-4">
              <li className="text-gray-400">Bitcoin: Digital Gold, Subway, Pizza Hut, Travel (Expedia), Cars (Ferrari, BMW, Tesla, etc)</li>
              <li className="text-gray-400">Social Media Sentiment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
