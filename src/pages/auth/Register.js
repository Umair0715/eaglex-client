import Input from 'components/global/Input'
import PasswordInput from 'components/global/PasswordInput'
import Navbar from 'components/global/navbar'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { register } from 'redux/actions/authActions';
import ReCAPTCHA from "react-google-recaptcha";


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [phone , setPhone] = useState('');
    const [password , setPassword] = useState('');
    const [passwordConfirm , setPasswordConfirm] = useState('');
    const [isCaptchaChecked , setIsCaptchaChecked] = useState(false);
    const [referrer , setReferrer] = useState(searchParams.get('ref_code'))

    



    const { loading } = useSelector(state => state.auth);

    const handleSubmit = async e => {
        e.preventDefault();
        if(password !== passwordConfirm){
            return toast.error('Password are not matched.');
        }
        const data = { firstName , lastName , phone , password }
        if(referrer) {
            data.referrer = referrer;
        }
        dispatch(register(data, navigate))
    }

    return (
        <div className='w-full h-full'>
            <div>
                <Navbar />
            </div>
            <div className='flex items-center justify-center w-full py-14 px-4'>
                <div className='shadow-bg p-4 sm:w-[600px] w-full '>
                    <h1 className='gradient-text text-3xl font-semibold text-center '>
                        Register
                    </h1>
                    <p className='text-center text-sm tracking-wider mt-4 text-gray-500'>
                        Create Your Account
                    </p>
                    <form 
                    className='flex flex-col gap-4 mt-5'
                    onSubmit={handleSubmit}
                    >
                        <Input
                        label='First Name'
                        placeholder='Enter your first name'
                        value={firstName}
                        setValue={setFirstName}
                        required
                        />
                        <Input
                        label='Last Name'
                        placeholder='Enter your last name'
                        value={lastName}
                        setValue={setLastName}
                        required
                        />
                        <Input
                        label='Phone Number'
                        placeholder='Enter your phone number'
                        value={phone}
                        setValue={setPhone}
                        required
                        />
                        <Input
                        label='Sponser'
                        placeholder='Enter sponser referral code'
                        value={referrer}
                        setValue={setReferrer}
                        readonly={searchParams.get('ref_code')}
                        optional
                        />
                        <PasswordInput
                        label='Password'
                        placeholder='Password'
                        value={password}
                        setValue={setPassword}
                        required
                        />
                        <PasswordInput
                        label='Confirm Password'
                        placeholder='Confirm your password'
                        value={passwordConfirm}
                        setValue={setPasswordConfirm}
                        required
                        />
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
                            className="btn-primary py-2.5 mx-auto px-20"
                            disabled={loading || !isCaptchaChecked}
                            >
                                {
                                    loading
                                    ? 
                                        <ClipLoader size={20} />
                                    : 
                                        'Register'
                                }
                            </button>
                        </div>
                    </form>
                    <div className='text-sm my-4'>
                        Already have an account? <Link to='/login' className='underline text-primary'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register