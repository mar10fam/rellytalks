import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignInForm = () => {
    return (
        <div id="signinform" className="h-[60vh] w-[90%] flex flex-col space-y-4 m-auto mt-6">
            <label className="input input-bordered input-primary flex items-center gap-2">
                <EmailOutlinedIcon />
                <input type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered input-primary flex items-center gap-2">
                <LockOutlinedIcon />
                <input type="text" className="grow" placeholder="Password" />
            </label>
            <div className="text-blue-500 hover:text-blue-700 underline cursor-pointer">Forgot password? Click here</div>
            <div className="flex-grow" />
            <button className="btn btn-outline btn-primary">Sign In</button>
        </div>
    )
}

export default SignInForm;