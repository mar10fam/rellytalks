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
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    
    const socket = useRef(null);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const scrollRef = useRef(null);

    useEffect(() => {
        socket.current = io("ws://localhost:3002");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId, 
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, []);

    useEffect(() => {
        // check that the sender of the chat actually belongs to one of the members in current chat
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user?._id);
    }, [user])

    useEffect(() => {
        if(!user) { 
            navigate("/");
            return;
        }

        getConversations(user._id).then((res) => {
            setConversations(res);
            if(res.length > 0) setCurrentChat(res[0]);
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

        const receiverId = currentChat.members.find((member) => member !== user._id)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage
        })
        sendText(message).then((text) => {
            setMessages((prevMessages) => [...prevMessages, text]);
            setNewMessage("");
        }).then(() => {
            getConversations(user._id).then((res) => {
                setConversations(res);
            });
        }).catch((err) => {
            console.error("Error while trying to send text: ", err);
        });
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") handleSendText(e);
    }

    const sendHome = () => {
        navigate("/home");
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
                                    <Conversation conversation={convo} userId={user._id} />
                                </div> 
                            )
                        })
                    ) : (
                        <div className="flex justify-center opacity-90 mt-4 p-2 text-center">
                            No conversations
                        </div>
                    )}
                </div>
                <div id="chatroom" className="flex flex-col w-[80%] bg-white">
                    <ConvoHeader currentChat={currentChat} userId={user._id} />
                    <div id="chat-box" className="flex flex-col h-[85%]">
                        {currentChat ? <>
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
                        </> :
                        <div className="text-lg p-10 text-center opacity-90">
                            Looks like you haven't started any conversations yet. 
                            You can find people to start a conversation with in the <span 
                            onClick={sendHome} 
                            className="cursor-pointer underline text-primary hover:text-secondary">home page!</span>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Messages;