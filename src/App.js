import './style/App.css';
import { use, useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatWindow from './components/ChatWindow';
import ConversationList from './components/ConversationList';
import MessageBubble from './components/MessageBubble';
import OpenAI from 'openai';

function App() {
  const [messageIn, setMessageIn] = useState("")
  const defaultConversation = {
    id: Date.now(),
    name: "Untitled",
    messages: []
  }
  const [selected, setSelected] = useState(defaultConversation)
  const [conversations, setConversations] = useState([defaultConversation])
  const [untitledCount, setUntitledCount] = useState(1)
  const apikey = process.env.REACT_APP_OPENAI_API_KEY

  function newConversation() {
    const newConversation = {
      id: Date.now(),
      name: untitledCount === 0 ? "Untitled" : `Untitled ${untitledCount}`,
      messages: []
    }
    setUntitledCount(untitledCount + 1)
    setConversations(conversations => [...conversations, newConversation])
    setSelected(newConversation)
  }

  async function onSend() {
    if(messageIn.trim().length === 0) return

    const updatedMessages = [...selected.messages, {role: "user", content: messageIn}]

    setMessageIn("")

    const updatedConversations = conversations.map(conversation => {
      if(conversation.id === selected.id) {
        return {...conversation, messages: updatedMessages}
      }
      return conversation
    })

    setConversations(updatedConversations)
    setSelected({...selected, messages: updatedMessages})
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are helping people deal with difficult people in difficult situations. Give practical and empathetic advice without sugarcoatin and be direct."
          },
          ...updatedMessages
        ]
      })
    })

    const data = await response.json()
    const systemResponse = data.choices[0].message

    const finalMessages = [...updatedMessages, systemResponse]

    const finalConversations = conversations.map(conversation => {
      if(conversation.id === selected.id) {
        return {...conversation, messages: finalMessages}
      }
      return conversation
    })

    setConversations(finalConversations)
    setSelected({...selected, messages: finalMessages})
  }

  return (
    <div className="app-body">
      <div className="side-panel">
        <ConversationList
          conversations={conversations}
          selected={selected}
          setSelected={setSelected}
          newConversation={newConversation}
        />
      </div>
      <div className="main-window">
        <ChatWindow
          selected={selected}
          messageIn={messageIn}
          setMessageIn={setMessageIn}
          onSend={onSend}
        />
      </div>
    </div>
  )
}

export default App;
