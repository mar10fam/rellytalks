import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UserContext from '../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';
import { login } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const [emailValid, setEmailValid] = useState(true);
    const [loginValid, setLoginValid] = useState(true);

    const validateEmail = (input) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        setEmailValid(isValid);
    }

    const handleLogin = () => {
        validateEmail(email);
        if(!emailValid) return;
        
        const body = {
            email: email,
            password: pw
        }
        
        login(body).then((res) => {
            setUser(res.data);
            navigate("/home");
        }).catch((err) => {
            console.error("Login failed: ", err);
            setLoginValid(false);
        }); 
    }

    return (
        <div id="signinform" className="h-[60vh] w-[90%] p-2 flex flex-col space-y-4 m-auto mt-6">
            <div className="text-center text-xl font-bold mb-2">Welcome to RellyTalks, let's get signed in!</div>
            <label className="input input-bordered input-primary flex items-center gap-2">
                <EmailOutlinedIcon />
                <input type="text" className="grow" placeholder="Email" 
                    onChange={(e) => {
                        validateEmail(e.target.value);
                        setEmail(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
            </label>
            {!emailValid && <div className="label-text text-red-600 mt-2">Please enter an email in the correct format: example@mail.com</div>}
            <label className="input input-bordered input-primary flex items-center gap-2">
                <LockOutlinedIcon />
                <input type="password" className="grow" placeholder="Password" 
                    onChange={(e) => {
                        setPw(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
            </label>
            {!loginValid && <div className="label-text text-red-600 mt-2">Sorry, we didn't recognize that email and password</div>}
            <div className="text-blue-500 hover:text-blue-700 underline cursor-pointer">Forgot password? Click here</div>
            <div className="flex-grow" />
            {(emailValid ? 
                <button className="btn btn-outline btn-primary" onClick={handleLogin}>Sign In</button> 
                : <button className="btn btn-outline btn-primary" disabled="disabled">Sign In</button>
            )}
        </div>
    )
}

export default SignInForm;