"use client";

import React from "react";
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

  let ownedStocks = [
    {
      name: "BTC",
      quantity: 30,
      price: 10000,
      sentiment: {
        positive: 0.5,
        negative: 0.3,
        neutral: 0.2
      }
    },
    {
      name: "ETH",
      quantity: 30,
      price: 300,

      sentiment: {
        positive: 0.5,
        negative: 0.3,
        neutral: 0.2
      }
    },
    {
      name: "SOL",
      quantity: 40,
      price: 300,

      sentiment: {
        positive: 0.5,
        negative: 0.3,
        neutral: 0.2
      }
    },


  ]

  const portfolioData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Portfolio Performance",
        data: [3, 4, 3.5, 5, 6, 5.5, 7],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const compositionData = {
    labels: ["BTC", "ETH", "SOL"],
    datasets: [
      {
        label: "Composition",
        data: [30, 30, 40],
        backgroundColor: ["#22c55e", "#f97316", "#f9c916"],
        hoverOffset: 4,
      },
    ],
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
            <h2 className="mb-4 text-lg">Your Portfolio</h2>

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
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg mt-6 mr-6 w-1/2">
              <h2 className="mb-4 text-lg">Composition</h2>
              <div className="w-[75%] mx-auto">

                <Doughnut
                  className="color-white"
                  data={compositionData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: {
                          color: "white", // Legend text color
                        },
                      },
                      tooltip: {
                        bodyColor: "white", // Tooltip body text color
                        titleColor: "white", // Tooltip title text color
                      },
                    },
                    layout: {
                      padding: 20, // Optional: Adds padding around the chart
                    },
                  }}
                />

              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 shadow-lg mt-6 w-full md:w-1/2">
  <h2 className="mb-4 text-lg text-white font-bold">Details</h2>

  {/* Header */}
  <div className="flex mt-4 gap-8 border-b border-gray-700 pb-2">
    <span className="text-xs w-[50%] text-left font-bold text-white">Name</span>
    <span className="text-xs w-[25%] text-center font-bold text-white">Quantity</span>
    <span className="text-xs w-[25%] text-right font-bold text-white">Price</span>

   
   
    '

  </div>

  {/* Stock Details */}
  {ownedStocks.map((stock, index) => (
    <div
      key={index}
      className="flex mt-2 gap-8 items-center border-b border-gray-700 pb-2 hover:bg-gray-800 transition-all"
    >
      <span className="text-xs w-[50%] text-left text-gray-300">{stock.name}</span>
      <span className="text-xs w-[25%] text-center text-gray-300">{stock.quantity}</span>
      <span className="text-xs w-[25%] text-right text-gray-300">{stock.price}</span>
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
