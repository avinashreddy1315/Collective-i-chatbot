// src/components/ChatWindow.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useChatMapContext } from '../context/ChatMapContext'
import NewChatDialog from './NewChatDialog'
import { useUser } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import MessagesRender from './MessagesRender'
import SendIcon from '@mui/icons-material/Send'
import UploadFileIcon from '@mui/icons-material/UploadFile'

export default function ChatWindow({ sidebarCollapsed, toggleSidebar }) {
  const { addSession, addMessage } = useChatMapContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [messageText, setMessageText] = useState('')
  const { customerName, logout, activeChatId, setActiveChat } = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)
  const handleCreate = (name) => addSession(name)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSend = async () => {
    const text = messageText.trim()
    if (!text) return

    // create or select session
    let sessionId = activeChatId
    if (!sessionId) {
      const title = text.split(/\s+/).slice(0, 2).join(' ')
      sessionId = addSession(title || 'Chat')
      setActiveChat(sessionId)
    }

    // add user message locally
    addMessage(sessionId, { sender: 'user', text })
    setMessageText('')
    setLoading(true)


    // call your FastAPI backend
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const { response } = await res.json()
      console.log(response);
      setLoading(false)

      // add the bot’s reply
      addMessage(sessionId, { sender: 'bot', text: response })
    } catch (err) {
      console.error('Chat API error', err)
      setLoading(false)
      addMessage(sessionId, {
        sender: 'bot',
        text: '🚨 Error contacting chat service.'
      })
    }
  }


  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log("file :-", file);
  
    let sessionId = activeChatId
    if (!sessionId) {
      sessionId = addSession('File Upload')
      setActiveChat(sessionId)
    }
  
    // 1️⃣ Show system message & start skeleton
    addMessage(sessionId, { sender: 'system', text: `Please wait, uploading ${file.name}…` })
    setLoading(true)
  
    const formData = new FormData()
    formData.append('file', file)
  
    try {
      const res = await fetch('http://localhost:8001/api/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      console.log("data -", data);
  
      if (data.status === 'ingested') {
        // 2️⃣ Stop skeleton
        setLoading(false)
  
        // 3️⃣ Bot notification
        addMessage(sessionId, {
          sender: 'bot',
          text: `Your file "${data.file}" has been uploaded and ingested (${data.chunks.length} chunks).`
        })
      } else {
        throw new Error('Upload failed')
      }
    } catch (err) {
      console.error(err)
      // ensure skeleton is hidden
      setLoading(false)
      addMessage(sessionId, {
        sender: 'system',
        text: `❌ Failed to upload ${file.name}.`
      })
    }
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
            <MessagesRender loading={loading} />
          </ChatMessages>

          <div className="flex items-center bg-gray-100 rounded-2xl p-4 w-full max-w-[700px] space-x-2 px-2 sm:px-4">
            {/* 1️⃣ Upload button */}
            <label
              htmlFor="file-upload"
              className="cursor-pointer p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
              title="Upload .pdf or .txt"
            >
              <UploadFileIcon fontSize="small" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* 2️⃣ Text input */}
            <input
              type="text"
              placeholder="Type a message…"
              className="flex-1 h-12 bg-transparent placeholder-gray-500 text-sm focus:outline-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />

            {/* 3️⃣ Send button */}
            <button
              onClick={handleSend}
              className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
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
  align-items: center;
  padding-bottom: 2rem;
  justify-content: space-between;

  @media (max-width: 1000px) {
    padding: 1rem;
  }
`

const ChatMessages = styled.div`
  width: 700px;
  max-width: 100%;
  height: calc(100vh - 200px);
  overflow-y: auto;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  

  @media (max-width: 1000px) {
    width: 100%;
    height: calc(100vh - 240px);  /* slightly more spacing for smaller screens */
  }

  
`
