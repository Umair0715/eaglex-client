import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Axios from 'config/api'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import fetcher from 'utils/fetcher'
import toastError from 'utils/toastError'

const Withdraw = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const [bank , setBank] = useState('');
    const [amount , setAmount] = useState('');
    const [loading , setLoading] = useState(false);
    const [settings , setSettings] = useState('');

    const { isLoading , data } = useQuery('fetch-bank' , () => {
        return fetcher('/bank/my' , user);
    });

    const { isLoading : settingsLoading , data : settingsData } = useQuery('fetch-settings' , () => {
        return fetcher('/setting' , user);
    });

    useEffect(() => {
        if (data) {
            setBank(data?.data?.data?.doc);
        }
    }, [data]);

    useEffect(() => {
        if(settingsData) {
            setSettings(settingsData?.data?.data?.doc);
        }
    }, [settingsData])

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            const withdrawData = { 
                amount : Number(amount) , 
                bankDetails : bank?._id 
            };
            await Axios.post('/withdraw' , withdrawData , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            navigate('/withdraw/success');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }

    return (
        <Layout>
            <div className='mt-6'>
                <div className='flex items-center justify-between gap-2'>
                    <Heading title='Withdraw' showIcon={false} />
                    <BackBtn />
                </div>
                {
                    isLoading || settingsLoading
                    ? 
                        <Loader />
                    : 
                        <div className='mt-6 shadow-bg p-4 rounded-lg '>
                            <div className='flex items-center justify-center flex-col gap-1'>
                                <h3 className='text-lg'>Available Balance</h3>
                                <p className='sm:text-3xl font-semibold gradient-text text-xl'>PKR:{user?.wallet?.totalBalance}</p>
                            </div>
                            {
                                bank 
                                ? 
                                    <form className='mt-4' onSubmit={handleSubmit}>
                                        <Input
                                        type='number'
                                        label='Enter Amount'
                                        placeholder='Amount you want to withdraw'
                                        value={amount}
                                        setValue={setAmount}
                                        required
                                        />

                                        <div className='mt-6'>
                                            <p>Withdraw Money To</p>
                                            <div className='shadow-bg p-4 mt-2 flex items-center justify-between'>
                                                <div className='flex items-center gap-2'>
                                                    <i className="uil uil-university sm:text-5xl text-2xl gradient-text"></i>
                                                    <div>
                                                        <p>{bank?.bankName} Bank Account</p>
                                                        <p>************{bank?.accountNo?.slice(-4)}</p>
                                                    </div>
                                                </div>
                                                <Link to='/change-bank' className='sm:text-4xl gradient-text text-2xl'>
                                                    <i className="uil uil-pen"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        {
                                            amount && 
                                            <div className='mt-10 flex flex-col gap-1 '>
                                                {/* <div className='flex items-center gap-4'>
                                                    <p className='font-medium w-[150px]'>Service Charges : </p>
                                                    <span>
                                                        {settings?.platformFee + '%' + " = " + ((amount/100) * settings?.platformFee).toFixed(2) + ' PKR'}
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <p className='font-medium w-[150px]'>You Recieved : </p>
                                                    <span>
                                                        { (amount - ((amount/100) * settings?.platformFee)) + ' PKR'}
                                                    </span>
                                                </div> */}
                                                <p className='text-red-500'><b>NOTE:</b> According to the policy , service charges will be applicable on every withdrawal</p>
                                            </div>
                                        }
                                        <div className='mt-10 '
                                        >
                                            <button 
                                            className='btn-primary py-2.5 px-12'
                                            disabled={loading}
                                            >
                                                {
                                                    loading 
                                                    ? 
                                                        <ClipLoader size={20} color='white' />
                                                    : 
                                                        'Withdraw'
                                                }
                                            </button>
                                        </div>
                                    </form>
                                : 
                                    <div className='mt-12 flex flex-col items-center justify-center'>
                                        
                                        <Link to='/add-bank?withdraw=true'>
                                            <button className="btn-primary py-2 px-12">
                                                Add Withdraw Details
                                            </button>
                                        </Link>
                                        <div className='text-primary pt-6'>
                                            <b>NOTE : </b>
                                            You haven't added your withdraw details. Please add your withdraw details to continue.
                                        </div>
                                    </div>
                            }
                        </div>

                }
                
            </div>
        </Layout>
    )
}

export default Withdraw