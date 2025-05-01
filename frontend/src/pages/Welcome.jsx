
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function Welcome() {
  const { customerName, setCustomerName } = useUser();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // If we already have a name in context (and localStorage), skip to dashboard
  useEffect(() => {
    if (customerName) {
      navigate("/dashboard");
    }
  }, [customerName, navigate]);

  const handleStart = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCustomerName(trimmed);    // writes to context & localStorage
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to the Collective[i] Chatbot
      </h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full max-w-xs border rounded px-3 py-2 mb-4 focus:outline-none"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleStart()}
      />
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleStart}
      >
        Get Started
      </button>
    </div>
  );
}
