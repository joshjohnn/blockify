"use client";

import React from "react";
import Navbar from "../components/Navbar";

export default function Education() {
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
            Cryptocurrencies, especially those relying on Proof-of-Work
            (PoW) consensus mechanisms like Bitcoin, consume vast amounts of
            energy. This energy consumption contributes to significant carbon
            emissions and strains global electricity supplies. Additionally,
            e-waste from mining hardware adds to the environmental impact.
          </p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>
              <span className="text-red-500">Bitcoin:</span> High energy
              consumption and a large carbon footprint.
            </li>
            <li>
              <span className="text-yellow-500">Ethereum:</span> Reduced impact
              after transitioning to Proof-of-Stake (PoS).
            </li>
            <li>
              <span className="text-green-500">Cardano:</span> Designed to be
              eco-friendly with a low-energy PoS model.
            </li>
          </ul>
        </div>

        {/* Societal Impact Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-blue-500 font-bold text-2xl mb-4">
            Societal Impact of Cryptocurrencies
          </h2>
          <p className="text-gray-400 mb-4">
            Cryptocurrencies bring financial innovation but also pose societal
            challenges. On the one hand, they enable financial inclusion and
            decentralized finance (DeFi). On the other hand, they can contribute
            to issues such as energy inequality and speculative bubbles.
          </p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>
              Potential for financial inclusion in underbanked regions.
            </li>
            <li>
              Speculation leading to financial losses for inexperienced
              investors.
            </li>
            <li>
              Increased electricity demand, which can worsen energy inequality
              in developing countries.
            </li>
          </ul>
        </div>

        {/* Sustainable Cryptos Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-green-500 font-bold text-2xl mb-4">
            Eco-Friendly Cryptocurrencies
          </h2>
          <p className="text-gray-400 mb-4">
            Some cryptocurrencies are designed with sustainability in mind,
            focusing on reducing energy consumption and environmental impact.
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
          </ul>
        </div>
      </main>
    </div>
  );
}
