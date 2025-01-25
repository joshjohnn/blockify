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
    labels: ["BTC", "HAWKTUA"],
    datasets: [
      {
        label: "Composition",
        data: [70, 30],
        backgroundColor: ["#22c55e", "#f97316"],
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
            <h2 className="mb-4 text-lg">Portfolio Name</h2>
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
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg mt-6">
            <h2 className="mb-4 text-lg">Composition</h2>
            <div className="w-1/2 mx-auto">
              <Doughnut data={compositionData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        {/* Portfolio Scores */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <h2 className="mb-4 text-lg">Portfolio Scores</h2>
          <ul className="space-y-4">
            <li className="text-gray-400">Environmental Score</li>
            <li className="text-gray-400">Exchange Potential</li>
            <li className="text-gray-400">Crypto Safety / Diversity Rating</li>
            <li className="text-gray-400">Social Media Sentiment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
