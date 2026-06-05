import './App.css';
import { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatWindow from './components/ChatWindow';
import ConversationItem from './components/ConversationItem';
import ConversationList from './components/ConversationList';
import MessageBubble from './components/MessageBubble';

function App() {
  const [messageIn, setMessageIn] = useState("")
  const [role, setRole] = (true) // 1 for user, 0 for AI
}

export default App;
