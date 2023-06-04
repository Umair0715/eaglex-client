import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import RequestStatus from 'components/global/RequestStatus'
import { baseURL } from 'config/api'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import fetcher from 'utils/fetcher'

const WithdrawRequestDetails = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const [item , setItem] = useState(null);

    const { isLoading , data } = useQuery(['fetch-withdraw-details' , id] , () => {
        return fetcher(`/withdraw/${id}` , user);
    });

    useEffect(() => {
        if ( data ) {
            setItem(data?.data?.data?.doc);
        } 
    }, [data]);

    console.log({ item })

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Withdraw Details' showIcon={false} />
                    <BackBtn />
                </div>
                {
                    isLoading 
                    ? 
                        <Loader />
                    : 
                        <div className='mt-6'>
                            <div className='shadow-bg p-4'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Withdraw Amount</h6>
                                        <p className='text-primary'>
                                            {item?.withdrawAmount}
                                        </p>
                                    </div>
                                    
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Date</h6>
                                        <p className='text-primary'>
                                            {moment(item?.createdAt).format('DD MMM YYYY hh:mm a')}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Bank Name</h6>
                                        <p className='text-primary'>
                                            {item?.bankDetails?.bankName}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Account Holder</h6>
                                        <p className='text-primary'>
                                            {item?.bankDetails?.accountHolder}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Account Number</h6>
                                        <p className='text-primary'>
                                            {item?.bankDetails?.accountNo}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>
                                            Withdraw Id
                                        </h6>
                                        <p className='text-primary'>
                                            {item?._id}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Status</h6>
                                        <div>
                                            <RequestStatus status={item?.status} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Description</h6>
                                        <p className='text-dark'>
                                            {item?.description}
                                        </p>
                                    </div>


                                </div>
                                {
                                    item?.proof &&
                                    <div className='mt-6 '>
                                        <h3 className='font-medium sm:text-lg text-sm text-dark'>Receipt</h3>
                                        <div className='flex items-center justify-center mt-4'>
                                            <img 
                                            src={baseURL + item?.proof} 
                                            alt="Receipt" 
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                }
            </div>
        </Layout>
    )
}

export default WithdrawRequestDetails