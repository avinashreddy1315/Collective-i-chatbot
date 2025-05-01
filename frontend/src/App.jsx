// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import { useUser } from './context/userContext'

function App() {
  const { customerName } = useUser()

  return (
    <Routes>
      {/* If no name in context/storage, show Welcome; otherwise redirect to Dashboard */}
      <Route path="/" element={customerName ? <Navigate to="/dashboard" replace />: <Welcome />}/>

      {/* Protect Dashboard: only render if name exists */}
      <Route path="/dashboard" element={ customerName ? <Dashboard /> : <Navigate to="/" replace />}/>

      {/* Fallback any other route back to root */}
      <Route path="*" element={<Navigate to={customerName ? "/dashboard" : "/"} replace />} />
    </Routes>
  )
}

export default App
