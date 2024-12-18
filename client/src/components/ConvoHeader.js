import { useEffect, useState } from "react"
import { getUser } from "../api/user";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3002");

const ConvoHeader = ({ currentChat, userId }) => {
    const [user, setUser] = useState({});
    const [friendActive, setFriendActive] = useState(false);

    useEffect(() => {
        if(!currentChat) return;

        const friendId = currentChat.members.find((member) => member !== userId);
        getUser(friendId).then((user) => {
            setUser(user);
        }).catch((err) => {
            console.error("Caught error while trying to get friend in current chat: ", err);
        });

        socket.emit("checkActive", friendId); // get the initial active status

        const handleActiveStatus = (activeStatus) => {
            setFriendActive(activeStatus);
        }

        const handleUserOnline = (id) => {
            if(id === friendId) setFriendActive(true);
        }

        const handleUserOffline = (id) => {
            if(id === friendId) setFriendActive(false);
        }
        socket.on("activeStatus", handleActiveStatus);
        socket.on("userOnline", handleUserOnline);
        socket.on("userOffline", handleUserOffline);
    }, [currentChat, userId])

    if(!currentChat) return;

    return (
        <div id="user-info" className="flex items-center bg-accent h-[15%] border-b border-b-black p-2">
            <div id="pfpContainer" className="h-16 w-16 relative mr-6">
                <img
                    src={user.pfp}
                    alt={`${user.username} profile`}
                    className="w-16 h-16 border-2 border-neutral object-cover object-center rounded-full"
                /> 
                {friendActive && <div id="onlineBadge" className="absolute w-[10px] h-[10px] rounded-full bg-[#32CD32] right-[4px] top-[4px]" />}
            </div>
            <div className="flex flex-col">
                <div className="font-bold">{user.username}</div>
            </div>
        </div> 
    )
}

export default ConvoHeader