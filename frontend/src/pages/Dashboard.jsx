/*import React, { useState } from 'react'
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
}  */



  import React, { useState, useEffect } from 'react'
import SideChatBar from '../components/SideChatBar'
import ChatWindow from '../components/ChatWindow'

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => setSidebarCollapsed((c) => !c)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

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


 
