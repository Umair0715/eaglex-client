import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import React from 'react'

const WithdrawRequestDetails = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Withdraw Details' showIcon={false} />
                    <BackBtn />
                </div>
                <div className='mt-6'>
                    <div className='shadow-bg p-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Withdraw Amount</h6>
                                <p className='text-primary'>10,000</p>
                            </div>
                            
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Date</h6>
                                <p className='text-primary'>10 Feb 2023</p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Bank Name</h6>
                                <p className='text-primary'>JazzCash</p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Account Holder</h6>
                                <p className='text-primary'>
                                    John Doe
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Account Number</h6>
                                <p className='text-primary'>
                                    12928392839
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Transaction Id</h6>
                                <p className='text-primary'>
                                    938498498344
                                </p>
                            </div>
                            <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Status</h6>
                                <p className='text-primary text-green-500'>
                                    completed
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 border-b pb-4 sm:text-base text-sm'>
                                <h6 className='font-medium'>Description</h6>
                                <p className='text-dark'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam facilis commodi nemo autem accusamus consequuntur ab repudiandae necessitatibus expedita odit.
                                </p>
                            </div>


                        </div>
                        <div className='mt-6 '>
                            <h3 className='font-medium sm:text-lg text-sm text-dark'>Receipt</h3>
                            <div className='flex items-center justify-center mt-4'>
                                <img 
                                src='https://png.pngtree.com/png-vector/20190303/ourmid/pngtree-coconut-milk-shampoo-receipt-printed-png-image_736459.jpg' 
                                alt="Receipt" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default WithdrawRequestDetails