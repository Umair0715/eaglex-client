import Tesla from 'assets/images/tesla.png';
import Google from 'assets/images/google.png';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from 'config/api';


const Offers = ({ offers }) => {
    const navigate = useNavigate();
    
    return (
        <div>
            
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4'>
                {
                    offers?.map((item,i) => (
                        <div key={i} className='shadow-bg-2 p-3 rounded-lg flex sm:items-center justify-between cursor-pointer'
                        onClick={() => {
                            navigate(`/offers/details/${item?._id}`)
                        }}
                        >
                            <div className='flex sm:flex-row flex-col sm:items-center items-start w-fit gap-4  '
                            
                            >
                                <div className='bg-slate-200 sm:p-4 p-2 rounded-md'>
                                    <img 
                                    src={baseURL + item?.company?.logo} 
                                    alt={item?.name}
                                    className='w-[50px] h-[50px] object-contain '
                                    />
                                </div>
                                <div >
                                    <h6 className='text-lg font-semibold'>
                                        {item?.company?.name}
                                    </h6>
                                    <p className='text-sm pt-1 pb-1.5'>
                                        {item?.name} / {item?.timePeriod} days</p>
                                    <h5 className='font-semibold'>
                                        {item?.depositRange[0] + "-" + item?.depositRange[1]} RS
                                    </h5>
                                </div>
                            </div>
                            <div className='flex flex-col sm:justify-start justify-between'>
                                <div className='text-xl font-semibold gradient-text text-right sm:mt-0 mt-4'>
                                    {item?.profit}% / Day
                                </div>
                                <div className='mt-2'>
                                    <button  
                                    className="btn-primary py-1.5 text-sm px-4"
                                    onClick={e => {
                                        e.stopPropagation();
                                        navigate(`/offers/invest/${item?._id}`)
                                    }}
                                    >
                                        Invest Now
                                    </button>
                                </div>
                            </div>
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