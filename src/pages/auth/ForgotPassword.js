import Input from 'components/global/Input'
import Navbar from 'components/global/navbar'
import Axios from 'config/api'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import toastError from 'utils/toastError'

const ForgotPassword = () => {
    const [phone , setPhone] = useState('');
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data : { data : { message } } } = await Axios.post(`/user/forgot-password` , { phone });
            toast.success('Otp sent to your phone.');
            navigate('/verify-otp');
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
                        Forgot Password
                    </h1>
                    <form 
                    className='flex flex-col gap-4 mt-8'
                    onSubmit={handleSubmit}
                    >
                        <Input
                        type='number'
                        label='Phone'
                        placeholder='Enter your phone number'
                        value={phone}
                        setValue={setPhone}
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
                                        'Send Otp'
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

export default ForgotPassword