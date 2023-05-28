import Layout from 'components/global/Layout'
import Coins from 'assets/images/coins.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const DepositSuccess = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    return (
        <Layout>
            <div className='shadow-bg p-4 py-8 rounded-lg'>
                <div className='flex items-center justify-center'>
                    <img 
                    src={Coins}
                    alt="" 
                    />
                </div>
                <div className='mt-8'>
                    <h1 className='sm:text-5xl text-2xl font-bold gradient-text text-center'>Deposit Successful</h1>
                    <p className='text-center mt-4 text-dark'>
                        Amount will be sended to your wallet once we complete the confirmation process.
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

export default DepositSuccess