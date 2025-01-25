"use client";

import React, { useEffect, useState } from "react";

interface NewsArticle {
  title: string;
  url: string;
  publishedAt: string;
  source: { name: string };
}

const CACHE_KEY = "marketTrendsData";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const MarketTrends = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        // Check for cached data
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
            setNews(parsedData.articles);
            setLoading(false);
            return;
          }
        }

        // Fetch new data if cache is expired or missing
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=crypto&token=4c1db3b8b9f81f73a50d0ff4a251189c`
        );
        const data = await response.json();

        // Save the data to state and cache it
        const articles = data.articles.slice(0, 3); // Limit to 3 articles
        setNews(articles);
        setLoading(false);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ articles, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Error fetching market trends:", error);
        setLoading(false);
      }
    };

    fetchCryptoNews();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold text-blue-500 mb-4">Market Trends</h2>
      {loading ? (
        <p className="text-gray-400 text-base">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {news.map((article, index) => (
            <li key={index} className="text-gray-300 text-base">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline font-semibold"
              >
                {article.title}
              </a>
              <p className="text-sm text-gray-400 mt-1">
                Published: {new Date(article.publishedAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Source: {article.source.name || "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarketTrends;
