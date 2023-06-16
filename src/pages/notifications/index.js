import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux';
import fetcher from 'utils/fetcher'
import Loader from 'components/global/Loader'
import ItemNotFound from 'components/global/ItemNotFound'
import { HashLoader } from 'react-spinners'
import Axios from 'config/api'
import toastError from 'utils/toastError';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment'
import { useNotificationContext } from 'context/NotificationContext'


const Notifications = () => {
    const { setNotificationsCount } = useNotificationContext();
    const [notifications , setNotifications] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState(1);
    const [docsCount , setDocsCount] = useState(0);
    const [loading , setLoading] = useState(false);

    const { user } = useSelector(state => state.auth);

    // const { isLoading , data } = useQuery('fetch-notifications' , () => fetcher('/notification' , user));

    useEffect(() => {
        setNotificationsCount(0);
        window.scrollTo(0,0);
        fetchData(1);
    },[]);

    // useEffect(() => {
    //     if (data) {
    //         setNotifications(data?.data?.data?.docs);
    //         setCurrentPage(data?.data?.data?.page);
    //         setPages(data?.data?.data?.pages);
    //     }
    // }, [data]);

    const fetchData = async (newPage) => {
        try {
            if(newPage === 1) setLoading(true);
            const { data : { data : { docs , page , pages , docCount } } } = await Axios(`/notification?page=${newPage}`);
            setNotifications(prev => [...prev , ...docs]);
            setCurrentPage(page);
            setPages(pages);
            setDocsCount(docCount);
            if(page === pages) {
                setHasMore(false);
            } else {
                setHasMore(true)
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);            
        }
    }

    return (
        <Layout showNav={true}>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Notifications' showIcon={false} />
                    <BackBtn />
                </div>
                <div className='mt-6'>
                    {
                        loading
                        ? 
                            <Loader />
                        : 
                        notifications?.length > 0 
                        ?
                            <InfiniteScroll
                            dataLength={docsCount}
                            next={() => {
                                setCurrentPage(prev => prev+1);
                                fetchData(currentPage+1)
                            }}
                            hasMore={hasMore}
                            loader={<div className='flex items-center justify-center'><HashLoader size={20} /></div>}
                            className='flex flex-col gap-4 w-full h-full pb-10'
                            >
                                {
                                    notifications?.map((item) => (
                                        <div className='shadow-bg p-3 rounded-md'>
                                            <div className='flex sm:items-center justify-between sm:flex-row flex-col'>
                                                <h3 className='text-xl gradient-text font-semibold'>
                                                    {item?.title}
                                                </h3>
                                                <p className='sm:text-sm text-xs text-gray-400'>
                                                    {moment(item?.createdAt).format('DD MMM YYYY hh:mm a')}
                                                </p>
                                            </div>
                                            <p className='text-gray-500 text-sm mt-2'>
                                                {item?.description}
                                            </p>
                                        </div>
                                    ))
                                }
                            </InfiniteScroll>
                        : 
                            <ItemNotFound />
                    }
                </div>
            </div>
            
        </Layout>
    )
}

export default Notifications