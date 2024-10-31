import { useState, useEffect } from "react"
import { getUser } from "../api/user";
import { getLastMsg } from "../api/message";

const Conversation = ({ conversation, userId, isActive }) => {
    const [user, setUser] = useState({});
    const [lastMsg, setLastMsg] = useState();

    useEffect(() => {
        const friendId = conversation.members.filter((member) => member !== userId);
        getUser(friendId).then((user) => {
            setUser(user);
        }).catch((err) => {
            console.error("Failed to get user: ", err);
        });

        getLastMsg(conversation._id).then((lastMsg) => {
            setLastMsg(lastMsg);
        }).catch((err) => {
            console.error("Caught while trying to get last message of convo: ", err);
        })
    }, [conversation, userId]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className={`flex group p-2 ring-1 ring-neutral hover:bg-accent hover:cursor-pointer ${isActive ? "bg-secondary" : "bg-white"}`}>
            <img
                src={user.pfp}
                alt={`${user.username} profile`}
                className="w-14 h-14 object-cover border-2 border-neutral object-center rounded-full mr-[10px]"
            />
            <div className="flex flex-col w-[50%] m-auto">
                <div className={`font-bold group-hover:text-black ${isActive && "text-white"}`}>{user.username}</div>
                <div className={`truncate text-sm text-gray-500 ${isActive && "text-white"}`}>{lastMsg?.text}</div> 
            </div>
            <div className={`p-1 text-sm ${isActive && "text-white"}`}>
                {lastMsg?.createdAt ? formatTime(lastMsg?.createdAt) : ""}
            </div>
        </div>
    )
}

export default Conversation