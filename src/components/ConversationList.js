import '../style/ConversationList.css'
import { useState } from 'react'

export default function ConversationList({conversations, selected, setSelected, newConversation}) {
    const [toggleEditMenu, setToggleEditMenu] = useState(null)

    return (
        <div className="conversation-list-panel">
            <button 
                className="new-conversation-button" 
                onClick={() => newConversation()}
            ><img src="new-chat-icon.svg"/></button>
            <p className="conversations-header">Conversations</p>
            <ul className="conversation-list">
                {conversations.map(conv => (
                    <li 
                        className={selected?.id === conv.id ? "selected-list-item" : "list-item"}
                        key={conv.id}
                        onClick={() => setSelected(conv)}
                    >
                        {conv.name}
                        <div className="edit-menu-wrapper">
                            <button className="edit-menu-button" onClick={e => {
                                e.stopPropagation()
                                setToggleEditMenu(toggleEditMenu?.id === conv.id ? null : conv)
                            }}>⋮</button>
                            {toggleEditMenu?.id === conv.id && (
                                <div className="edit-menu-options">
                                    <button 
                                        className="edit-button"
                                    >Edit</button>
                                    <button 
                                        className="delete-button"
                                    >Delete</button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}