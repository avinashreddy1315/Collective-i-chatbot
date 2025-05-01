import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'

// Styled overrides
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    padding: '0px 15px',
    width:  '100%',
    maxWidth: 400,
  },
}))

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: `0.5px solid ${theme.palette.divider}`,
  fontSize: '1.125rem',
  fontWeight: 600,
}))

const StyledContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2, 3),
}))

const StyledActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(1, 3, 2),
}))

export default function NewChatDialog({ open, onClose, onCreate }) {
  const [chatName, setChatName] = useState('')

  const handleClose = () => {
    setChatName('')
    onClose()
  }

  const handleCreate = () => {
    if (chatName.trim()) {
      onCreate(chatName.trim())
      handleClose()
    }
  }

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="new-chat-dialog-title"
    >
      <StyledTitle id="new-chat-dialog-title">
        New Chat
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size="small"
          sx={{
            position: 'absolute',
            right: 10,
            top: 15,
            color: theme => theme.palette.grey[700],
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </StyledTitle>

      <StyledContent dividers>
        <TextField
          autoFocus
          margin="none"
          label="Chat Name"
          placeholder="Enter a descriptive name"
          fullWidth
          variant="outlined"
          value={chatName}
          onChange={e => setChatName(e.target.value)}
        />
      </StyledContent>

      <StyledActions>
        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
          Discard
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          disableElevation
          sx={{ textTransform: 'none' }}
        >
          Create
        </Button>
      </StyledActions>
    </StyledDialog>
  )
}
