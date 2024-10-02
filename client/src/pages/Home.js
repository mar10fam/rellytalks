import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Navbar from "../components/Navbar";

const Home = () => {

    const users = [
        {
            username: "John Doe",
            pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            description: "This is an example of a description. I love reading and hiking."
        },
        {
            username: "Ana Lee",
            pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            description: "This is another example of a description. I like going to the beach and campfires"
        },
        {
            username: "Mar Ten",
            pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            description: "I like watching ufc and I have 3 volleyballs. Words in books are sometimes long like the sun. I have no biology, join me in the grass on the moon."
        },
        {
            username: "John Doe",
            pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            description: "This is an example of a description. I love reading and hiking."
        },
        {
            username: "Ana Lee",
            pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            description: "This is another example of a description. I like going to the beach and campfires"
        },
        {
            username: "Mar Ten",
            pfp: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
            description: "I like watching ufc and I have 3 volleyballs. Words in books are sometimes long like the sun. I have no biology, join me in the grass on the moon."
        }
    ]

    const onSearch = (searchQuery) => {
        console.log("Searching!: ", searchQuery);
    }

    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center">
            <div id="home-container" className="w-[70vw] h-[70vh] bg-white rounded-lg shadow-2xl mt-[10vh]">
                <div id="search-container" className="w-[70%] m-auto mt-[4vh]">
                    <div className="relative mt-2 rounded-md">
                        <input type="text" id="search" name="search" 
                            placeholder="Search for users" 
                            onKeyDown={(e) => e.key === 'Enter' && onSearch(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#7A4DC4]" 
                        />
                        <SearchOutlinedIcon 
                            onClick={() => onSearch(document.getElementById('search').value)} 
                            className="absolute inset-y-0 right-1 m-auto flex items-center cursor-pointer"
                        />
                    </div>
                </div>
                <div id="users" className="bg-accent rounded-md w-[80%] h-[75%] m-auto overflow-hidden overflow-y-auto mt-[4vh]">
                    {users.map((user, index) => {
                        return (
                            <div key={index} className="flex relative bg-neutral rounded-xl hover:ring-1 hover:ring-inset hover:ring-[#9876d1] items-center bg-white p-4 m-1">
                                <img
                                    src={user.pfp}
                                    alt={`${user.username} profile`}
                                    className="w-16 h-16 rounded-full mr-6"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold">{user.username}</span>
                                    <span className="pr-12">{user.description}</span>
                                </div>
                                <ChatBubbleOutlineOutlinedIcon 
                                    className="absolute inset-y-0 right-4 flex m-auto mr-2 cursor-pointer" 
                                    
                                />
                            </div>  
                        )
                    })}
                </div>
            </div>  
        </div>
        </> 
    )
}

export default Home;