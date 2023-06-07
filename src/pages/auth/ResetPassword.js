import PasswordInput from 'components/global/PasswordInput'
import Navbar from 'components/global/navbar'
import Axios from 'config/api';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { otp } = useParams();
    const [newPassword , setNewPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [loading , setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            return toast.error("Oops! It looks like the passwords you provided don't match. Please ensure they are identical.")
        }
        try {
            setLoading(true);
            const { data : { data : { message } } } = await Axios.post('/user/reset-password' , {
                otp , newPassword
            });
            toast.success(message);
            navigate('/login');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error)
        }
    }
    


    return (
        <div className='w-full h-screen'>
            <div>
                <Navbar />
            </div>
            <div className='flex items-center justify-center w-full calc-height px-4'>
                <div className='shadow-bg p-4 sm:w-[600px] w-full '>
                    <h1 className='gradient-text text-3xl font-semibold text-center '>Reset Your Password</h1>
                    <form 
                    className='flex flex-col gap-4 mt-8'
                    onSubmit={handleSubmit}
                    >
                        <PasswordInput
                        label='New Password'
                        placeholder='Enter your new password'
                        value={newPassword}
                        setValue={setNewPassword}
                        required
                        />
                        <PasswordInput
                        label='Confirm Password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        required
                        />
                        <div className='my-4'>
                            <button
                            type='submit'
                            className="btn-primary py-2.5 mx-auto px-20"
                            disabled={loading }
                            >
                                {
                                    loading 
                                    ? 
                                        <ClipLoader size={20} color='white' />
                                    : 
                                        'Save'
                                }
                            </button>
                        </div>
                    </form>
                    <div className='text-sm my-4'>
                        <Link to='/' className='underline text-primary'>
                            Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword