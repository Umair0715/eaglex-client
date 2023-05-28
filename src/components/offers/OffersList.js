import Tesla from 'assets/images/tesla.png';
import Google from 'assets/images/google.png';
import { Link, useNavigate } from 'react-router-dom';

const OffersList = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4'>
                {
                    [...Array(12).keys()].map((item,i) => (
                        <div key={i} className='shadow-bg-2 p-3 rounded-lg flex sm:items-center justify-between cursor-pointer'
                        onClick={() => navigate('/offers/details/55')}
                        >
                            <div className='flex sm:flex-row flex-col sm:items-center items-start w-fit gap-4'>
                                <div className='bg-slate-200 sm:p-4 p-2 rounded-md'>
                                    <img 
                                    src={Tesla} 
                                    alt="tesla"
                                    className=''
                                    />
                                </div>
                                <div >
                                    <h6 className='text-lg font-semibold'>Tesla</h6>
                                    <p className='text-sm pt-1 pb-1.5'>April Offer / 4 days</p>
                                    <h5 className='font-semibold'>10,000-100,000 RS</h5>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-between'>
                                <div className='text-xl font-semibold gradient-text text-right flex-1 sm:mt-0 mt-4'>
                                    7% / Day
                                </div>
                                <div className='mt-2'>
                                    <button 
                                    className="btn-primary py-1.5 text-sm px-4"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/offers/invest/85')
                                    } }
                                    >
                                        Invest Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OffersList