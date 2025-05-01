import React, { useRef, useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useChatMapContext } from '../context/ChatMapContext'
import botImage from '../assets/bot.jpeg' 

export default function MessagesRender() {
  const { activeChatId } = useUser()
  const { getMessages } = useChatMapContext()
  const bottomRef = useRef(null)
  
  // Always call hooks by providing a default empty array if there's no active chat.
  const messages = activeChatId ? getMessages(activeChatId) : []

  useEffect(() => {
    if (activeChatId) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100) // Adjust delay as needed
    }
  }, [messages, activeChatId])

  if (!activeChatId) {
    return <p className="text-gray-500 italic">Select a chat to begin are create a new chat.</p>
  }

  return (
    <div className="space-y-5 p-2.5">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex items-end ${
            m.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {m.sender === 'bot' && (
            <img 
              src={botImage} 
              alt="bot" 
              className="mr-2 w-8 h-8 rounded-full object-cover" 
            />
          )}

          <div
            className={`max-w-[60%] px-4 py-2 rounded-lg ${
              m.sender === 'user'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}
          >
            {m.text}
          </div>

          {m.sender === 'user' && (
            <div className="ml-2 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              👤
            </div>
          )}
        </div>
        
      ))}

      {/* Attach bottomRef to an element at the bottom */}
      <div ref={bottomRef} />
    </div>
  )
}