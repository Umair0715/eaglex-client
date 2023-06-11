import BackBtn from 'components/global/BackBtn';
import Heading from 'components/global/Heading';
import ItemNotFound from 'components/global/ItemNotFound';
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader';
import InvestList from 'components/invests/InvestList';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import fetcher from 'utils/fetcher';

const filters = [
    
    {
        id : 1 ,
        value : 'running' ,
        label : 'In Progress'
    } ,
    {
        id : 2 ,
        value : 'completed' ,
        label : 'Completed'
    } ,
    {
        id : 3 ,
        value : 'claimed' ,
        label : 'Claimed'
    } ,  
    
]

const Invests = () => {
    const [activeFilter , setActiveFilter] = useState(filters[0]);

    const [status , setStatus] = useState('running');
    const [invests , setInvests] = useState([]);
    const { user } = useSelector(state => state.auth);

    const querykey = ['fetch-invests' , status]
    const { isLoading , data } = useQuery(querykey , () => fetcher(`/invest/my?status=${status}` , user));
    
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
            <div className='flex items-center justify-between gap-4'>
                <Heading title='Invest' icon='clipboard-alt' />
                <BackBtn />
            </div>
            <div className='mt-10'>
                <div className='flex items-center justify-between'>
                    {
                        filters?.map(item => (
                            <div className={`flex-1 cursor-pointer border-b-2 text-center pb-3 sm:text-base text-[13px]
                            ${item.id === activeFilter.id ? 'border-b-primary' : ""}
                            `}
                            onClick={() => {
                                setActiveFilter(item);
                                setStatus(item.value)
                            }}
                            >
                                {item?.label}
                            </div>
                        ))
                    }
                </div>
                <div className='mt-10'>
                    {
                        isLoading 
                        ? 
                            <Loader />
                        : 
                        invests?.length > 0 
                        ? 
                            <InvestList 
                            invests={invests}
                            status={status}
                            />
                        : 
                            <ItemNotFound />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Invests