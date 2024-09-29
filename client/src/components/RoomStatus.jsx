import React from "react";

const RoomStatus = ({userInfo, socket }) => {
    const handleClick = () => {
        socket.current.emit('cycle rooms');
        console.log("Room toggled");
    };

    return (
        <div className="" onClick={handleClick}>
            {userInfo.chatRoom}
        </div>
    );
}

export default RoomStatus;