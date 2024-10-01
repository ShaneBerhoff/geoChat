import React from "react";
import { TbSwitch3 } from "react-icons/tb";

const RoomStatus = ({ userInfo, socket }) => {
    const handleClick = () => {
        socket.current.emit('cycle rooms');
        console.log("Room toggled");
    };

    return (
        <div className="flex items-center">
            <div className="text-3xl font-mono font-bold pr-2">{userInfo.chatRoom}</div>
            <TbSwitch3 className="text-xl cursor-pointer" onClick={handleClick}/>
        </div>
    );
}

export default RoomStatus;