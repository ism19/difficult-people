import { useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import '../style/ChatWindow.css'

export default function ChatWindow({selected, messageIn, setMessageIn, onSend}) {
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [selected.messages])
    
    return (
        <div className="main-window">
            <div className="title-bar">
                <p className="title">{selected.name}</p>
            </div>
            <div className="chat-window">
                <div className="chat-scroll-window">
                    <p className="default-message">Hello! How can I help you?</p>
                    <img className="leaf" src="leaf.png"/>
                    {selected.messages.map((message, index) => (
                        <MessageBubble 
                            role={message.role}
                            content={message.content}
                            key={index}
                        />
                    ))}
                    <div ref={bottomRef}/>
                </div>
                <ChatInput 
                    messageIn={messageIn}
                    setMessageIn={setMessageIn}
                    onSend={onSend}
                />
            </div>
        </div>
    )
}