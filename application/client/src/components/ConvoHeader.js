
const ConvoHeader = () => {
    return (
        <div id="user-info" className="flex items-center bg-accent h-[15%] border-b border-b-black p-2">
            <div id="pfpContainer" className="h-16 w-16 relative mr-6">
                <img
                    src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt={`Username profile`}
                    className="border-2 border-neutral rounded-full"
                /> 
                <div id="onlineBadge" className="absolute w-[10px] h-[10px] rounded-full bg-[#32CD32] right-[4px] top-[4px]" />
            </div>
            <div className="flex flex-col">
                <div className="font-bold">User Name</div>
                <div>@user</div>
            </div>
        </div> 
    )
}

export default ConvoHeader