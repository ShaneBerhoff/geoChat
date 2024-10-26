import React from "react";

const RoomStatus = ({ userInfo, socket }) => {
    const handleClick = () => {
        socket.current.emit('cycle rooms');
        console.log("Room toggled");
    };

    return (
        <div className="grid grid-cols-[auto_auto] items-center gap-4 p-4">
            <span className="text-3xl text-cener overflow-auto">{userInfo.chatRoom}</span>
            <button className="p-2 rounded-sm hover:bg-primary hover:text-primary-darker w-10 h-10 transition-all duration-300 ease-in-out" onClick={handleClick}>
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <title>Room</title><path d="M16 2h-2v2h2v2H4v2H2v5h2V8h12v2h-2v2h2v-2h2V8h2V6h-2V4h-2V2zM6 20h2v2h2v-2H8v-2h12v-2h2v-5h-2v5H8v-2h2v-2H8v2H6v2H4v2h2v2z" fill="currentColor"/> </svg>
            </button>
        </div>
    );
}

export default RoomStatus;