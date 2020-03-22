import React from 'react';
import './Input.css'

const Input = ({ sendMessage, setMessage, message }) => {
    return (
        <>
            <form className="form">
                <input
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    placeholder="Type a message..."
                    className="input"
                    value={message}
                    type="text" />

                <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
            </form>
        </>
    )
}

export default Input;