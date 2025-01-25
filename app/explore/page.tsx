"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Trade() {
  const fullText = "        Blockchain       Made       Simple "; // Use a properly spaced string
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setLetters((prev) => [...prev, fullText[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust speed of the animation here
    return () => clearInterval(interval);
  }, []);

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
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2">
              Buy
            </button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-lg mr-2">
              Sell
            </button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-lg">
              Convert
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Amount</label>
            <input
              type="text"
              className="bg-gray-900 text-white rounded-lg w-full py-2 px-4"
              placeholder="0.00"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Crypto</label>
            <select className="bg-gray-900 text-white rounded-lg w-full py-2 px-4">
              <option>Bitcoin (BTC)</option>
              <option>Ethereum (ETH)</option>
              <option>Solana (SOL)</option>
            </select>
          </div>
          <button className="bg-blue-500 text-white w-full py-2 px-4 rounded-lg">
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
              <tr>
                <td className="py-1">Sent</td>
                <td className="py-1">-52.26 USD</td>
                <td className="py-1">Ethereum (ETH)</td>
                <td className="py-1">Jul 31, 2023</td>
              </tr>
              <tr>
                <td className="py-1">Bought</td>
                <td className="py-1">+50.00 USD</td>
                <td className="py-1">Bitcoin (BTC)</td>
                <td className="py-1">Jul 17, 2023</td>
              </tr>
              <tr>
                <td className="py-1">Converted</td>
                <td className="py-1">+6.28 USD</td>
                <td className="py-1">Ethereum (ETH)</td>
                <td className="py-1">Jul 18, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
