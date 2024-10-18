import Navbar from "../components/Navbar";
import Message from "../components/Message";
import SendIcon from '@mui/icons-material/Send';
import ConvoHeader from "../components/ConvoHeader";
import UserContext from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { getConversations } from "../api/conversation";
import { getMessages } from "../api/message";
import { useNavigate } from "react-router-dom";
import Conversation from "../components/Conversation";

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) { 
            navigate("/");
            return;
        }
        console.log("User: ", user);

        getConversations(user._id).then((res) => {
            setConversations(res.data);
            console.log("Conversations: ", res.data);
        }).catch((err) => {
            console.error("Error attempting to get conversations: ", err);
        });
    }, [user, navigate]);

    useEffect(() => {
        getMessages(currentChat?._id).then((res) => {
            console.log("Messages: ", res);
            setMessages(res);
        }).catch((err) => {
            console.error("Error getting messages for current chat: ", err);
        })
    }, [currentChat]);

    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center">
            <div id="messages-container" className="flex w-[80vw] h-[80vh] mt-[5vh] bg-accent rounded-lg overflow-hidden shadow-2xl">
                <div id="messages-list" className="w-[30%] flex flex-col border-r border-r-black overflow-hidden overflow-y-auto">
                    {(conversations && conversations.length > 0) ? (
                        conversations.map((convo) => {
                            return (
                               <div onClick={() => setCurrentChat(convo)}>
                                    <Conversation key={convo._id} conversation={convo} />
                                </div> 
                            )
                        })
                    ) : (
                        <div className="flex justify-center opacity-90">
                            Find users to message
                        </div>
                    )}
                </div>
                <div id="chatroom" className="flex flex-col w-[80%] bg-white">
                    <ConvoHeader />
                    <div id="chat-box" className="flex flex-col h-[85%]">
                        <div id="chat-messages" className="h-[90%] overflow-y-auto p-[10px]">
                            {messages.map((message) => {
                                return <Message key={message._id} message={message} own={message.senderId === user._id} />
                            })}
                        </div>
                        <div id="send-chat" className="h-[10%] flex items-center bg-white pl-2 pr-2 relative">
                            <input 
                                type="text" 
                                placeholder="Message..." 
                                className="p-2 h-[60%] border border-primary focus:outline-none rounded-full w-full pr-[50px]"
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
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