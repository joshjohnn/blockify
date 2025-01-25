"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Trade() {
  const fullText = "        Blockchain       Made       Simple ";
  const [letters, setLetters] = useState<string[]>([]);
  const [activeAction, setActiveAction] = useState<"buy" | "sell" | "convert">(
    "buy"
  ); // Tracks the selected action
  const [amount, setAmount] = useState<string>(""); // Tracks the amount entered
  const [crypto, setCrypto] = useState<string>("Bitcoin (BTC)"); // Tracks the selected crypto
  const [recentActivity, setRecentActivity] = useState<
    { type: string; amount: string; asset: string; date: string }[]
  >([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setLetters((prev) => [...prev, fullText[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleAction = () => {
    if (!amount) return; // Prevent adding if no amount is entered
    const actionType = activeAction.charAt(0).toUpperCase() + activeAction.slice(1);
    const newActivity = {
      type: actionType,
      amount: `${activeAction === "sell" ? "-" : "+"}${amount} USD`,
      asset: crypto,
      date: new Date().toLocaleDateString(),
    };

    setRecentActivity((prev) => [newActivity, ...prev]); // Add new activity to the top of the list
    setAmount(""); // Clear the amount input
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section with Animated Text */}
        <div className="col-span-1 flex flex-col justify-center">
          <div className="leading-tight max-w-[90%]">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className={`${
                  letter === " " ? "inline-block w-1" : "inline-block"
                } font-extrabold text-6xl`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Buy/Sell Section */}
        <div className="col-span-1 bg-gray-800 rounded-lg p-6">
          <h2 className="text-white font-bold text-xl mb-4">Buy / Sell</h2>
          <div className="flex mb-4">
            <button
              onClick={() => setActiveAction("buy")}
              className={`py-2 px-4 rounded-lg mr-2 ${
                activeAction === "buy"
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white hover:bg-green-500"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveAction("sell")}
              className={`py-2 px-4 rounded-lg mr-2 ${
                activeAction === "sell"
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white hover:bg-green-500"
              }`}
            >
              Sell
            </button>
            <button
              onClick={() => setActiveAction("convert")}
              className={`py-2 px-4 rounded-lg ${
                activeAction === "convert"
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-white hover:bg-green-500"
              }`}
            >
              Convert
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Amount</label>
            <input
              type="text"
              className="bg-gray-900 text-white rounded-lg w-full py-2 px-4"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Crypto</label>
            <select
              className="bg-gray-900 text-white rounded-lg w-full py-2 px-4"
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
            >
              <option>Bitcoin (BTC)</option>
              <option>Ethereum (ETH)</option>
              <option>Solana (SOL)</option>
            </select>
          </div>
          <button
            onClick={handleAction}
            className="bg-blue-500 text-white w-full py-2 px-4 rounded-lg"
          >
            Review Order
          </button>
        </div>

        {/* Recent Activity Section */}
        <div className="col-span-1 bg-gray-800 rounded-lg p-6">
          <h2 className="text-white font-bold text-xl mb-4">Recent Activity</h2>
          <table className="w-full text-gray-400 text-sm">
            <thead>
              <tr>
                <th className="text-left pb-2">Type</th>
                <th className="text-left pb-2">Amount</th>
                <th className="text-left pb-2">Asset</th>
                <th className="text-left pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr key={index}>
                  <td className="py-1">{activity.type}</td>
                  <td className="py-1">{activity.amount}</td>
                  <td className="py-1">{activity.asset}</td>
                  <td className="py-1">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
