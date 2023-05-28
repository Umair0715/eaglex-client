import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import ProgressList from 'components/progress/ProgressList'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import fetcher from 'utils/fetcher'

const Progress = () => {
    const [invests , setInvests] = useState([]);
    const { user } = useSelector(state => state.auth);

    const { isLoading , data } = useQuery('fetch-progress' , () => fetcher(`/invest/my-progress` , user));
    
    useEffect(() => {
        window.scrollTo(0,0)
    },[]);

    useEffect(() => {
        if(data) {
            setInvests(data?.data?.data?.docs);
        }
    }, [data]);

    return (
        <Layout showNav={true}>
            <div>
                <div className='flex items-center justify-between'>
                    <Heading title='Your progress' icon='accessible-icon-alt' />
                    <BackBtn />
                </div>
                <div className='mt-6'>
                    {
                        isLoading 
                        ? 
                            <Loader />
                        : 
                        invests?.length > 0 
                        ? 
                            <ProgressList invests={invests} />
                        : 
                            <ItemNotFound />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Progress