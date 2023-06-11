import EarningStats from 'components/dashboard/EarningStats'
import Axios from 'config/api'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import toastError from 'utils/toastError'

const InvestList = ({ invests }) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const [loading , setLoading] = useState(false);

    const claimProfitHandler = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure? You want to claim your profit?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            setLoading(true);
                            const { data : { data : { message } } } = await Axios.get(`/invest/claim/${id}` , {
                                headers : {
                                    Authorization : `Bearer ${user?.token}`
                                }
                            });
                            toast.success(message);
                            navigate('/dashboard');
                            setLoading(false);
                        } catch (error) {
                            setLoading(false);
                            toastError(error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => ''
                }
            ]
        });
    }

    // const claimProfitHandler = async (id) => {
    //     if(window.confirm('Are you sure? You want to claim your profit?')){
    //         try {
    //             setLoading(true);
    //             const { data : { data : { message } } } = await Axios.get(`/invest/claim/${id}` , {
    //                 headers : {
    //                     Authorization : `Bearer ${user?.token}`
    //                 }
    //             });
    //             toast.success(message);
    //             navigate('/dashboard');
    //             setLoading(false);
    //         } catch (error) {
    //             setLoading(false);
    //             toastError(error);
    //         }
    //     }
    // }

    return (
        <div className='flex flex-col gap-8'>
            {
                invests?.map((item,i) => (
                    <div className='shadow-bg p-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Daily Profit</h6>
                                <p className='text-primary'>{item?.offerProfit}%</p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Total Profit in %</h6>
                                <p className='text-primary'>{item?.totalProfit?.toFixed(1)}%</p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Total Profit in Amount</h6>
                                <p className='text-primary'>{item?.returnProfitAmount?.toFixed(2)}</p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Invest + Profit  </h6>
                                <p className='text-primary'>
                                    {item?.totalProfitReturnInAmount?.toFixed(2)}
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Offer Name</h6>
                                <p className='text-primary'>
                                    {item?.offer?.name}
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
                                <h6 className='font-medium'>Time Period</h6>
                                <p className='text-primary'>
                                    {item?.offer?.timePeriod} Day
                                </p>
                            </div>
                            
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Progress</h6>
                                <p className='text-primary'>{item?.progress?.toFixed(2)}%</p>
                            </div>
                            
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Start Date</h6>
                                <p className='text-primary'>
                                    {moment(item?.startDate).format('DD MMM YYYY hh:mm a')}
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>End Date</h6>
                                <p className='text-primary'>
                                    {moment(item?.endDate).format('DD MMM YYYY hh:mm a')}
                                </p>
                            </div>
                            <div className='flex items-center justify-between pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium text-xl'>Status</h6>
                                {
                                    item?.status === 'completed'
                                    ? 
                                        <button 
                                        className='btn-primary py-2 px-10 '
                                        disabled={loading}
                                        onClick={() => claimProfitHandler(item?._id)}
                                        >
                                            {
                                                loading 
                                                ? 
                                                    <ClipLoader size={20} />
                                                : 
                                                    'Claim Profit'
                                                
                                            }
                                        </button>
                                    :
                                        <p className='border rounded-md border-primary py-2 px-6 text-primary capitalize'>{item?.status}</p>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
            {/* <div className='flex items-center justify-center'>
                <button 
                className='btn-primary py-2 px-8'
                // disabled={loadMoreLoding}
                >
                    Load More
                </button>
            </div> */}
        </div>
    )
}

export default InvestList