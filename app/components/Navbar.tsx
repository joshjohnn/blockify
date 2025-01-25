"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/logo.svg";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // AI Chatbot toggle state
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to Blocky, your AI research tool!" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/db");
        const data_db = await res.json();
        console.log("MONGODB: " + data_db);

        const response = await fetch("http://localhost:3000/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  const currentPath = usePathname();

  const isActive = (path: string) => currentPath === path;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim() === "") return; // Prevent empty search

    // Navigate to the Trade page with the search query
    router.push(`/trade/${searchQuery}`);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input }),
      });

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong!" },
      ]);
    }
  };

  return (
    <>
      <header className="relative w-full flex items-center justify-between px-8 py-4 border-b border-gray-700">
        {/* Blockify Logo */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Blockify Logo" className="mr-1" width={16} height={16} />
          <div className="text-green-500 text-xl font-bold pr-4">Blockify</div>
        </div>

        {/* Search Bar with Ask Blocky */}
        <form onSubmit={handleSearch} className="flex items-center gap-4 w-[50%]">
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow bg-gray-800 text-white text-sm px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-green-500"
          />
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg outline-none border border-gray-700 hover:bg-green-500"
          >
            Ask Blocky
          </button>
        </form>

        {/* Navigation Links */}
        <nav className="flex gap-8 text-sm">
          {[
            { path: "/", label: "Home" },
            { path: "/portfolio", label: "Portfolio" },
            { path: "/explore", label: "Trade" }, // Renamed Explore to Trade
            { path: "/education", label: "Education" },
          ].map(({ path, label }, index) => (
            <div key={index} className="relative">
              <Link
                href={path}
                className={`${
                  isActive(path) ? "text-green-500" : "text-white"
                } hover:text-green-500`}
              >
                {label}
              </Link>
              <span
                className={`absolute bottom-[-23px] left-0 h-[2px] w-full bg-green-500 transform scale-x-0 transition-transform duration-300 ease-in-out ${
                  isActive(path) ? "scale-x-100" : ""
                } hover:scale-x-100`}
              />
            </div>
          ))}
        </nav>
      </header>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white rounded-xl shadow-lg w-3/4 max-w-2xl p-6 relative">
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4">Blocky - AI Research Tool</h2>
            <div className="overflow-y-auto max-h-64 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.role === "assistant" ? "text-green-400" : "text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg outline-none border border-gray-700 focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
