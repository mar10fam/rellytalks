import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignInForm = () => {
    return (
        <div id="signinform" className="">
            <label className="input input-bordered input-primary flex items-center gap-2">
                <EmailOutlinedIcon />
                <input type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered input-primary flex items-center gap-2">
                <LockOutlinedIcon />
                <input type="text" className="grow" placeholder="Password" />
            </label>
        </div>
    )
}

export default SignInForm;