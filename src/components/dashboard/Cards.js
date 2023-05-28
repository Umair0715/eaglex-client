import { Link } from 'react-router-dom';
import EarningImg from 'assets/images/earning.png';
import ScreensImg from 'assets/images/screens.png';
import BookingsImg from 'assets/images/bookings.png';
import CategoryImg from 'assets/images/cat.png';

const Cards = () => {
    return (
        <div>
            <div className='grid  lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
                <div className='rounded-[2rem]  shadow-bg text-dark flex py-4 px-6 relative'>
                    <div className='flex-1 flex flex-col justify-between'>
                        <p className='text-lg font-semibold'>Total Earned</p>
                        <h3 className='text-3xl font-semibold'>25k</h3>
                        <Link to='/earnings' className='underline text-sm'>
                            View Details   
                        </Link>           
                    </div>
                    <div className='flex-1'>
                        <img 
                        src={EarningImg} 
                        alt="Total Earnings"
                        className='w-full h-full object-cover' 
                        />
                    </div>
                </div>
               
                <div className='shadow-bg text-dark flex py-4 px-6 relative'>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                        <p className='text-lg font-semibold'>Total Balance</p>
                        <h3 className='text-3xl font-semibold'>15k</h3>
                        <button className='btn-primary py-1.5 px-4 w-fit'>
                            Withdraw
                        </button>       
                    </div>
                    <div className='flex-1 flex items-end justify-end'>
                        <img 
                        src={BookingsImg} 
                        alt="Total Earnings"
                        className='w-[100px] h-full object-cover' 
                        />
                    </div>
                </div>
                <div className='text-dark shadow-bg flex py-4 px-6 relative'>
                    
                    <div className='flex-1 flex flex-col justify-between'>
                        <p className='text-lg font-semibold'>Total Deposit</p>
                        <h3 className='text-3xl font-semibold'>40K</h3>
                        <Link to='/' className='underline text-sm'>
                            View Details    
                        </Link>           
                    </div>
                    <div className='flex-1 flex items-end justify-end'>
                        <img 
                        src={CategoryImg} 
                        alt="Total Categories"
                        className='w-[100px] h-full object-cover' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards