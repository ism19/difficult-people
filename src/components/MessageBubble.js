import '../style/MessageBubble.css'

export default function MessageBubble({role, content}) {
    return role === "assistant" ? (
        <p className="system-message">{content}</p>
    ) : (
        <p className="user-message">{content}</p>
    )
}