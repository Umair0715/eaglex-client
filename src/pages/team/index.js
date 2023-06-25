import Cards from 'components/dashboard/Cards'
import BackBtn from 'components/global/BackBtn'
import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import TeamTable from 'components/team/TeamTable'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import fetcher from 'utils/fetcher'

const Team = () => {
    const { user } = useSelector(state => state.auth);
    const [teamDetails , setTeamDetails] = useState('');
    const [level , setLevel] = useState(0);

    const queryKey = [`fetch-team-details` , level]
    const { isLoading , data } = useQuery(queryKey , () => {
        return fetcher(`/user/my-team-details?level=${level}` , user);
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
            <div className='sm:text-base text-[13px]'>
                {
                    isLoading
                    ? 
                        <Loader />
                    :
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
                                <div className='pb-4 px-3'>
                                    <hr />
                                </div>
                                <div className='text-primary flex items-center justify-between sm:px-4 px-3 pb-3 border-b font-semibold'>
                                    <h6 className=''>
                                        Total Team Deposit
                                    </h6>
                                    <span className='text-primary'>{teamDetails?.totalTeamDeposit} PKR</span>
                                </div>
                                <div className='flex flex-col gap-2 border-b pt-3'>
                                    <div className='text-dark flex items-center justify-between  sm:px-4 px-3 pb-3'>
                                        <h6 className='font-medium'>
                                            Level One Deposit
                                        </h6>
                                        <span className='text-primary'>{teamDetails?.levelOneMembersDeposit?.toFixed(1)} PKR</span>
                                    </div>
                                    <div className='text-dark flex items-center justify-between  sm:px-4 px-3 pb-3'>
                                        <h6 className='font-medium'>
                                            Level One Commission
                                        </h6>
                                        <span className='text-primary'> 4.1% = {teamDetails?.levelOneCommissionAmount} PKR</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 border-b pt-3'>
                                    <div className='text-dark flex items-center justify-between  sm:px-4 px-3 pb-3'>
                                        <h6 className='font-medium'>
                                            Level Two Deposit
                                        </h6>
                                        <span className='text-primary'>{teamDetails?.levelTwoMembersDeposit?.toFixed(1)} PKR</span>
                                    </div>
                                    <div className='text-dark flex items-center justify-between  sm:px-4 px-3 pb-3 '>
                                        <h6 className='font-medium'>
                                            Level Two Commission
                                        </h6>
                                        <span className='text-primary'> 3.1% = {teamDetails?.levelTwoCommissionAmount} PKR</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 border-b pt-3'>
                                    <div className='text-dark flex items-center justify-between  sm:px-4 px-3 pb-3'>
                                        <h6 className='font-medium'>
                                            Level Three Deposit
                                        </h6>
                                        <span className='text-primary'>{teamDetails?.levelThreeMembersDeposit?.toFixed(1)} PKR</span>
                                    </div>
                                    <div className='text-dark flex items-center justify-between sm:px-4 px-3 pb-3 '>
                                        <h6 className='font-medium'>
                                            Level Three Commission
                                        </h6>
                                        <span className='text-primary'>2.1 % = {teamDetails?.levelThreeCommissionAmount} PKR
                                        </span>
                                    </div>
                                </div>
                                <div className='text-primary flex items-center justify-between pt-3 sm:px-4 px-3 pb-3 border-b font-semibold'>
                                    <h6 className=''>
                                        Total Team Commission
                                    </h6>
                                    <span className='text-primary'>{teamDetails?.totalTeamCommissionAmount} PKR</span>
                                </div>

                                <div className='pt-3 sm:px-4 px-3 pb-3 border-b'>
                                    <div className='text-primary flex items-center justify-between  font-semibold'>
                                        <h6 className=''>
                                            Extra Commission
                                        </h6>
                                        <span className='text-primary'>
                                            {user?.extraCommission || 0} PKR
                                        </span>
                                    </div>
                                    <div className='text-sm mt-2'><b>NOTE :</b> You will get 2% extra commission on every 100k team deposit (upto 3 levels)</div>
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
                                                {(teamDetails?.levelOneCommission * teamDetails?.levelOneMembers)?.toFixed(1)} %    
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
                                            {(teamDetails?.levelTwoCommission * teamDetails?.levelTwoMembers)?.toFixed(1)} %
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
                                            {(teamDetails?.levelThreeMembers * teamDetails?.levelThreeCommission)?.toFixed(1)} %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 shadow-bg '>
                                <div className='flex items-center justify-between sm:flex-row flex-col gap-4  px-4 py-4'>
                                    <h3 className='text-lg font-semibold'>Team Members</h3>
                                    <div className=' flex justify-end'>
                                        <select 
                                        className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full'
                                        onChange={(e) => setLevel(e.target.value)}
                                        value={level}
                                        >
                                            <option value={0}>All Levels</option>
                                            <option value={1}>Level 1</option>
                                            <option value={2}>Level 2</option>
                                            <option value={3}>Level 3</option>
                                        </select>
                                    </div>
                                </div>
                                <TeamTable 
                                teamMembers={teamDetails?.teamMembers}
                                level={level}
                                setLevel={setLevel} 
                                />
                            </div>
                        </div>
                }
            </div>
        </Layout>
    )
}

export default Team