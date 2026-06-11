import '../style/MessageBubble.css'
import { useState } from 'react'

export default function MessageBubble({role, content}) {
    const [copied, setCopied] = useState(false)

    function copyText() {
        navigator.clipboard.writeText(content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return role === "assistant" ? (
        <div className="system-message-wrapper">
            <p className="system-message">{content}</p>
            <button className="copy-button" onClick={copyText}>
                <img src={copied ? "check-mark.svg" : "copy-button.svg"}/>
            </button>
        </div>
    ) : (
        <p className="user-message">{content}</p>
    )
}