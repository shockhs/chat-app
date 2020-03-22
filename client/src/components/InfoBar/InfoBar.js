import React from 'react';
import './InfoBar.css'
import title from '../../images/title.png'
const InfoBar = ({ room }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={title} alt="online" className="onlineIcon" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <div className="infoBar-buttons">
                    <a href="/"><button className="">logout</button></a>
                </div>
            </div>
        </div>
    )
}

export default InfoBar;