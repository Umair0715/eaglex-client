import Tesla from 'assets/images/tesla.png';
import Google from 'assets/images/google.png';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from 'config/api';
import shortNumberFormat from 'utils/ShortNumberFormat';


const Offers = ({ offers }) => {
    const navigate = useNavigate();
    
    return (
        <div>
            
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4'>
                {
                    offers?.sort((a,b) => a?.timePeriod - b?.timePeriod)?.map((item,i) => (
                        <div key={i} className={`shadow-bg-2 p-3 rounded-lg  cursor-pointer
                        `}
                        onClick={() => {
                            if(item?.isActive) {
                                navigate(`/offers/details/${item?._id}`)
                            }
                        }}
                        title={`${!item?.isActive ? 'This offer is not active for making invest.' : 'Click to invest'}`}
                        >
                            <div className='flex sm:items-center justify-between '>
                                <div className='flex sm:flex-row flex-col sm:items-center items-start w-fit gap-4 flex-[0.6] '
                                
                                >
                                    <div className='bg-slate-200 sm:p-4 p-2 rounded-md'>
                                        <img 
                                        src={baseURL + item?.company?.logo} 
                                        alt={item?.name}
                                        className='w-[50px] h-[50px] object-contain '
                                        />
                                    </div>
                                    <div >
                                        <h6 className='sm:text-lg font-semibold'>
                                            {item?.company?.name}
                                        </h6>
                                        <p className='sm:text-sm text-[13px] pt-1 pb-1.5'>
                                            {item?.name} / {item?.timePeriod} {item?.timePeriod === 1 ? 'day' : 'days'}</p>
                                        <h5 className='font-semibold'>
                                            {item?.depositRange[0] + "-" + item?.depositRange[1]} RS
                                        </h5>
                                    </div>
                                </div>
                                <div className='flex flex-col sm:justify-start justify-between flex-[0.40]'>
                                    <div className='sm:text-xl text-lg font-semibold gradient-text text-right sm:mt-0 mt-4'>
                                        {item?.profit}% /
                                        <span className='text-base'> Per Day</span>
                                    </div>
                                    <div className='mt-2 flex items-end justify-end'>
                                        {
                                            item?.isActive
                                            ?
                                                <button  
                                                className="btn-primary py-1.5 text-sm px-4"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    navigate(`/offers/invest/${item?._id}`)
                                                }}
                                                >
                                                    Invest Now
                                                </button>
                                            : 
                                                <button 
                                                className='btn-red px-4 py-1.5 text-sm flex items-center gap-2'
                                                disabled
                                                >
                                                    <i className="uil uil-padlock"></i>
                                                    <span>Locked</span>
                                                </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                item?.description?.length > 0 ||  item?.investCount > 0 
                                ?
                                <div className='mt-3 border-t pt-2'>
                                    {
                                        item?.description?.length > 0 && 
                                        <div className='mb-2 text-sm text-red-500 font-medium'>
                                            {item?.description}
                                        </div>
                                    }
                                    {
                                        item?.investCount > 0 &&
                                        <div className='text-xs text-primary'>
                                            {shortNumberFormat(item?.investCount)} People Invested
                                        </div>
                                    }
                                </div>
                                : ''
                            }
                            
                        </div>
                    ))
                }
            </div>
            {/* <div className='mt-8 flex items-center justify-center'>
                <Link to='/offers' className="btn-primary py-2 px-12">View All</Link>
            </div> */}
        </div>
    )
}

export default Offers