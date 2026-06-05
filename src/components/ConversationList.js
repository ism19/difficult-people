export default function ConversationList({conversations, selected, setSelected, newConversation}) {
    return (
        <div className="conversation-list-panel">
            <button 
                className="new-conversation-button" 
                onClick={() => newConversation}
            ><img src="new-chat-icon"/></button>
            <ul className="conversation-list">
                {conversations.map(conv => (
                    <li 
                        className={selected?.name === conv.name ? "selected-list-item" : "list-item"}
                        key={conv.name} 
                        onClick={() => setSelected(conv)}
                    >{conv.name}</li>
                ))}
            </ul>
        </div>
    )
}