"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Education() {
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string>("");

  const data = {
    labels: ["Bitcoin", "Ethereum", "Cardano", "Solana", "Polkadot", "Ripple", "Stellar", "Nano"],
    datasets: [
      {
        label: "Energy Consumption (kWh per transaction)",
        data: [707, 62, 6, 3, 2, 0.01, 0.007, 0.001], 
        backgroundColor: ["#FF6384", "#36A2EB", "#4CAF50", "#FFCE56", "#9966FF", "#4DB6AC", "#BA68C8", "#FFD700"],
      },
      {
        label: "Carbon Emissions (kg CO2 per transaction)",
        data: [402, 20, 1, 0.5, 0.4, 0.0006, 0.0004, 0.0001], 
        backgroundColor: ["#E57373", "#81D4FA", "#A5D6A7", "#FFD54F", "#D1C4E9", "#B2EBF2", "#CE93D8", "#FFF59D"],
      },
    ],
  };

  const handleQuizSubmit = (selectedAnswer: string) => {
    setQuizAnswer(selectedAnswer);
    if (selectedAnswer === "Bitcoin") {
      setQuizFeedback("Correct! Bitcoin consumes the most energy.");
    } else {
      setQuizFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow p-8 grid grid-cols-1 gap-6">
        {/* Environmental Impact Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-green-500 font-bold text-2xl mb-4">
            Environmental Impact of Cryptocurrencies
          </h2>
          <p className="text-gray-400 mb-4">
            Cryptocurrencies, especially those relying on Proof-of-Work (PoW) consensus mechanisms like Bitcoin, consume vast amounts of energy. This energy consumption contributes to significant carbon emissions and strains global electricity supplies.
          </p>
          <div className="mb-4">
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: { color: "white" },
                  },
                  title: {
                    display: true,
                    text: "Cryptocurrency Energy Consumption vs. Carbon Emissions",
                    color: "white",
                  },
                },
                scales: {
                  x: { ticks: { color: "white" } },
                  y: {
                    ticks: { color: "white" },
                    title: {
                      display: true,
                      text: "Units (kWh / kg CO2)",
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Societal Impact Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-blue-500 font-bold text-2xl mb-4">
            Societal Impact of Cryptocurrencies
          </h2>
          <p className="text-gray-400 mb-4">
            Cryptocurrencies bring financial innovation but also pose societal challenges. They enable financial inclusion and decentralized finance (DeFi) but can contribute to energy inequality and speculative bubbles.
          </p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>Potential for financial inclusion in underbanked regions.</li>
            <li>Speculation leading to financial losses for inexperienced investors.</li>
            <li>Increased electricity demand, worsening energy inequality in developing countries.</li>
          </ul>
        </div>

        {/* Sustainable Cryptos Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-green-500 font-bold text-2xl mb-4">
            Eco-Friendly Cryptocurrencies
          </h2>
          <p className="text-gray-400 mb-4">
            Some cryptocurrencies are designed with sustainability in mind, focusing on reducing energy consumption and environmental impact.
          </p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>
              <span className="text-green-500">Cardano (ADA):</span> Energy-efficient Proof-of-Stake consensus.
            </li>
            <li>
              <span className="text-green-500">Solana (SOL):</span> Operates on a low-energy transaction model.
            </li>
            <li>
              <span className="text-green-500">Polkadot (DOT):</span> Focused on sustainability and blockchain interoperability.
            </li>
            <li>
              <span className="text-green-500">Ripple (XRP):</span> Extremely low energy usage for transactions.
            </li>
            <li>
              <span className="text-green-500">Stellar (XLM):</span> Designed for fast and energy-efficient cross-border payments.
            </li>
            <li>
              <span className="text-green-500">Nano (NANO):</span> Near-zero energy usage due to its block-lattice structure.
            </li>
          </ul>
        </div>

        {/* Quiz Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-yellow-500 font-bold text-2xl mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-gray-400 mb-4">
            Which cryptocurrency consumes the most energy?
          </p>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleQuizSubmit("Bitcoin")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              Bitcoin
            </button>
            <button
              onClick={() => handleQuizSubmit("Ethereum")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              Ethereum
            </button>
            <button
              onClick={() => handleQuizSubmit("Cardano")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              Cardano
            </button>
          </div>
          {quizAnswer && <p className="text-gray-300">{quizFeedback}</p>}
        </div>
      </main>
    </div>
  );
}
