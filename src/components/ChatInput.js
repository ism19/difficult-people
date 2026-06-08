import '../style/ChatInput.css'

export default function ChatInput({messageIn, setMessageIn, onSend}) {
    return (
        <div className="input-box">
            <input
                className="chat-input"
                value={messageIn}
                onChange={e => setMessageIn(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        onSend()
                    }
                }}
                placeholder="Type a new message..."
            />
            <button className="send-button" onClick={onSend}>
                <img src="send-button.svg"/>
            </button>
        </div>
    )
}