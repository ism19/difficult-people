export default function MessageBubble({role, content}) {
    return role ? (
        <p className="response-message">{content}</p>
    ) : (
        <p className="input-message">{content}</p>
    )
}