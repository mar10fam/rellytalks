const Message = ({own}) => {
    return (
        <div id="message" className={own ? "flex items-end flex-col mt-[15px]" : "flex flex-col mt-[15px]"}>
            <div id="messageTop" className="flex">
                {own ? (
                    <>
                        <p id="messageText" className="bg-[#f3f3f3] p-[10px] rounded-[20px] text-black max-w-[400px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <img
                            className="w-[32px] h-[32px] rounded-full object-cover ml-[10px]"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="Profile Picture"
                        />                    
                    </>
                ) : (
                    <>
                        <img
                            className="w-[32px] h-[32px] rounded-full object-cover mr-[10px]"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="Profile Picture" />
                        <p id="messageText" className="bg-secondary p-[10px] rounded-[20px] text-white max-w-[40%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </>
                )}
            </div>
            <div id="messageBot" className="text-sm mt-[10px]">1 hour ago</div>
        </div>
    )
}

export default Message;
