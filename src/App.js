import './App.css';
import { use, useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatWindow from './components/ChatWindow';
import ConversationItem from './components/ConversationItem';
import ConversationList from './components/ConversationList';
import MessageBubble from './components/MessageBubble';

function App() {
  const [messageIn, setMessageIn] = useState("")
  const [selected, setSelected] = useState(null)
  const [conversations, setConversations] = useState([])
  const [untitledCount, setUntitledCount] = useState(0)

  function NewConversation() {
    const newConversation = {
      id: Date.now(),
      name: untitledCount === 0 ? "Untitled" : `Untitled ${untitledCount}`,
      messages: []
    }
    setUntitledCount(untitledCount + 1)
    setConversations(conversations => [...conversations, newConversation])
    setSelected(newConversation)
  }

  function onSend() {
    if(messageIn.trim().length === 0) return

    const updatedConversations = conversations.map(conversation => {
      if(conversation.id === selected.id) {
        return {...conversation, messages: [...conversation.messages, messageIn]}
      }
      return conversation
    })

    setConversations(updatedConversations)
    setSelected({...selected, messages: [...selected.messages, {role: "user", content: messageIn}]})
    setMessageIn("")
  }
}

export default App;
