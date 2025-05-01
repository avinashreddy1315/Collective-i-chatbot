// src/components/ChatWindow.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useChatMapContext } from '../context/ChatMapContext'
import NewChatDialog from './NewChatDialog'
import { useUser } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import MessagesRender from './MessagesRender'
import SendIcon from '@mui/icons-material/Send'

export default function ChatWindow({ sidebarCollapsed, toggleSidebar }) {
  const { addSession, addMessage } = useChatMapContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [messageText, setMessageText] = useState('')
  const { customerName, logout, activeChatId, setActiveChat } = useUser()
  const navigate = useNavigate()

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)
  const handleCreate = (name) => addSession(name)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSend = () => {
    const text = messageText.trim()
    if (!text) return

    let sessionId = activeChatId

    // If no active session, create one from the first word(s) of the message
    if (!sessionId) {
      const words = text.split(/\s+/)
      const title = words.slice(0, 2).join(' ')
      sessionId = addSession(title || 'Chat')
      setActiveChat(sessionId)
    }

    // add the user's message
    addMessage(sessionId, { sender: 'user', text })
    setMessageText('')

    // optionally: trigger bot reply
    // addMessage(sessionId, { sender: 'bot', text: 'Bot reply here…' })
  }

  return (
    <>
      <div className="flex-1 flex flex-col ">
        <header className="p-4 bg-white flex items-center justify-between">
          <div>
            {sidebarCollapsed && (
              <ChatWindowHeaderButtons>
                <button onClick={openDialog}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 stroke-current text-gray-500"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 3.75v10.5M3.75 9h10.5"
                    />
                  </svg>
                </button>
                <button onClick={toggleSidebar} aria-label="Open sidebar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 stroke-current text-gray-500"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M14 14V2M2 8h9.333m0 0L6.667 3.333M11.333 8l-4.666 4.667"
                    />
                  </svg>
                </button>
              </ChatWindowHeaderButtons>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">
              {customerName || 'Guest'}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </header>

        <MessageBody>
          <ChatMessages>
            <MessagesRender />
          </ChatMessages>

          <div className="flex items-center bg-gray-100 rounded-2xl p-4 w-full max-w-[700px]">
            <input
              type="text"
              placeholder="Type a message…"
              className="flex-1 h-12 bg-transparent placeholder-gray-500 text-sm focus:outline-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            >
              <SendIcon fontSize="small" />
            </button>
          </div>
        </MessageBody>
      </div>

      <NewChatDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onCreate={handleCreate}
      />
    </>
  )
}

const ChatWindowHeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  button {
    border: 1px solid #efefef;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
  }
`

const MessageBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;       /* center horizontally */
  padding-bottom: 2rem;
  justify-content: space-between
`

const ChatMessages = styled.div`
  width: 700px;
  max-width: 100%;
  height: calc(100vh - 200px);             /* fixed height */
  overflow-y: auto;         /* scrollable */
  margin-bottom: 1rem;
  

  &::-webkit-scrollbar {
    display: none;
  }
`
