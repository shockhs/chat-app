import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import { NavLink } from 'react-router-dom';

let socket;

const Chat = ({ location }) => {
    let [update, setUpdate] = useState(0);
    let [updateTime, setUpdateTime] = useState(0);
    const [name, setName] = useState('');
    const [room, setRoom] = useState(null);
    const [rooms, setRooms] = useState('');
    const [users, setUsers] = useState(null);
    let [uptime, setUptime] = useState(['00', '00']);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesTotal, setMessagesTotal] = useState([]);
    const [usersTotal, setUsersTotal] = useState([]);
    const ENDPOINT = 'https://react-chap-application.herokuapp.com/';
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setRoom(room);
        setName(name);
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
        socket.emit('getAllData', () => {
            setUpdate(update => update++);
        })
        socket.emit('getUptime', () => {
            setUpdateTime(updateTime=>updateTime++);
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])
    useEffect(() => {
        setUpdate(update => update++);
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.on('data', ({ rooms, users, messages, totalUsers, uptime }) => {
            setRooms(rooms)
            setUsers(users)
            setMessagesTotal(messages)
            setUsersTotal(totalUsers)
        })
    }, [update])
    useEffect(() => {
        socket.on('time', ({ uptime }) => {
            console.log(uptime);
            let time = uptime.split(':');
            console.log(time);
            setUptime(time)
        })
    }, [updateTime])

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            })
            socket.emit('getAllData', () => {
                setUpdate(update++);
            })
        }
    }
    const updateData = (event) => {
        event.preventDefault();
        socket.emit('getAllData', () => {
            setUpdate(update++);
        })
        socket.emit('getUptime', () => {
            setUpdateTime(updateTime++);
        })
    }
    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <div className="logotype">
                    <NavLink className="logotype-link" to="/">multiply chat-app</NavLink>
                </div>
                <div className="sliders">
                    <div className="roomContainer-buttons">
                        <button onClick={updateData}>Refresh</button>
                    </div>
                </div>
            </div>
            <div className="blockChat">
                <div className="roomContainer">
                    <div className="ui statistic">
                        <div className="value">
                            {rooms}
                        </div>
                        <div className="label">
                            active rooms
                        </div>
                    </div>
                    <div className="ui statistic">
                        <div className="value mt-20">
                            {users}
                        </div>
                        <div className="label">
                            active users
                        </div>
                    </div>
                    <div className="ui statistic">
                        <div className="value mt-20">
                            {messagesTotal}
                        </div>
                        <div className="label">
                            total messages
                        </div>
                    </div>
                    <div className="ui statistic">
                        <div className="value mt-20">
                            {usersTotal}
                        </div>
                        <div className="label">
                            total users
                        </div>
                    </div>
                    <div className="ui statistics center-block">
                        <div className="statistic">
                            <div className="value mt-20">
                                {uptime[0]}
                            </div>
                            <div className="label">
                                hours
                            </div>
                        </div>
                        <div className="statistic">
                            <div className="value mt-20">
                                {uptime[1]}
                            </div>
                            <div className="label">
                                minutes
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chatContainer">
                    <InfoBar room={room} />
                    <Messages name={name} messages={messages} />
                    <Input message={message} sendMessage={sendMessage} setMessage={setMessage} />
                </div>
            </div>
        </div >
    )
}

export default Chat;