import React, { useEffect, useState } from "react";

interface Prices {
  bitcoin: string | null;
  ethereum: string | null;
  solana: string | null;
  cardano: string | null;
  dogecoin: string | null;
  avalanche: string | null;
  tron: string | null;
  litecoin: string | null;
}

export default function Watchlist() {
  const [prices, setPrices] = useState<Prices>({
    bitcoin: null,
    ethereum: null,
    solana: null,
    cardano: null,
    dogecoin: null,
    avalanche: null,
    tron: null,
    litecoin: null,
  });

  useEffect(() => {
    // Open a WebSocket connection to CoinCap API
    const socket = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,cardano,dogecoin,avalanche,tron,litecoin"
    );

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setPrices((prevPrices) => ({
        ...prevPrices,
        ...data, // Merge new prices into the state
      }));
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
      <h2 className="text-lg font-bold text-green-500 mb-4">Watchlist</h2>
      <ul className="space-y-2 text-gray-400">
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Bitcoin (BTC)
          <span className="text-green-500">
            {prices.bitcoin
              ? `$${parseFloat(prices.bitcoin).toFixed(2)}`
              : "Loading..."}
          </span>
        </li>
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Ethereum (ETH)
          <span className="text-green-500">
            {prices.ethereum
              ? `$${parseFloat(prices.ethereum).toFixed(2)}`
              : "Loading..."}
          </span>
        </li>
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Solana (SOL)
          <span className="text-green-500">
            {prices.solana
              ? `$${parseFloat(prices.solana).toFixed(2)}`
              : "Loading..."}
          </span>
        </li>
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Cardano (ADA)
          <span className="text-green-500">
            {prices.cardano
              ? `$${parseFloat(prices.cardano).toFixed(2)}`
              : "Loading..."}
          </span>
        </li>
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Dogecoin (DOGE)
          <span className="text-green-500">
            {prices.dogecoin
              ? `$${parseFloat(prices.dogecoin).toFixed(2)}`
              : "Loading..."}
          </span>
        </li>
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Avalanche (AVAX)
          <span className="text-green-500">
            {prices.avalanche
              ? `$${parseFloat(prices.avalanche).toFixed(2)}`
              : "Loading..."}
          </span>
        </li>
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Tron (TRX)
          <span className="text-green-500">
            {prices.tron
              ? `$${parseFloat(prices.tron).toFixed(6)}`
              : "Loading..."}
          </span>
        </li>
        <li className="flex justify-between border-b border-gray-700 pb-2">
          Litecoin (LTC)
          <span className="text-green-500">
            {prices.litecoin
              ? `$${parseFloat(prices.litecoin).toFixed(2)}`
              : "Loading..."}
          </span>
        </li>
      </ul>
    </div>
  );
}
