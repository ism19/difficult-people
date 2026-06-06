import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({selected, conversations, messageIn, setMessageIn, onSend}) {
    return (
        <div className="chat-window">
            <div className="chat-scroll-window">
                {selected.messages.map((message, index) => (
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