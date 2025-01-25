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

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}

interface PriceEntry {
  time: number;
  priceUsd: string;
}

// Cache constants
const CACHE_KEY = "bitcoinChartData";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export default function BitcoinChart() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [timeRange, setTimeRange] = useState("m1");
  const [loading, setLoading] = useState(true);

  const fetchData = async (range: string) => {
    try {
      // Check for cached data
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (Date.now() - parsedData.timestamp < CACHE_DURATION && parsedData.range === range) {
          setChartData(parsedData.chartData);
          setLoading(false);
          return;
        }
      }

      // Fetch new data if cache is expired or missing
      const response = await axios.get<{ data: PriceEntry[] }>(
        `https://api.coincap.io/v2/assets/bitcoin/history`,
        {
          params: { interval: range },
        }
      );

      const prices = response.data.data || [];

      const updatedChartData = {
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
      };

      setChartData(updatedChartData);
      setLoading(false);

      // Cache the data
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ chartData: updatedChartData, timestamp: Date.now(), range })
      );
    } catch (error) {
      console.error("Error fetching Bitcoin chart data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange]);

  return (
    <div className="bg-gray-800 h-96 rounded-lg p-4">
      <h2 className="text-green-500 text-lg font-bold mb-4">Bitcoin Price Today</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
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
                ticks: {
                  font: {
                    size: 8, // Smaller font size for x-axis
                  },
                  color: "rgba(255, 255, 255, 0.8)",
                  padding: 10, // Add padding to avoid overlapping with the edge
                },
              },
              y: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  font: {
                    size: 10,
                  },
                  color: "rgba(255, 255, 255, 0.8)",
                },
              },
            },
            layout: {
              padding: {
                top: 20,
                bottom: 20, // Extra bottom padding
              },
            },
          }}
        />
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
