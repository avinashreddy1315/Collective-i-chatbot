// src/components/ChatList.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useChatMapContext } from '../context/ChatMapContext'
import { useUser } from '../context/userContext'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { styled as muiStyled } from '@mui/material/styles'

export default function ChatList() {
  const { getSessions, deleteSession } = useChatMapContext()
  const sessions = getSessions()

  // from UserContext
  const { activeChatId, setActiveChat } = useUser()

  // delete-dialog state (unchanged)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState({ id: null, title: '' })

  const openDeleteDialog = (id, title) => {
    setSelectedChat({ id, title })
    setDeleteDialogOpen(true)
  }
  const handleDeleteConfirm = () => {
    deleteSession(selectedChat.id)
    setDeleteDialogOpen(false)
    setSelectedChat({ id: null, title: '' })
    // if you deleted the active chat, reset
    if (selectedChat.id === activeChatId) {
      setActiveChat(null)
    }
  }
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSelectedChat({ id: null, title: '' })
  }

  return (
    <>
      <Chatlist>
        {sessions.length === 0 ? (
          <div className="text-gray-500 italic">No chats</div>
        ) : (
          <ul>
            {sessions.map(({ id, title }) => (
              <li
                key={id}
                className={`flex items-center justify-between gap-2.5 p-2 mb-2 ${
                  id === activeChatId ? 'bg-blue-50' : ''
                }`}
              >
                {/* clicking the title sets it active */}
                <span
                  className="truncate cursor-pointer"
                  onClick={() => setActiveChat(id)}
                >
                  {title}
                </span>

                {/* delete icon */}
                <button onClick={() => openDeleteDialog(id, title)} aria-label="Delete chat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                    className="h-5 w-5 text-red-500 hover:text-red-700 stroke-current"
                  >
                    <path
                      d="M12 4.5v-.6c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656c-.32-.163-.74-.163-1.581-.163H8.4c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656C6 2.639 6 3.059 6 3.9v.6m1.5 4.125v3.75m3-3.75v3.75M2.25 4.5h13.5m-1.5 0v8.4c0 1.26 0 1.89-.245 2.371a2.25 2.25 0 0 1-.984.984c-.48.245-1.11.245-2.371.245h-3.3c-1.26 0-1.89 0-2.371-.245a2.25 2.25 0 0 1-.984-.983C3.75 14.79 3.75 14.16 3.75 12.9V4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Chatlist>

      {/* Delete confirmation dialog */}
      <StyledDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-chat-dialog-title"
      >
        <StyledTitle id="delete-chat-dialog-title">
          <WarningAmberIcon color="error" />
          Delete Chat
          <IconButton
            aria-label="close"
            onClick={handleDeleteCancel}
            size="small"
            sx={{ position: 'absolute', right: 8, top: 8, color: theme => theme.palette.grey[500] }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </StyledTitle>

        <StyledContent dividers>
          Are you sure you want to delete <strong>“{selectedChat.title}”</strong>?
        </StyledContent>

        <StyledActions>
          <Button onClick={handleDeleteCancel} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disableElevation
            sx={{ textTransform: 'none' }}
          >
            Delete Chat
          </Button>
        </StyledActions>
      </StyledDialog>
    </>
  )
}

const Chatlist = styled.div`
  margin-top: 10px;
  padding: 15px 0 15px 20px;
  height: 50vh;
  overflow: auto;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 8px 12px;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: #f0f0f0;
    }
  }

  .bg-blue-50 {
    background: #ebf5ff;
  }
`

const StyledDialog = muiStyled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    minWidth: 300,
  },
}))

const StyledTitle = muiStyled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2, 3),
  fontSize: '1.125rem',
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const StyledContent = muiStyled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  fontSize: '0.95rem',
}))

const StyledActions = muiStyled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(1.5, 3, 2),
}))
