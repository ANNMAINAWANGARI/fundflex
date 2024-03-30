'use client'
import React, { useContext, useState } from 'react'
import { ChatContext } from '../context/ChatContext'

const Chat: React.FC = () => {
  const { messages, sendMessage } = useContext(ChatContext)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    sendMessage(newMessage)
    setNewMessage('')
  }

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat