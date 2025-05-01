import { useState, useCallback, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { initialSessions } from '../data/sessions'

export function useChatMap() {
  // Map<sessionId, title>
  const mapRef = useRef(
    new Map(initialSessions.map((s) => [s.id, s.title]))
  )
  // bump this to force updates
  const [version, setVersion] = useState(0)

  const addSession = useCallback((title) => {
    const id = uuid()
    mapRef.current.set(id, title)
    setVersion((v) => v + 1)
    return id
  }, [])

  const deleteSession = useCallback((id) => {
    mapRef.current.delete(id)
    setVersion((v) => v + 1)
  }, [])

  const getSessions = useCallback(() => {
    // newest first
    return Array.from(mapRef.current.entries())
      .map(([id, title]) => ({ id, title }))
      .reverse()
  }, [version])

  // ─── NEW: message store per session ───────────────────────────────────
  const messagesRef = useRef(new Map())
  // initialize empty arrays for existing sessions
  initialSessions.forEach(s => messagesRef.current.set(s.id, s.messages || []))

  const addMessage = useCallback((sessionId, msg) => {
    const arr = messagesRef.current.get(sessionId) || []
    arr.push(msg)               // msg = { sender: 'user'|'bot', text: string }
    messagesRef.current.set(sessionId, arr)
    setVersion(v => v + 1)
  }, [])

  const getMessages = useCallback((sessionId) => {
    
    return messagesRef.current.get(sessionId) || []
  }, [version])
  // ───────────────────────────────────────────────────────────────────────

  return {
    addSession,
    deleteSession,
    getSessions,
    // newly exposed:
    addMessage,
    getMessages,
  }
}