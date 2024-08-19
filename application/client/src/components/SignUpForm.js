import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { TermsOfService, PrivacyPolicy } from './TosAndPP';
import { useState } from 'react';

const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [tos, setTos] = useState('');

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid1, setPasswordValid1] = useState(true);
    const [passwordValid2, setPasswordValid2] = useState(true);
    const [confirmPwValid, setConfirmPwValid] = useState(true);
    const [tosValid, setTosValid] = useState(true);

    const validateEmail = (input) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        setEmailValid(isValid);
    };

    
    
    const validatePassword1 = (input) => {
        const isValid = /.{8,}/.test(input);
        setPasswordValid1(isValid);
    };
    
    const validatePassword2 = (input) => {
        const isValid = /(?=.*[A-Za-z])(?=.*\d)/.test(input);
        setPasswordValid2(isValid);
    };

    const validateConfirmPw = (input) => {
        setConfirmPwValid(input === password);
    };

    const validateTos = (input) => {
        setTosValid(input);
    }
    return (
        <>
        <div id="signupform" className="h-[60vh] p-4 overflow-y-auto overflow-x-hidden w-[90%] flex flex-col space-y-3 m-auto mt-6">
            <div className="flex gap-1">
                <label className="input input-bordered input-primary flex flex-1 items-center gap-2 w-[48%]">
                    <PersonOutlineOutlinedIcon />
                    <input type="text" className="grow" placeholder="First Name" 
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}/>
                </label>
                <label className="input input-bordered input-primary flex flex-1 items-center gap-2 w-[48%]">
                    <PersonOutlineOutlinedIcon />
                    <input type="text" className="grow" placeholder="Last Name" 
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}/>
                </label>
            </div>
            <label className="input input-bordered input-primary flex items-center gap-2 flex-shrink-0">
                <EmailOutlinedIcon />
                <input type="text" className="grow" placeholder="Email" 
                onChange={(e) => {
                    validateEmail(e.target.value);
                    setEmail(e.target.value);
                }}/>
            </label>
            {!emailValid && <div className="label-text text-red-600 mt-2">Please enter a valid email address in the format <span style={{fontWeight: 'bold'}}>example@mail.com</span></div>}
            <label className="input input-bordered input-primary flex items-center gap-2 flex-shrink-0">
                <LockOutlinedIcon />
                <input type="text" className="grow" placeholder="Password" 
                onChange={(e) => {
                    validatePassword1(e.target.value);
                    validatePassword2(e.target.value);
                    setPassword(e.target.value);
                }}/>
            </label>
            {!passwordValid1 && <div className="label-text text-red-600 mt-2">Password must be at least 8 characters long</div>}
            {!passwordValid2 && <div className="label-text text-red-600 mt-2">Password must contain at least one letter and one number</div>}
            <label className="input input-bordered input-primary flex items-center gap-2 flex-shrink-0">
                <LockOutlinedIcon />
                <input type="text" className="grow" placeholder="Confirm Password" 
                onChange={(e) => {
                    validateConfirmPw(e.target.value);
                    setConfirmPw(e.target.value);
                }}/>
            </label>
            {!confirmPwValid && <div className="label-text text-red-600 mt-2">Passwords must match</div>}
            <div className="flex items-center">
                <label className="items-center mt-2 mb-2">
                    <input type="checkbox" className="checkbox checkbox-primary mr-2" 
                    onChange={(e) => {
                        setTos(e.target.checked);
                        validateTos(e.target.checked);
                    }}/>
                </label>
                <div className="label-text">
                    By checking this box, you agree to our 
                    <span className="text-blue-700 underline hover:cursor-pointer" onClick={()=>document.getElementById('tos_modal').showModal()}> Terms of Service and Privacy Policy.</span>
                </div>
            </div>
            {!tosValid && <div className="text-red-700 label-text">Please agree to our Terms of Service and Privacy Policy to create an account</div>}
            <div className="flex-grow" />
            <button className="btn btn-outline btn-primary">Sign Up</button>
        </div>
            <dialog id="tos_modal" className="modal">
                <div className="modal-box w-[max(33vw,fit-content)] h-5/6 flex flex-col justify-between relative pt-0">
                    <div className="modal-header sticky top-0 bg-white z-10 p-4 border-b border-gray-300">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Terms of Service and Privacy Policy</h3>
                    </div>
                    <br/>
                    <div className="overflow">
                        <h2 className="underline">Terms of Service</h2>
                        <TermsOfService />
                        <h2 className="underline">Privacy Policy</h2>
                        <PrivacyPolicy />
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default SignUpForm;