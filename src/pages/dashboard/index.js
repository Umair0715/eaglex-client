import Layout from 'components/global/Layout'
import Bg from 'assets/images/homeBg.jpg';
import Cards from 'components/dashboard/Cards';
import EarningStats from 'components/dashboard/EarningStats';
import Offers from 'components/dashboard/Offers';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import { setUser } from 'redux/reducers/authReducer';
import { HashLoader } from 'react-spinners';
import ItemNotFound from 'components/global/ItemNotFound';

const Dashboard = () => {
    const [offers , setOffers] = useState([]);

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const { isLoading , data } = useQuery('dashboard-details' , () => fetcher('/user/dashboard-details' , user));

    useEffect(() => {
        window.scrollTo(0,0)
    },[]);

    useEffect(() => {
        if (data) {
            dispatch(setUser({...data?.data?.data?.user , token : user?.token}));
            localStorage.setItem('user' , JSON.stringify({...data?.data?.data?.user , token : user?.token }));
            setOffers(data?.data?.data?.offers);
        }
    }, [data]);


    return (
        <Layout showNav={true} home>
            <div className='border border-primary mt-4 pb-16 rounded-tr-[30px] rounded-tl-[30px] sm:px-8 px-4'>
                <div className='flex items-center justify-center text-center py-6 flex-col'>
                    <div className='w-[80px] h-[3px] bg-primary mb-4'></div>
                    <div>
                        <p>Total Balance</p>
                        <h1 className='mt-2 mb-6 gradient-text text-3xl font-semibold'>PKR : {user?.wallet?.totalBalance}</h1>
                        <div className='flex items-center justify-center gap-8'>
                            <Link to='/deposit' className='cursor-pointer'>
                                <div className='gradient-text text-2xl border border-primary rounded-full w-[50px] h-[50px] flex items-center justify-center mx-auto'>
                                    <i className="uil uil-plus"></i>
                                </div>
                                <p className='text-sm mt-2'>Deposit</p>
                            </Link>
                            <Link to='/withdraw' className='cursor-pointer'>
                                <div className='gradient-text text-2xl border border-primary rounded-full w-[50px] h-[50px] flex items-center justify-center mx-auto'>
                                    <i className="uil uil-apps"></i>
                                </div>
                                <p className='text-sm mt-2'>Withdraw</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <div className='flex items-center justify-between'>
                        <h2 className="text-dark font-semibold text-xl">
                            Investment Offers
                        </h2>
                        <Link to='/offers' className='underline text-primary'>
                            All Offers 
                        </Link>
                    </div>
                    {
                        isLoading 
                        ? 
                            <div className='flex items-center justify-center py-20'>
                                <HashLoader size={25} color='green'/>
                            </div>
                        : 
                        offers?.length > 0 
                        ? 
                            <div className='mt-6'>
                                <Offers offers={offers}/>
                            </div>
                        : 
                            <ItemNotFound />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard