import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, searchUsers } from '../api/user';
import { newConversation } from '../api/conversation';

const Home = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate("/");

        getAllUsers().then((users) => {
            setUsers(users);
        }).catch((err) => {
            console.error("Caught error while trying to get all users: ", err);
        });
    }, [user, navigate]);

    const handleChat = (receiverId) => {
        newConversation(user._id, receiverId).then((res) => {
            if(res.status === 204) {
                // convo already exists
                // send user to messages with the current chat as who they clicked on 
                navigate("/messages", { state: { currentChat: res.data }});
            } else {
                navigate("/messages", { state: { currentChat: res.data[0] }});
            }
        }).catch((err) => {
            console.error("Caught error while making new conversation from home page: ", err);
        })
    }

    const handleSearch = (searchQuery) => {
        if(searchQuery === "") {
            getAllUsers().then((users) => {
                setUsers(users);
            }).catch((err) => {
                console.error("Caught error while trying to get all users: ", err);
            });
        } else {
            searchUsers(searchQuery).then((users) => {
                setUsers(users);
            }).catch((err) => {
                console.error("Caught while trying to search for users: ", err);
            })
        }
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#7A4DC4]" 
                        />
                        <SearchOutlinedIcon 
                            onClick={() => handleSearch(document.getElementById('search').value)} 
                            className="absolute inset-y-0 right-1 m-auto flex items-center cursor-pointer"
                        />
                    </div>
                </div>
                <div id="users" className="bg-accent rounded-md w-[80%] h-[75%] m-auto overflow-hidden overflow-y-auto mt-[4vh]">
                    {users.map((otherUser, index) => {
                        if(otherUser._id === user._id) return <div key={index} />
                        return (
                            <div key={index} className="flex relative bg-neutral rounded-xl hover:ring-1 hover:ring-inset hover:ring-[#9876d1] items-center bg-white p-4 m-1 group hover:bg-secondary">
                                <img
                                    src={otherUser.pfp}
                                    alt={`${otherUser.username} profile`}
                                    className="w-16 h-16 object-cover object-center ring-gray-300 ring-2 rounded-full mr-6"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold group-hover:text-white">{otherUser.username}</span>
                                    <span className="pr-12 group-hover:text-white">{otherUser.description}</span>
                                </div>
                                <ChatBubbleOutlineOutlinedIcon 
                                    className="absolute inset-y-0 right-4 flex m-auto mr-2 cursor-pointer group-hover:text-white" 
                                    onClick={() => handleChat(otherUser._id)}
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