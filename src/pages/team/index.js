import Cards from 'components/dashboard/Cards'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import TeamTable from 'components/team/TeamTable'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import fetcher from 'utils/fetcher'

const Team = () => {
    const { user } = useSelector(state => state.auth);
    const [teamDetails , setTeamDetails] = useState('');

    const { isLoading , data } = useQuery('fetch-team-details' , () => {
        return fetcher('/user/my-team-details' , user);
    })

    useEffect(() => {
        if (data) {
            setTeamDetails(data?.data?.data);
        }
    } , [data]);


    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <Layout showNav={true}>
            <div className='sm:text-base text-sm'>
                <div>
                    <div className='shadow-bg ' style={{ borderRadius : '20px'}}>
                        <div className='bg-black sm:py-4 py-2.5 text-white text-lg font-semibold text-center rounded-tr-[20px] rounded-tl-[20px]'>
                            My Team Details
                        </div>
                        <div className='flex items-center justify-between text-dark sm:px-4 px-3 py-4'>
                            <div className='flex flex-col gap-1 '>
                                <h6 className='font-medium'>Total People</h6>
                                <span className='text-primary'>
                                    {teamDetails?.totalTeamMembers}
                                </span>
                            </div>
                            <div className='flex flex-col gap-1 text-right'>
                                <h6 className='font-medium'>Total Investment</h6>
                                <span className='text-primary'>{teamDetails?.totalInvestAmount} PKR</span>
                            </div>
                        </div>
                    </div>
                    <div className='shadow-bg mt-6 sm:px-4 px-3 py-4 flex flex-col gap-4' style={{ borderRadius : '20px'}}>
                        <div>
                            <div className='flex items-center justify-between text-dark '>
                                <div className='flex flex-col gap-1 '>
                                    <h6 className='font-medium'>Level</h6>
                                    <span className='text-primary'>1</span>
                                </div>
                                <div className='flex flex-col gap-1 text-right'>
                                    <h6 className='font-medium'>Commission</h6>
                                    <span className='text-primary'>
                                        {teamDetails?.levelOneCommission}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between text-dark '>
                                <div className='flex flex-col gap-1 '>
                                    <h6 className='font-medium'>Total People</h6>
                                    <span className='text-primary'>
                                        {teamDetails?.levelOneMembers}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-1 text-right'>
                                    <h6 className='font-medium'>Commission</h6>
                                    <span className='text-primary'>
                                        {teamDetails?.levelOneCommission * teamDetails?.levelOneMembers} %    
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='shadow-bg mt-6 sm:px-4 px-3 py-4 flex flex-col gap-4' style={{ borderRadius : '20px'}}>
                        <div>
                            <div className='flex items-center justify-between text-dark '>
                                <div className='flex flex-col gap-1 '>
                                    <h6 className='font-medium'>Level</h6>
                                    <span className='text-primary'>2</span>
                                </div>
                                <div className='flex flex-col gap-1 text-right'>
                                    <h6 className='font-medium'>Commission</h6>
                                    <span className='text-primary'>
                                        {teamDetails?.levelTwoCommission}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between text-dark '>
                                <div className='flex flex-col gap-1 '>
                                    <h6 className='font-medium'>Total People</h6>
                                    <span className='text-primary'>
                                        {teamDetails?.levelTwoMembers}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-1 text-right'>
                                    <h6 className='font-medium'>Commission</h6>
                                    <span className='text-primary'>
                                       {teamDetails?.levelTwoCommission * teamDetails?.levelTwoMembers} %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='shadow-bg mt-6 sm:px-4 px-3 py-4 flex flex-col gap-4' style={{ borderRadius : '20px'}}>
                        <div>
                            <div className='flex items-center justify-between text-dark '>
                                <div className='flex flex-col gap-1 '>
                                    <h6 className='font-medium'>Level</h6>
                                    <span className='text-primary'>3</span>
                                </div>
                                <div className='flex flex-col gap-1 text-right'>
                                    <h6 className='font-medium'>Commission</h6>
                                    <span className='text-primary'>
                                       {teamDetails?.levelThreeCommission} %
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between text-dark '>
                                <div className='flex flex-col gap-1 '>
                                    <h6 className='font-medium'>Total People</h6>
                                    <span className='text-primary'>
                                        {teamDetails?.levelThreeMembers}
                                    </span>
                                </div>
                                <div className='flex flex-col gap-1 text-right'>
                                    <h6 className='font-medium'>Commission</h6>
                                    <span className='text-primary'>
                                       {teamDetails?.levelThreeMembers * teamDetails?.levelThreeCommission} %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Team