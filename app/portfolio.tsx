"use client";

import { FaBriefcase, FaGraduationCap, FaHome, FaSearch } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
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
      <nav className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 relative">
            <div className="absolute top-0 left-0 w-3 h-3 bg-black transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          </div>
          <span className="text-2xl font-bold text-green-500">Blockify</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="$EXAMPL"
            className="bg-transparent border-none outline-none text-gray-400 placeholder-gray-500"
          />
        </div>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-1 text-gray-400">
            <FaHome /> <span>Home</span>
          </div>
          <div className="flex items-center space-x-1 text-green-500">
            <FaBriefcase /> <span>Portfolio</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <MdExplore /> <span>Explore</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <FaGraduationCap /> <span>Education</span>
          </div>
        </div>
      </nav>

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

        {/* Top Gainers and Losers */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
            <h2 className="mb-4 text-lg">Top Gainers</h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-8 bg-gray-700 rounded-lg opacity-70"
                ></div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
            <h2 className="mb-4 text-lg">Top Losers</h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-8 bg-gray-700 rounded-lg opacity-70"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
