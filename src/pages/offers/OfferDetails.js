import BackBtn from 'components/global/BackBtn'
import Layout from 'components/global/Layout'
import React, { useEffect, useState } from 'react';
import Tesla from 'assets/images/tesla.png';
import Company from 'assets/images/company.jpg';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import Loader from 'components/global/Loader';
import { baseURL } from 'config/api';

const OfferDetails = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const [offer , setOffer] = useState('');

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


    return (
        <Layout>
            {
                isLoading
                ? 
                    <Loader />
                : 
                    <div>
                        <BackBtn />
                        <div className='w-full h-[250px] rounded-lg relative mt-4 px-4'
                        style={{
                            backgroundImage : `url(${Company}`,
                            backgroundSize : 'cover' ,
                            backgroundPosition : 'top 20%  center'
                        }}
                        >
                            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-lg'></div>
                            <div className='relative z-10 flex flex-col gap-4 items-center justify-center h-full'>
                                <div className='bg-slate-200 flex items-center justify-center rounded-full sm:w-[100px] w-[80px] sm:h-[100px] h-[80px]'>
                                    <img 
                                    src={baseURL + offer?.company?.logo} 
                                    alt={offer?.company?.name}
                                    className='object-contain sm:w-[80px] w-[60px] sm:h-[80px] h-[60px] rounded-full'
                                    />
                                </div>
                                <div className='text-white'>
                                    <h1 className='gradient-text text-[24px] sm:text-4xl font-semibold capitalize text-center sm:mb-2 mb-1'>{offer?.company?.name}</h1>
                                    <p className='text-gray-100 text-center sm:text-base text-[13px]'>Paskistan's Leading Company</p>
                                </div>
                            </div>

                        </div>
                        <div className='mt-6 '>
                            <h3 className='text-xl font-medium'>Details</h3>
                            <div className='shadow-bg p-3 mt-2'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Company Name</h6>
                                        <p className='text-primary text-right'>
                                            {offer?.company?.name}
                                        </p>
                                    </div>
                                    
                                    {/* <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Registration Id</h6>
                                        <p className='text-primary'>
                                            {offer?.company?.registrationId}
                                        </p>
                                    </div> */}
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Location</h6>
                                        <p className='text-primary text-right'>
                                            {offer?.company?.location}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Annual Turnover</h6>
                                        <p className='text-primary'>
                                            {offer?.company?.annualTurnover}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Since</h6>
                                        <p className='text-primary'>
                                            {offer?.company?.since}
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>CEO</h6>
                                        <p className='text-primary'>
                                            {offer?.company?.owner}
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-2 pb-4 sm:text-base text-sm'>
                                        <h6 className='font-medium'>Description</h6>
                                        <p className='text-dark sm:text-left text-justify'>
                                            {offer?.company?.description}
                                        </p>
                                    </div>
                                </div>
                                <div className='my-6 w-fit'>
                                    {
                                        offer?.isActive 
                                        ? 
                                        <Link to={`/offers/invest/${offer?._id}`} className="btn-primary py-2 px-12">
                                            Invest Now
                                        </Link>
                                        : 
                                        <button
                                        className="btn-red py-2 flex items-center gap-2 px-12"
                                        disabled
                                        >
                                            <i className="uil uil-padlock"></i>
                                            <span>Locked</span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Layout>
    )
}

export default OfferDetails