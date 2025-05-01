
import React from 'react'

import styled from 'styled-components'
import ChatList from './ChatList'
import NewChatDialog from './NewChatDialog'
import { useChatMapContext } from '../context/ChatMapContext'

import { useState } from 'react'

export default function SideChatBar({ collapsed, toggleSidebar }) {

  const { addSession } = useChatMapContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)
  const handleCreate = (name) => addSession(name)

  return (
    <SideBar 
      className={`
         bg-[#fcfcfc] border-r-2 border-[#efefef] 
        ${collapsed ? 'w-0' : 'w-70 p-4'}
      `}
    >
        <SideBarHearder>
          <div className="flex justify-between items-center text-sm mb-4">
            <h1 className="text-xl font-semibold text-[#3d3d3d]">Chatbot App</h1>
            <button
              onClick={toggleSidebar}
              className="w-6 h-6 p-1"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
                className="h-5 w-5 stroke-current  text-gray-500 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M2 2v12m12-6H4.667m0 0 4.666 4.667M4.667 8l4.666-4.667"
                />
              </svg>
            </button>
          </div>

        </SideBarHearder>
      
      <div className='mt-10'>
        <button onClick={openDialog} className='border-1 border-black rounded-md p-1.5 w-[100%] text-[#3d3d3d] font-semibold text-sm text-left hover:border-gray-500'>
          +  New Chat
        </button>
      </div>
      <SideBarChatList>
        <div className='flex flex-row items-center gap-3'>
          <div className='w-4 h-4'>
          <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"
           class="CustomIcon-module__icon___zGR29 CustomIcon-module__icon--tiny___trsDz">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth="1.5" d="m1.5 5.25 6.124 4.287c.496.347.744.52 1.013.587.238.06.488.06.726 0 .27-.067.517-.24 1.013-.587L16.5 5.25M5.1 15h7.8c1.26 0 1.89 0 2.371-.245a2.25 2.25 0 0 0 .984-.984c.245-.48.245-1.11.245-2.371V6.6c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 0 0-.983-.984C14.79 3 14.16 3 12.9 3H5.1c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C1.5 4.709 1.5 5.339 1.5 6.6v4.8c0 1.26 0 1.89.245 2.371.216.424.56.768.984.984C3.209 15 3.839 15 5.1 15">
          </path></svg>
            
          </div>
         
          <h2>Chats</h2>
        </div>
       
        <ChatList/>
      </SideBarChatList>

      <NewChatDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onCreate={handleCreate}
      />


    </SideBar >
  
   
  )
}


const SideBar = styled.div`
  overflow: hidden;

`


const SideBarHearder = styled.div`
`


const SideBarChatList = styled.div`
  margin-top: 10vh;
  
` 

