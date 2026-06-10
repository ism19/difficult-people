import '../style/RenameConversation.css'
import { useRef, useEffect } from 'react'

export default function RenameConversation({rename, setRename, saveConversation, setConversationToRename}) {
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.select()
    }, [])
    
    return (
        <div className="rename-screen">
            <div className="rename-background"></div>
            <div className="rename-wrapper">
                <p className="rename-conversation">Rename Conversation</p>
                <input 
                    className="rename-input"
                    type="text"
                    ref={inputRef}
                    value={rename}
                    onChange={e => setRename(e.target.value)}
                />
                <div className="save-and-cancel-buttons">
                    <button className="cancel-rename-button" onClick={() => {
                        setConversationToRename(null)
                        setRename("")
                    }}>Cancel</button>
                    <button className="save-rename-button" onClick={() => {
                        saveConversation()
                    }}>Save</button>
                </div>
            </div>
        </div>
    )
}