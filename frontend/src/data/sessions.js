// src/data/sessions.js

export const initialSessions = [
  {
    id: '256',
    title: 'Tour',
    messages: [
      { sender: 'bot',  text: '👋 Welcome to the Tour! I’ll guide you through our features.' },
      { sender: 'user', text: 'Great, thanks! What’s first?' },
      { sender: 'bot',  text: 'Let’s start with creating a new chat. Click “+ New Chat” on the left.' },
      { sender: 'user', text: 'Done—what now?' },
      { sender: 'bot',  text: 'Perfect. Now type a message at the bottom. Try “Hello!”' },
      { sender: 'user', text: 'Hello!' },
      { sender: 'bot',  text: 'Nice! The AI responds in real time. You can also delete this session via the ⋮ menu.' },
      { sender: 'bot',  text: 'We automatically save your history so you can pick up where you left off.' },
      { sender: 'user', text: 'That’s super helpful.' },
      { sender: 'bot',  text: 'Finally, explore “My Tools” to see image generation, search, and more.' },
      { sender: 'user', text: 'I see them—thanks for the tour!' },
      { sender: 'bot',  text: 'You’re all set. Enjoy building with our Chatbot App!' },
    ]
  },
  {
    id: '512',
    title: 'Project X',
    messages: [
      { sender: 'bot',  text: 'Initializing Project X session...' },
      { sender: 'bot',  text: 'Status: 🔵 All systems online.' },
      { sender: 'user', text: 'Can you give me yesterday’s usage stats?' },
      { sender: 'bot',  text: 'Sure—here are the numbers:\n\n• Active users: 1,248\n• Messages sent: 7,320\n• Errors logged: 12' },
      { sender: 'user', text: 'What caused those errors?' },
      { sender: 'bot',  text: 'Most came from a malformed API payload at 3:14 PM. We’ve auto-recovered.' },
      { sender: 'user', text: 'Can you retry the failed jobs?' },
      { sender: 'bot',  text: 'Retrying now… ✅ All 12 jobs succeeded on retry.' },
      { sender: 'user', text: 'Awesome. What’s next on the roadmap?' },
      { sender: 'bot',  text: 'Next up: decentralizing our indexing service and rolling out advanced analytics.' },
      { sender: 'user', text: 'Sounds exciting—let me know when it’s ready.' },
      { sender: 'bot',  text: 'Will do! Session will auto-save all updates.' },
    ]
  },
  // …you can add more sessions here, each with its own `messages` array…
]

