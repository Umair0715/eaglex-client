import Input from 'components/global/Input'
import Navbar from 'components/global/navbar'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full h-screen'>
            <div>
                <Navbar />
            </div>
            <div className='flex items-center justify-center w-full calc-height px-4'>
                <div className='shadow-bg p-4 sm:w-[600px] w-full '>
                    <h1 className='gradient-text text-3xl font-semibold text-center '>Forgot Password</h1>
                    <form className='flex flex-col gap-4 mt-8'>
                        <Input
                        type='number'
                        label='Phone'
                        placeholder='Enter your phone number'
                        />
                        <div className='my-4'>
                            <button
                            onClick={() => navigate('/reset-password')} 
                            className="btn-primary py-2.5 mx-auto px-20"
                            >
                                Send Otp
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