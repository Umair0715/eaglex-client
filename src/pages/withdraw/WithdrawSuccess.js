import Layout from 'components/global/Layout'
import WithdrawSuccessImg from 'assets/images/withdrawSuccess.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const WithdrawSuccess = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    return (
        <Layout>
            <div className='shadow-bg p-4 py-8 rounded-lg'>
                <div className='flex items-center justify-center'>
                    <img 
                    src={WithdrawSuccessImg}
                    alt="" 
                    />
                </div>
                <div className='mt-8'>
                    <h1 className='sm:text-5xl text-2xl font-bold gradient-text text-center'>Withdraw Successfull</h1>
                    <p className='text-center mt-4 text-dark'>
                        We transfer funds immediately. In some cases, it may take 24-48 hours if any issues arise.                        
                    </p>
                    <div className='mt-6 flex items-center justify-center'>
                        <Link to='/dashboard' className="btn-primary py-2 px-12">
                            Go To Dashboard
                        </Link>
                    </div>
                </div>
                
            </div>
        </Layout>
    )
}

export default WithdrawSuccess