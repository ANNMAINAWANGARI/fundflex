import React, { createContext, useState } from 'react'
import ceramic from '../utils/ceramic'

interface ChatContextProps {
  messages: string[]
  sendMessage: (message: string) => void
}

export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  sendMessage: () => {},
})

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<string[]>([])

  const sendMessage = async (message: string) => {
    // Code to send the message to Ceramic
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}