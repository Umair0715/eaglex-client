import BackBtn from 'components/global/BackBtn'
import Layout from 'components/global/Layout'
import React, { useEffect, useState } from 'react';
import Tesla from 'assets/images/tesla.png';
import Company from 'assets/images/company.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from 'components/global/Input';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import Axios, { baseURL } from 'config/api';
import Loader from 'components/global/Loader';
import ItemNotFound from 'components/global/ItemNotFound';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';
import { ClipLoader } from 'react-spinners';

const InvestNow = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const [offer , setOffer] = useState('');
    const [loading , setLoading] = useState(false);

    const [amount , setAmount] = useState('');

    const { isLoading , data } = useQuery('offer-details' , () => {
        return fetcher(`/offer/${id}` , user)
    });

    useEffect(() => {
        window.scrollTo(0,0);
    },[]);

    useEffect(() => {
        if(data) {
            setOffer(data?.data?.data?.doc)
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure you want to invest in ${offer?.name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setLoading(true);
                        const investData = { offer : id , amount }
                        try {
                            const { data : { data : { doc , message } } } = await Axios.post('/invest' , investData , {
                                headers : {
                                    Authorization : `Bearer ${user?.token}`
                                }
                            });
                            toast.success(message);
                            navigate('/invests');
                            setLoading(false);
                        } catch (error) {
                            setLoading(false);
                            toastError(error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => ''
                }
            ]
        });

    }
    console.log({ offer })
    return (
        <Layout>
            {
                isLoading 
                ? 
                    <Loader />
                : 
                offer 
                ? 
                    <div>
                        <BackBtn />
                        <div className='w-full h-[250px] rounded-lg relative mt-4'
                        style={{
                            backgroundImage : `url(${Company}`,
                            backgroundSize : 'cover' ,
                            backgroundPosition : 'top 20%  center'
                        }}
                        >
                            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-lg'></div>
                            <div className='relative z-10 flex flex-col gap-4 items-center justify-center h-full'>
                                <div className='bg-slate-200 flex items-center justify-center rounded-full w-[100px] h-[100px]'>
                                    <img 
                                    src={baseURL + offer?.image} 
                                    alt={offer?.name} 
                                    className='object-contain w-[80px] h-[80px] rounded-full'
                                    />
                                </div>
                                <div className='text-white'>
                                    <h1 className='gradient-text text-4xl font-semibold text-center mb-2'>{offer?.name}</h1>
                                    <p className='text-gray-100 text-center'>Time Period : {offer?.timePeriod} Days</p>
                                </div>
                            </div>

                        </div>
                        <div className='mt-6 '>
                            <div className='shadow-bg p-4 rounded-lg flex items-center justify-between'>
                                <h3 className='text-lg font-semibold text-dark'>
                                    Available Balance
                                </h3>
                                <p className='text-2xl font-bold gradient-text'>
                                    {user?.wallet?.totalBalance}
                                </p>
                            </div>
                            
                        </div>
                        <form 
                        className='mt-6'
                        onSubmit={handleSubmit}
                        >
                            <div className='shadow-bg p-4 rounded-lg'>
                                <Input
                                type='number'
                                label='Amount'
                                placeholder='Enter amount you want to invest'
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                />
                                {
                                    amount && 
                                    <div className='mt-6 flex flex-col gap-2'>
                                        <div className='flex items-center'>
                                            <p className='w-[120px] font-medium'>Offer Profit : </p>
                                            <span>
                                                {offer?.profit + '%' + ' = ' + ((Number(amount)/100) * offer?.profit).toFixed(2) + " PKR"}
                                            </span>
                                        </div>
                                        <div className='flex items-center'>
                                            <p className='w-[120px] font-medium'>Return Profit : </p>
                                            <span>
                                                {(((Number(amount)/100) * offer?.profit) + Number(amount)).toFixed(2) + ' PKR'}
                                            </span>
                                        </div>
                                    </div>
                                }
                                <div className='mt-6'>
                                    <button 
                                    className="btn-primary py-2 px-12"
                                    disabled={!amount || loading}
                                    >
                                        {loading ? <ClipLoader size={20} color='white' /> : 'Done'}
                                    </button>
                                </div>
                                <div className='flex items-center mt-8 sm:text-base text-sm'>
                                    
                                    <p><span className='font-semibold'>NOTE : </span> &nbsp; Amount range should be between {offer?.depositRange[0] + "-" + offer?.depositRange[1]}
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                : 
                    <ItemNotFound />
            }
        </Layout>
    )
}

export default InvestNow