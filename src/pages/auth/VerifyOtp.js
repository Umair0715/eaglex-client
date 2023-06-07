import Input from 'components/global/Input'
import Navbar from 'components/global/navbar'
import Axios from 'config/api'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import toastError from 'utils/toastError'

const VerifyOtp = () => {
    const [otp , setOtp] = useState('');
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data : { data : { message , doc } } } = await Axios.post(`/user/verify-otp` , { otp });
            toast.success(message);
            navigate(`/reset-password/${doc?.otp}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }

    return (
        <div className='w-full h-screen'>
            <div>
                <Navbar />
            </div>
            <div className='flex items-center justify-center w-full calc-height px-4'>
                <div className='shadow-bg p-4 sm:w-[600px] w-full '>
                    <h1 className='gradient-text text-3xl font-semibold text-center '>
                        Verify Otp
                    </h1>
                    
                    <form 
                    className='flex flex-col gap-4 mt-8'
                    onSubmit={handleSubmit}
                    >
                        <Input
                        type='number'
                        label='Check your phone for the OTP and enter it below to reset your password.'
                        placeholder='Enter Your otp'
                        value={otp}
                        setValue={setOtp}
                        />
                        <div className='my-4'>
                            <button
                            type='submit'
                            className="btn-primary py-2.5 mx-auto px-20"
                            >
                                {
                                    loading 
                                    ? 
                                        <ClipLoader size={20} color='white' />
                                    : 
                                        'Verify Otp'
                                }
                            </button>
                        </div>
                    </form>
                    <div className='text-sm my-4'>
                        <Link to='/forgot-password' className='underline text-primary'>
                            Back 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp