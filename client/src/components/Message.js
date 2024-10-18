import TimeAgo from "react-timeago";

const Message = ({message, own}) => {
    return (
        <div id="message" className={own ? "flex items-end flex-col mt-[15px]" : "flex flex-col mt-[15px]"}>
            <div id="messageTop" className="flex">
                {own ? (
                    <>
                        <p id="messageText" className="bg-[#f3f3f3] p-[10px] rounded-[20px] text-black max-w-[400px]">{message.text}</p>
                        <img
                            className="w-[32px] h-[32px] rounded-full object-cover ml-[10px]"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="Profile"
                        />                    
                    </>
                ) : (
                    <>
                        <img
                            className="w-[32px] h-[32px] rounded-full object-cover mr-[10px]"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="Profile" />
                        <p id="messageText" className="bg-secondary p-[10px] rounded-[20px] text-white max-w-[40%]">{message.text}</p>
                    </>
                )}
            </div>
            <div id="messageBot" className="text-sm mt-[10px]">{<TimeAgo date={message.createdAt} minPeriod={60} />}</div>
        </div>
    )
}

export default Message;
