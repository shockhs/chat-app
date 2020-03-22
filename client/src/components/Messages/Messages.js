import React from 'react';
import './Messages.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message';


const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className="messages">
            {messages.map((message, id) => <div key={id}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    )
}

export default Messages;