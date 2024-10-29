import { useState, useEffect } from "react"
import { getUser } from "../api/user";

const Conversation = ({ conversation, userId }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const friendId = conversation.members.filter((member) => member !== userId);
        getUser(friendId).then((user) => {
            setUser(user);
        }).catch((err) => {
            console.error("Failed to get user: ", err);
        });
    }, [conversation, userId]);

    return (
        <div className="flex p-2 bg-white ring-1 ring-neutral hover:ring-inset hover:ring-2 hover:cursor-pointer">
            <img
                src={user.pfp}
                alt={`${user.username} profile`}
                className="w-14 h-14 object-cover border-2 border-neutral object-center rounded-full mr-2"
            />
            <div className="flex flex-col w-[60%] m-auto">
                <div className="font-bold">{user.username}</div>
                {/* <div className="truncate text-sm text-gray-500">{receiver.lastMsg}</div> */}
            </div>
            <div className="p-1">
                {user.timeStamp}
            </div>
        </div>
    )
}

export default Conversation