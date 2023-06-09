import BackBtn from 'components/global/BackBtn';
import Heading from 'components/global/Heading';
import Input from 'components/global/Input';
import Layout from 'components/global/Layout';
import Loader from 'components/global/Loader';
import SelectBox from 'components/global/SelectBox';
import Axios from 'config/api';
import banks from 'data/banks';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import fetcher from 'utils/fetcher';
import toastError from 'utils/toastError';


const ChangeBank = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { user } = useSelector(state => state.auth);

    const [bank , setBank] = useState('');
    const [loading , setLoading] = useState(false);
   

    const { isLoading , data } = useQuery('fetch-bank' , () => {
        return fetcher('/bank/my' , user);
    });

    useEffect(() => {
        if (data) {
            setBank(data?.data?.data?.doc);
        }
    }, [data]);


    const [bankName , setBankName] = useState('');
    const [accountHolder , setAccountHolder] = useState('');
    const [accountNo , setAccountNo] = useState('');
    const [otherBank , setOtherBank] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            const bankData = { 
                newBankName : bankName === 'Other' ? otherBank : bankName , 
                newBankAccountHolder : accountHolder , 
                newBankAccountNo : accountNo ,
            }
            const { data : { data : { message , doc } } } = await Axios.put(`/bank/change/${bank?._id}` , bankData , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            toast.success(message);
            setBankName('');
            setAccountHolder('');
            setAccountNo('');
            setBank(doc);
            if(searchParams.get('withdraw')){
                navigate('/withdraw' , { replace : true })
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }

    // **** prev ****  //
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         const bankData = { 
    //             newBankName : bankName === 'Other' ? otherBank : bankName , 
    //             newBankAccountHolder : accountHolder , 
    //             newBankAccountNo : accountNo ,
    //             prevBankDetails : bank?._id 
    //         }
    //         const { data : { data : { message } } } = await Axios.post('/change-bank' , bankData , {
    //             headers : {
    //                 Authorization : `Bearer ${user?.token}`
    //             }
    //         });
    //         toast.success(message);
    //         setBankName('');
    //         setAccountHolder('');
    //         setAccountNo('');
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         toastError(error);
    //     }
    // }

    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-2'>
                    <Heading 
                    title='Update Bank Details' 
                    showIcon={false} 
                    />
                    <BackBtn />
                </div>
                <div className='shadow-bg p-4 mt-4'>
                    {
                        isLoading 
                        ? 
                            <Loader />
                        : 
                        bank 
                        ? 
                            <div>
                                <form 
                                className='flex flex-col gap-4'
                                onSubmit={handleSubmit}
                                >
                                    <div className='flex items-center sm:flex-row flex-col gap-4'>
                                        <SelectBox
                                        label='Bank Name'
                                        options={banks?.map(item => (
                                            { label : item?.bank_name  , value : item?.bank_name }
                                        ))}
                                        value={bankName}
                                        setValue={setBankName}
                                        required
                                        />
                                        {
                                            bankName === 'Other'
                                            && 
                                            <Input
                                            label='Other Bank Name'
                                            placeholder='Ex : Habib Bank Limited'
                                            value={otherBank}
                                            setValue={setOtherBank}
                                            required
                                            />
                                            
                                        }
                                        <Input
                                        label='Account Holder Name'
                                        placeholder='Enter account holder Name'
                                        value={accountHolder}
                                        setValue={setAccountHolder}
                                        required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                        label='Account Number'
                                        placeholder='Enter your Account Number'
                                        value={accountNo}
                                        setValue={setAccountNo}
                                        required
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
                                                    'Submit'
                                            }
                                        </button>
                                    </div>
                                </form>
                                {/* <div className='text-primary mt-4'>
                                    <b>NOTE : </b>
                                    Your account details replaced with these details once admin approve this change request. Please make sure to enter correct account details.
                                </div> */}
                            </div>
                        : 
                        <div className=' py-8 flex flex-col items-center justify-center'>
                            <Link to='/add-bank'>
                                <button className="btn-primary py-2 px-12">
                                    Add Bank 
                                </button>
                            </Link>
                            <div className='text-primary pt-6'>
                                <b>NOTE : </b>
                                You haven't added your Bank details. Please first add your bank details. Please make sure to add correct account. when you create withdraw request the amount will be sended to this account.
                            </div>
                        </div>
                    }
                </div>

                {
                    bank && 
                    <div className='mt-8 shadow-bg p-4'>
                        <Heading title='Your current Account Details' showIcon={false} />
                        <div className='flex flex-col gap-1 mt-4'>
                            <div className='flex items-center gap-2'>
                                <h3 className='w-[150px] font-semibold'>
                                    Bank Name : 
                                </h3>
                                <p className='text-primary'>{bank?.bankName}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <h3 className='w-[150px] font-semibold'>
                                    Account Holder : 
                                </h3>
                                <p className='text-primary'>{bank?.accountHolder}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <h3 className='w-[150px] font-semibold'>
                                    Account No : 
                                </h3>
                                <p className='text-primary'>{bank?.accountNo}</p>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </Layout>
    )
}

export default ChangeBank