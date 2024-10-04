import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";

const RoomStatus = ({ userInfo, socket }) => {
    const handleClick = () => {
        socket.current.emit('cycle rooms');
        console.log("Room toggled");
    };

    return (
        <div className="grid grid-cols-[auto_auto] items-center gap-4 p-4">
            <span className="text-3xl  text-cener overflow-hidden">{userInfo.chatRoom}</span>
            <span className="text-xl cursor-pointer" onClick={handleClick}>
                <FaArrowsRotate/>
            </span>
        </div>
    );
}

export default RoomStatus;