"use client";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the structure of the chart data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

// Define the structure of the API response
interface PriceEntry {
  time: number;
  priceUsd: string;
}

export default function PortfolioChart() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [], // Initialize with an empty array for labels
    datasets: [], // Initialize with an empty array for datasets
  });
  const [timeRange, setTimeRange] = useState("d1");

  const fetchData = async (range: string) => {
    try {
      const response = await axios.get<{ data: PriceEntry[] }>(
        `https://api.coincap.io/v2/assets/bitcoin/history`,
        {
          params: { interval: range },
        }
      );

      const prices = response.data.data || [];

      setChartData({
        labels: prices.map((entry) =>
          new Date(entry.time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
        datasets: [
          {
            label: "Bitcoin (BTC) Price (USD)",
            data: prices.map((entry) => parseFloat(entry.priceUsd)),
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            borderColor: "rgba(34, 197, 94, 1)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange]);

  return (
    <div className="bg-gray-800 h-60 rounded-lg p-4">
      <h2 className="text-green-500 text-lg font-bold mb-4">Bitcoin Chart</h2>
      {chartData.labels.length > 0 ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
              y: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex justify-between mt-4 text-sm text-gray-400">
        {["m1", "m5", "m15", "h1", "d1"].map((range) => (
          <button
            key={range}
            className={`${
              timeRange === range
                ? "text-green-500 font-bold"
                : "hover:text-green-500"
            }`}
            onClick={() => setTimeRange(range)}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
