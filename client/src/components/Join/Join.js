import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Join.css'

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState('');

    const errorValidation = (event) => {
        event.preventDefault();
        if (!name) {
            setError('Wrong name type')
        }
        if (!room) {
            setError('Wrong room type')
        }
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">
                    Create room
                </h1>
                <div className="inputElement">
                    <input onChange={event => setName(event.target.value)} placeholder="Name" className="JoinInput" type="text" />
                </div>
                <div className="inputElement">
                    <input onChange={event => setRoom(event.target.value)} placeholder="Room name" className="JoinInput mt-20" type="text" />
                </div>
                {error
                    ?   <div className="errorElement mt-20">
                            <span>{error}</span>
                        </div>
                    : null}
                <Link onClick={event => (!name || !room) ? errorValidation(event) : null} to={`/chat?name=${name}&room=${room}`}>
                    <button type='submit' className="button mt-20">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Join;