import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
// import OffersList from 'components/offers/OffersList'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux';
import OffersList from 'components/dashboard/Offers';
import fetcher from 'utils/fetcher'
import Loader from 'components/global/Loader'
import ItemNotFound from 'components/global/ItemNotFound'


const Offers = () => {
    const [offers , setOffers] = useState([]);

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { isLoading , data } = useQuery('all-offers' , () => fetcher('/offer' , user));

    useEffect(() => {
        window.scrollTo(0,0)
    },[]);

    useEffect(() => {
        if (data) {
            setOffers(data?.data?.data?.docs);
        }
    }, [data]);

    return (
        <Layout showNav={true}>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='All Offers' icon='clipboard-alt' />
                    <BackBtn />
                </div>
                <div className='mt-6'>
                    {
                        isLoading
                        ? 
                            <Loader />
                        : 
                        offers?.length > 0 
                        ?
                            <OffersList offers={offers} />
                        : 
                            <ItemNotFound />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Offers