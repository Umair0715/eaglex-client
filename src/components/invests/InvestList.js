import EarningStats from 'components/dashboard/EarningStats'
import moment from 'moment/moment'
import React from 'react'

const InvestList = ({ invests }) => {

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
                                <p className='text-primary'>{item?.progress?.toFixed(2)}%</p>
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
                            <div className='flex items-center justify-between pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium text-xl'>Status</h6>
                                <p className='text-primary border border-primary py-2 px-3 rounded-lg'>
                                    {item?.status}
                                </p>
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default InvestList