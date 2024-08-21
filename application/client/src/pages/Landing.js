import { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const Landing = () => {
    const [selected, setSelected] = useState('Sign In');

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white min-w-[35vw] min-h-[80vh] shadow-2xl rounded-lg flex flex-col p-[20px]">
                {/* Navbar to switch from sign in and sign up */}
                <div className="flex justify-center mt-4">
                    <div className="relative w-[70%] bg-neutral text-white flex rounded-full overflow-hidden">
                        <div
                            className={`flex-1 py-2 pl-[5%] text-center cursor-pointer ${selected === 'Sign In' ? 'bg-[#7A4DC4]' : 'hover:bg-secondary'}`}
                            onClick={() => setSelected('Sign In')}
                        >
                            Sign In
                        </div>
                        <div className="absolute inset-0 m-auto w-10 h-10 bg-[#7A4DC4] rounded-full"></div>
                        <div
                            className={`flex-1 py-2 pr-[5%] text-center cursor-pointer ${selected === 'Sign Up' ? 'bg-[#7A4DC4]' : 'hover:bg-secondary'}`}
                            onClick={() => setSelected('Sign Up')}
                        >
                            Sign Up
                        </div>
                    </div>
                </div>
                <div className="flex-1 mt-4">
                    {selected === 'Sign In' ? (
                        <div> <SignInForm /> </div>
                    ) : (
                        <div> <SignUpForm /> </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Landing;