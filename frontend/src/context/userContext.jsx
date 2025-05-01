// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "customerSettings";
const DEFAULT_STATE = {
  customerName: "",
  activeChatId: null,
};

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_STATE;
  });

  // whenever data changes, persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const setCustomerName = (name) => {
    setData((prev) => ({ ...prev, customerName: name }));
  };

  const setActiveChat = (chatId) => {
    setData((prev) => ({ ...prev, activeChatId: chatId }));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(DEFAULT_STATE);
  };

  return (
    <UserContext.Provider
      value={{
        customerName: data.customerName,
        setCustomerName,
        activeChatId: data.activeChatId,
        setActiveChat,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

