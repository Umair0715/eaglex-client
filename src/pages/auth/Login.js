import Input from 'components/global/Input';
import PasswordInput from 'components/global/PasswordInput';
import Navbar from 'components/global/navbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { login } from 'redux/actions/authActions';
import ReCAPTCHA from "react-google-recaptcha";



const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [phone , setPhone] = useState('');
    const [password , setPassword] = useState('');
    const { loading } = useSelector(state => state.auth);

    const [isCaptchaChecked , setIsCaptchaChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login({ phone , password } , navigate))
    }

    return (
        <div className='w-full'>
            <div>
                <Navbar />
            </div>
            <div className='flex items-center justify-center w-full h-full py-12 px-4'>
                <div className='shadow-bg p-4 sm:w-[600px] w-full '>
                    <h1 className='gradient-text text-3xl font-semibold text-center '>
                        Login
                    </h1>
                    <p className='text-center text-sm tracking-wider mt-4 text-gray-500'>
                        Login To Access Your Account
                    </p>
                    <form 
                    className='flex flex-col gap-4 mt-6'
                    onSubmit={handleSubmit}
                    >
                        <Input
                        type='number'
                        label='Phone'
                        placeholder='Enter your phone number'
                        value={phone}
                        setValue={setPhone}
                        required
                        />
                        <PasswordInput
                        label='Password'
                        placeholder='Enter your password'
                        value={password} 
                        setValue={setPassword}
                        required
                        />
                        <Link 
                        to='/forgot-password' 
                        className='text-right text-primary hover:text-primaryHover cursor-pointer'
                        >
                            Forgot Password?
                        </Link>
                        <div>
                        <ReCAPTCHA
                            sitekey='6LcE7xgmAAAAAF3VteVe6xO9U6LbGvlefVUyXscC'
                            onChange={() => {
                                setIsCaptchaChecked(true);
                            }}
                            onExpired={() => {
                                setIsCaptchaChecked(false);
                            }}
                        />
                        </div>
                        <div className='my-4 flex items-center justify-center'>
                            <button 
                            type='submit'  
                            className="btn-primary py-2.5 mx-auto px-20"
                            disabled={loading || !phone || !password || !isCaptchaChecked}
                            >
                                {
                                    loading
                                    ? 
                                        <ClipLoader size={20} color='white' />
                                    : 
                                        'LOGIN'
                                }
                            </button>
                        </div>
                    </form>
                    <div className='text-sm my-4'>
                        Don't have an account? <Link to='/register' className='underline text-primary'>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login