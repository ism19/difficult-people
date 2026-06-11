import './style/App.css';
import { use, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ConversationList from './components/ConversationList';
import OpenAI from 'openai';
import { useEffect } from 'react';

function App() {
  const [messageIn, setMessageIn] = useState("")
  const defaultConversation = {
    id: Date.now(),
    name: "Untitled",
    messages: []
  }
  const [selected, setSelected] = useState(defaultConversation)
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("conversations")
    return saved ? JSON.parse(saved) : [defaultConversation]
  })
  const [untitledCount, setUntitledCount] = useState(1)
  const [toggleEditMenu, setToggleEditMenu] = useState(null)
  const [rename, setRename] = useState("")
  const [conversationToRename, setConversationToRename] = useState(null)
  const apikey = process.env.REACT_APP_OPENAI_API_KEY

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations))
  }, [conversations])

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

  function deleteConversation() {
    const updatedConversations = conversations.filter(conversation => conversation.id !== toggleEditMenu.id)
    
    if(selected?.id === toggleEditMenu.id) {
      const newConversation = {
        id: Date.now(),
        name: untitledCount === 0 ? "Untitled" : `Untitled ${untitledCount}`,
        messages: []
      }
      setUntitledCount(untitledCount + 1)
      setConversations([...updatedConversations, newConversation])
      setSelected(newConversation)
    } else {
      setConversations(updatedConversations)
    }

    setToggleEditMenu(null)
  }

  function saveConversation() {
    const updatedConversations = conversations.map(conversation => {
      if(conversation.id === toggleEditMenu?.id) {
        return {...conversation, name: rename}
      }
      return conversation
    })

    setConversations(updatedConversations)
    if(toggleEditMenu?.id === selected.id) setSelected({...selected, name: rename})
    setToggleEditMenu(null)
    setConversationToRename(null)
    setRename("")
  }

  return (
    <div className="app-body">
      <div className="side-panel">
        <ConversationList
          conversations={conversations}
          selected={selected}
          setSelected={setSelected}
          newConversation={newConversation}
          deleteConversation={deleteConversation}
          toggleEditMenu={toggleEditMenu}
          setToggleEditMenu={setToggleEditMenu}
          conversationToRename={conversationToRename}
          setConversationToRename={setConversationToRename}
          rename={rename}
          setRename={setRename}
          saveConversation={saveConversation}
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
