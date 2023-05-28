import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const EarningStats = ({ heading = 'Active Offer Stats' }) => {
    const user  = { activePackage : null }
    const [remainingLimit , setRemainingLimit] = useState(0);
    const [maxLimit , setMaxLimit] = useState(0);

    useEffect(() => {
        if(user?.activePackage){
            const maxLimit = user?.activePackage?.depositAmount * user?.activePackage?.package?.maximumProfitLimit;
    
            const remLimit = maxLimit - user?.activePackageProfit;
            setRemainingLimit(remLimit.toFixed(2));
            setMaxLimit(maxLimit)
        }
    }, [user])

    return (
        <div>
            <div className="shadow-bg rounded-lg py-4 sm:px-8 px-4 mb-4 mt-2">
                <div className='flex items-center justify-around gap-12 flex-wrap'>
                    <div className='flex items-center flex-col gap-2 text-dark'>
                        <h3 className='text-lg font-semibold'>Earned Profit</h3>
                        <div className='w-[120px] h-[120px] rounded-full bg-black  border-[8px] border-primary '>
                            <div className='w-full h-full bg-white rounded-full flex items-center justify-center text-dark font-semibold text-xl'>
                                {/* ${user?.totalProfit?.toFixed(2) || '0.00'} */}
                                1500
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center flex-col gap-2 text-dark'>
                        <h3 className='text-lg font-semibold'>Maximum Profit</h3>
                        <div className='w-[120px] h-[120px] rounded-full bg-black  border-[8px] border-primary'>
                            <div className='w-full h-full bg-white rounded-full flex items-center justify-center text-dark font-semibold text-xl'>
                                {/* ${(user?.activePackage?.depositAmount * user?.activePackage?.package?.maximumProfitLimit) || '0.00'} */}
                                3000
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center flex-col gap-2 text-dark'>
                        <h3 className='text-lg font-semibold'>Remaining Profit</h3>
                        <div className='w-[120px] h-[120px] rounded-full bg-black relative p-2'
                        style={{
                            background: `radial-gradient(closest-side, white 79%, transparent 50% 100%), conic-gradient(#28B446 50%, black 0)`
                            // background: `radial-gradient(closest-side, white 79%, transparent 50% 100%), conic-gradient(green ${((user?.totalProfit / maxLimit) * 100)}%, black 0)`
                        }}
                        >   
                            {/* <div className={`absolute top-0 left-0 h-full bg-yellow-500 rounded-full`}
                            styl
                            ></div> */}
                            <div className='w-full h-full bg-white rounded-full flex items-center justify-center text-dark font-semibold relative z-10 text-xl'>
                                {/* ${remainingLimit || '0.00'} */}
                                1500

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarningStats