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

const DepositDetails = () => {
    const { user } = useSelector(state => state.auth);
    const { id } = useParams();

    const [item ,setItem] = useState('');

    const { isLoading , data } = useQuery('fetch-deposit-detail' , () => fetcher(`/deposit/${id}` , user));

    useEffect(() => {
        if (data) {
            setItem(data?.data?.data?.doc);
        }
    }, [data])


    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Deposit Details' showIcon={false} />
                    <BackBtn />
                </div>
                {
                    isLoading
                    ? 
                        <Loader />
                    : 
                        <>
                            <div className='mt-6'>
                                <div className='shadow-bg p-4'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Deposit Amount</h6>
                                            <p className='text-primary'>{item?.amount}</p>
                                        </div>
                                        {
                                            item?.bonusAmount > 0 
                                            && 
                                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                                <h6 className='font-medium'>
                                                    Bonus Amount
                                                </h6>
                                                <p className='text-primary'>
                                                    {item?.bonusAmount}
                                                </p>
                                            </div>
                                        }
                                        {
                                        item?.status === 'approved' &&
                                        <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Added Amount</h6>
                                            <p className='text-primary'>
                                                {item?.transferAmount}
                                            </p>
                                        </div>
                                    }
                                        
                                        <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Date</h6>
                                            <p className='text-primary'>
                                                {moment(item?.createdAt).format('DD MMM YYYY hh:mm a')}
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Bank Name</h6>
                                            <p className='text-primary'>
                                                {item?.bankName}
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Account Holder</h6>
                                            <p className='text-primary'>
                                                {item?.accountHolder}
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Account Number</h6>
                                            <p className='text-primary'>
                                                {item?.accountNo}
                                            </p>
                                        </div>
                                        {/* <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Transaction Id</h6>
                                            <p className='text-primary'>
                                                938498498344
                                            </p>
                                        </div> */}
                                        <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Status</h6>
                                            <RequestStatus status={item?.status} />
                                        </div>
                                        {
                                            item?.description && <div className='flex flex-col gap-2 border-b pb-4 sm:text-base text-sm'>
                                            <h6 className='font-medium'>Description</h6>
                                            <p className='text-dark'>
                                                {item?.description}
                                            </p>
                                        </div>
                                        }


                                    </div>
                                    <div className='mt-6 '>
                                        <h3 className='font-medium sm:text-lg text-sm text-dark'>Receipt</h3>
                                        <div className='flex items-center justify-center mt-4'>
                                            <img 
                                            src={baseURL + item?.proof} 
                                            alt="Receipt"
                                            className='w-[300px]'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </Layout>
    )
}

export default DepositDetails;


// const receiptImg = 'https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-coconut-milk-shampoo-receipt-printed-png-image_736459.jpg'