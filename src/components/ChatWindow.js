import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import '../style/ChatWindow.css'

export default function ChatWindow({selected, messageIn, setMessageIn, onSend}) {
    const messagesReverse = [...selected.messages].reverse()
    
    return (
        <div className="chat-window">
            <div className="chat-scroll-window">
                {messagesReverse.map((message, index) => (
                    <MessageBubble 
                        role={message.role}
                        content={message.content}
                        key={index}
                    />
                ))}
            </div>
            <ChatInput 
                messageIn={messageIn}
                setMessageIn={setMessageIn}
                onSend={onSend}
            />
        </div>   
    )
}