import Navbar from "../components/Navbar";
import Message from "../components/Message";
import SendIcon from '@mui/icons-material/Send';
import ConvoHeader from "../components/ConvoHeader";

const Messages = () => {
const users = [
    {
        name: "User One",
        username: "user1",
        lastMsg: "This is the last message before the convo ended",
        pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        timeStamp: "12:00AM"
    },
    {
        name: "User Two",
        username: "user2",
        pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        lastMsg: "The beach is a cold park with a cheese barrel tumbling over the moon with rubber sticks.",
        timeStamp: "12:00AM"
    },
    {
        name: "User Three",
        username: "user3",
        pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        lastMsg: "Why don't you come down to the old drown town and make a loaf of bread over the horizon at the uptown showdown",
        timeStamp: "12:00AM"
    }
]

    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center">
            <div id="messages-container" className="flex w-[80vw] h-[80vh] mt-[5vh] bg-accent rounded-lg overflow-hidden shadow-2xl">
                <div id="messages-list" className="w-[30%] flex flex-col border-r border-r-black overflow-hidden overflow-y-auto">
                    {users.map((user, index) => {
                        return (
                            <div key={index} className="flex p-2 bg-white ring-1 ring-neutral hover:ring-inset hover:ring-2 hover:cursor-pointer">
                                <img
                                    src={user.pfp}
                                    alt={`${user.username} profile`}
                                    className="w-14 h-14 rounded-full mr-2"
                                />
                                <div className="flex flex-col w-[60%] m-auto">
                                    <div className="font-bold">{user.username}</div>
                                    <div className="truncate text-sm text-gray-500">{user.lastMsg}</div>
                                </div>
                                <div className="p-1">
                                    {user.timeStamp}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div id="chatroom" className="flex flex-col w-[80%] bg-white">
                    <ConvoHeader />
                    <div id="chat-box" className="flex flex-col h-[85%]">
                        <div id="chat-messages" className="h-[90%] overflow-y-auto p-[10px]">
                            <Message />
                            <Message own={true}/>
                            <Message />
                            <Message />
                        </div>
                        <div id="send-chat" className="h-[10%] flex items-center bg-white pl-2 pr-2 relative">
                            <input type="text" placeholder="Message..." className="p-2 h-[60%] border border-primary focus:outline-none rounded-full w-full pr-[50px]" />
                            <SendIcon className="absolute right-[20px] text-primary hover:cursor-pointer hover:text-secondary hover:scale-[1.1]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}

export default Messages;