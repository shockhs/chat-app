import React from 'react';
import './Message.css'
import ReactEmoji from 'react-emoji'


const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;
    let isSystemMessage = false;
    const trimedName = name.trim().toLowerCase();
    if (user === trimedName) {
        isSentByCurrentUser = true;
    }
    if (user === 'System') {
        isSystemMessage = true;
    }
    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">
                        {trimedName}
                    </p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">
                            {ReactEmoji.emojify(text)}
                        </p>
                    </div>
                </div>
            )
            : (!isSystemMessage ?
                <div className="messageContainer justifyStart">
                    <div className="messageBox colorDefault">
                        <p className="sentText colorWhite">
                            {ReactEmoji.emojify(text)}
                        </p>
                    </div>
                    <div className="messageText colorDark">
                        <p className="sentText pl-10">
                            {user}
                        </p>
                    </div>
                </div>
                : <div className="messageContainer justifyStart">
                    <div className="messageBox">
                        <p className="sentText">
                            {text}
                        </p>
                    </div>
                    <div className="messageText colorDark">
                        <p className="sentText pl-10">
                            {user}
                        </p>
                    </div>
                </div>
            )
    )
}

export default Message;