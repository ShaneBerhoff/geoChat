import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";

const RoomStatus = ({ userInfo, socket }) => {
    const handleClick = () => {
        socket.current.emit('cycle rooms');
        console.log("Room toggled");
    };

    return (
        <div className="grid grid-cols-[auto_auto] items-center gap-4 p-2">
            <span className="text-24px font-IBM-BIOS text-cener overflow-hidden">{userInfo.chatRoom}</span>
            <span className="text-24px cursor-pointer" onClick={handleClick}>
                <FaArrowsRotate/>
            </span>
        </div>
    );
}

export default RoomStatus;