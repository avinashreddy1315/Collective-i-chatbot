
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function Welcome() {
  const { customerName, setCustomerName } = useUser();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (customerName) {
      navigate("/dashboard");
    }
  }, [customerName, navigate]);

  const handleStart = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCustomerName(trimmed);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Welcome to the Collective[i] Chatbot
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleStart()}
        />
        <button
          className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleStart}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
