import Navbar from "../components/Navbar";

const Messages = () => {
const users = [
    {
        username: "user1",
        lastMsg: "This is the last message before the convo ended",
        pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
    },
    {
        username: "user2",
        pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        lastMsg: "The beach is a cold park with a cheese barrel tumbling over the moon with rubber sticks."
    },
    {
        username: "user3",
        pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        lastMsg: "Why don't you come down to the old drown town and make a loaf of bread over the horizon at the uptown showdown"
    }
]

    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center">
            <div id="messages-container" className="flex w-[80vw] h-[80vh] mt-[5vh] bg-white rounded-lg overflow-hidden shadow-2xl">
                <div id="messages-list" className="w-[30%] flex flex-col overflow-hidden overflow-y-auto">
                    {users.map((user, index) => {
                        return (
                            <div key={index} className="flex p-3 ring-1 ring-[#c8c8c8]">
                                <img
                                    src={user.pfp}
                                    alt={`${user.username} profile`}
                                    className="w-14 h-14 rounded-full mr-6"
                                />
                                <div className="flex flex-col w-[80%] m-auto">
                                    <div className="font-bold">{user.username}</div>
                                    <div className="truncate">{user.lastMsg}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div id="chatroom" className="w-[80%] bg-primary">

                </div>
            </div>
        </div>
        </>

    )
}

export default Messages;