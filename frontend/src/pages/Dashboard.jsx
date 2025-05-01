
import React, { useState } from 'react'
import SideChatBar from '../components/SideChatBar'
import ChatWindow from '../components/ChatWindow'

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => setSidebarCollapsed((c) => !c)

  return (
    <div className="flex h-screen">
      <SideChatBar
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <ChatWindow
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
    </div>
  )
} 

 
