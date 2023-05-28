import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import WithdrawRequestsTable from 'components/withdrawRequests/WithdrawRequestsTable'
import React from 'react'

const WithdrawRequests = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Withdraw Requests' icon='bill' />
                    <BackBtn />
                </div>
                <div className='mt-6'>
                    <WithdrawRequestsTable />
                </div>
            </div>
        </Layout>
    )
}

export default WithdrawRequests