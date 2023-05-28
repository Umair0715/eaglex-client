import DepositsTable from 'components/deposits/DepositsTable'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import React from 'react'

const Depsoits = () => {
    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between'>
                    <Heading title='Deposit History' icon='clipboard-alt' />
                    <BackBtn />
                </div>
                <div className='mt-6'>
                    <DepositsTable />
                </div>  
            </div>
        </Layout>
    )
}

export default Depsoits