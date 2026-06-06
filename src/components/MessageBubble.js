export default function MessageBubble({role, content}) {
    return role ? (
        <p className="system-message">{content}</p>
    ) : (
        <p className="user-message">{content}</p>
    )
}