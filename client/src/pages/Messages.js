import Navbar from "../components/Navbar";
import Message from "../components/Message";
import SendIcon from '@mui/icons-material/Send';
import ConvoHeader from "../components/ConvoHeader";
import UserContext from "../context/AuthContext";
import { useContext, useState, useEffect, useRef } from "react";
import { getConversations } from "../api/conversation";
import { getMessages, sendText } from "../api/message";
import { useNavigate } from "react-router-dom";
import Conversation from "../components/Conversation";
import { io } from "socket.io-client";

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    
    const socket = useRef(null);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const scrollRef = useRef(null);

    useEffect(() => {
        socket.current = io("ws://localhost:3002");
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user?._id);
        socket.current.on("getUsers", (users) => {
            console.log("Socket users: ", users);
        });
    }, [user])

    useEffect(() => {
        if(!user) { 
            navigate("/");
            return;
        }

        getConversations(user._id).then((res) => {
            setConversations(res.data);
        }).catch((err) => {
            console.error("Error attempting to get conversations: ", err);
        });
    }, [user, navigate]);

    useEffect(() => {
        getMessages(currentChat?._id).then((res) => {
            setMessages(res);
        }).catch((err) => {
            console.error("Error getting messages for current chat: ", err);
        })
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendText = (e) => {
        e.preventDefault();

        const message = {
            conversationId: currentChat._id,
            senderId: user._id,
            text: newMessage
        }
        
        sendText(message).then((text) => {
            setMessages((prevMessages) => [...prevMessages, text]);
            setNewMessage("");
        }).catch((err) => {
            console.error("Error while trying to send text: ", err);
        });
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") handleSendText(e);
    }

    return (
        <>
        <Navbar />
        <div className="flex items-center justify-center">
            <div id="messages-container" className="flex w-[80vw] h-[80vh] mt-[5vh] bg-accent rounded-lg overflow-hidden shadow-2xl">
                <div id="messages-list" className="w-[30%] flex flex-col border-r border-r-black overflow-hidden overflow-y-auto">
                    {(conversations && conversations.length > 0) ? (
                        conversations.map((convo) => {
                            return (
                               <div key={convo._id} onClick={() => setCurrentChat(convo)}>
                                    <Conversation conversation={convo} />
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
                                return <div ref={scrollRef} key={message._id}><Message message={message} own={message.senderId === user._id} /></div>
                            })}
                        </div>
                        <div id="send-chat" className="h-[10%] flex items-center bg-white pl-2 pr-2 relative">
                            <input 
                                type="text" 
                                placeholder="Message..." 
                                className="p-2 h-[60%] border border-primary focus:outline-none rounded-full w-full pr-[50px]"
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                value={newMessage}
                            />
                            <SendIcon 
                                className="absolute right-[20px] text-primary hover:cursor-pointer hover:text-secondary hover:scale-[1.1]" 
                                onClick={handleSendText}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Messages;