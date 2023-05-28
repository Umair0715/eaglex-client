import EarningStats from 'components/dashboard/EarningStats'
import Axios from 'config/api'
import moment from 'moment'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const ProgressList = ({ invests }) => {
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);

    const { user } = useSelector(state => state.auth);

    const claimProfitHandler = async (id) => {
        if(window.confirm('Are you sure? You want to claim your profit?')){
            try {
                setLoading(true);
                const { data : { data : { message , doc } } } = await Axios.get(`/invest/claim/${id}` , {
                    headers : {
                        Authorization : `Bearer ${user?.token}`
                    }
                });
                toast.success(message);
                navigate('/dashboard');
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error(error);
            }
        }
    }


    return (
        <div className='flex flex-col gap-8'>
            {
                invests?.map((item,i) => (
                    <div className='shadow-bg p-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Profit Return</h6>
                                <p className='text-primary'>{item?.offerProfit}%</p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Return Profit in amount</h6>
                                <p className='text-primary'>
                                    {item?.returnProfitAmount}
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Company Name</h6>
                                <p className='text-primary'>
                                    {item?.offer?.company?.name}
                                </p>
                            </div>
                            
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Invested Amount</h6>
                                <p className='text-primary'>
                                    {item?.amount}
                                </p>
                            </div>
                            
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Progress</h6>
                                <p className='text-primary'>{item?.progress}%</p>
                            </div>
                            
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Start Date</h6>
                                <p className='text-primary'>
                                    {moment(item?.startDate).format('DD MMM YYYY')}
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>End Date</h6>
                                <p className='text-primary'>
                                    {moment(item?.endDate).format('DD MMM YYYY')}
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Status</h6>
                                <p className='text-primary'>
                                    {item?.status}
                                </p>
                            </div>
                            <div>
                                {
                                    item?.status === 'running'
                                    ? 
                                        <button className='bg-gray-400 py-2 px-8 rounded-full text-white disabled:cursor-not-allowed'
                                        disabled>
                                            In Progress
                                        </button>
                                    : 
                                        <button 
                                        className="btn-primary py-2 px-10"
                                        title='Click to claim your profit'
                                        onClick={() => claimProfitHandler(item?._id)}
                                        disabled={loading}
                                        >
                                            {
                                                loading 
                                                ? 
                                                    <ClipLoader size={20} color='white' />
                                                : 
                                                    'Received'
                                            }
                                        </button>    
                                }
                                
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProgressList

