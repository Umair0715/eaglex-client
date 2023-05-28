import BackBtn from 'components/global/BackBtn';
import Heading from 'components/global/Heading';
import Input from 'components/global/Input';
import Layout from 'components/global/Layout';
import Axios from 'config/api';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import toastError from 'utils/toastError';


const AddBank = () => {
    const [bankName , setBankName] = useState('');
    const [accountHolder , setAccountHolder] = useState('');
    const [accountNo , setAccountNo] = useState('');
    const [loading , setLoading] = useState(false);

    const { user } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            const bankData = { bankName , accountHolder , accountNo }
            const { data : { data : { message } } } = await Axios.post('/bank' , bankData , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            toast.success(message);
            if(searchParams.get('withdraw')){
                navigate('/withdraw')
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-2'>
                    <Heading 
                    title='Withdraw Details' 
                    icon='university' 
                    />
                    <BackBtn />
                </div>
                <div className='shadow-bg p-4 mt-4'>
                    <div>
                        <form 
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}
                        >
                            <div className='flex items-center sm:flex-row flex-col gap-4'>
                                <Input
                                label='Bank Name'
                                placeholder='Enter Bank Name'
                                value={bankName}
                                setValue={setBankName}
                                />
                                <Input
                                label='Account Holder Name'
                                placeholder='Enter account holder Name'
                                value={accountHolder}
                                setValue={setAccountHolder}
                                />
                            </div>
                            <div>
                                <Input
                                label='Account Number'
                                placeholder='Enter your Account Number'
                                value={accountNo}
                                setValue={setAccountNo}
                                />
                            </div>
                            <div className='w-fit my-4'>
                                <button
                                className="btn-primary py-2 px-12"
                                disabled={loading}
                                >
                                    {
                                        loading 
                                        ? 
                                            <ClipLoader size={20} color='white' />
                                        : 
                                            'ADD'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default AddBank