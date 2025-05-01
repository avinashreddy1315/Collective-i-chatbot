import React, { createContext, useContext } from 'react'
import { useChatMap } from '../hooks/useChatMap'

const ChatMapContext = createContext(null)

export function ChatMapProvider({ children }) {
  const chatMap = useChatMap()
  return (
    <ChatMapContext.Provider value={chatMap}>
      {children}
    </ChatMapContext.Provider>
  )
}

// Custom hook for consumers
export function useChatMapContext() {
  const ctx = useContext(ChatMapContext)
  if (!ctx) throw new Error('useChatMapContext must be inside ChatMapProvider')
  return ctx
}
