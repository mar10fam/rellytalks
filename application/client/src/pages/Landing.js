import "../styles/Landing.css"

const Landing = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white w-[30vw] h-[80vh] shadow-2xl rounded-lg flex flex-col p-[20px]">
                {/* navbar to switch from sign in and sign up*/}
                <div className="flex justify-center mt-4">
                    <div className="w-[40%] bg-blue-500 text-white flex rounded-full overflow-hidden">
                        <div>Sign In</div>
                        <div>Sign Up</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;