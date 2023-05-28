import BackBtn from 'components/global/BackBtn'
import FileInput from 'components/global/FileInput'
import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Layout from 'components/global/Layout'
import Loader from 'components/global/Loader'
import Axios from 'config/api'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import fetcher from 'utils/fetcher'
import toastError from 'utils/toastError'

const Deposit = () => {
    const { user } = useSelector(state => state.auth);

    const [settings , setSettings] = useState();
    const [bankName , setBankName] = useState('');
    const [accountHolder , setAccountHolder] = useState('');
    const [accountNo , setAccountNo] = useState('');
    const [amount , setAmount] = useState('');
    const [proof , setProof] = useState('');
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();

    const { isLoading , data } = useQuery('fetch-settings' , () => fetcher(`/setting` , user)); 

    useEffect(() => {
        if (data) {
            setSettings(data?.data?.data?.doc);
        }
    } ,[data]);

    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const depositData = { bankName , accountHolder , accountNo , amount ,proof };
            const { data : { data : { message } } } = await Axios.post('/deposit' , depositData , {
                headers : {
                    Authorization : `Bearer ${user?.token}`
                }
            });
            setLoading(false);
            navigate('/deposit/success');
        } catch (error) {
            setLoading(false);
            toastError(error);
        }
    }


    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-2'>
                    <Heading title='Bank Details' showIcon={false} />
                    <BackBtn />
                </div>
                <div className='shadow-bg p-4 mt-4'>
                    {
                        isLoading 
                        ? 
                            <Loader />
                        : 
                        <div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center sm:flex-row flex-col gap-4'>
                                    <Input
                                    label='Bank Name'
                                    placeholder='EagleX Bank Name'
                                    value={settings?.bankName}
                                    readOnly
                                    />
                                    <Input
                                    label='Account Holder Name'
                                    placeholder='EagleX Acc holder Name'
                                    value={settings?.accountHolder}
                                    readOnly
                                    />
                                </div>
                                <div>
                                    <Input
                                    label='Account Number'
                                    placeholder='EagleX Account Number'
                                    value={settings?.accountNo}
                                    readOnly
                                    />
                                </div>
                            </div>
                            <div className='mt-6 text-primary text-sm leading-[1.5]'>
                                <b>NOTE : </b> Send amount (You want to deposit) to the above mentioned account. And upload the payment proof below. The amount will be added to your wallet once admin verify the transaction.
                            </div>
                        </div>
                    }
                </div>

                <div className='mt-6'>
                    <Heading title='Payment Proof' showIcon={false} />
                    <div className='shadow-bg p-4 mt-4'>
                        <div>
                            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                                <div className='flex items-center sm:flex-row flex-col gap-4'>
                                    <Input
                                    label='Bank Name'
                                    placeholder='Enter bank name'
                                    value={bankName}
                                    setValue={setBankName}
                                    required
                                    />
                                    <Input
                                    label='Account Holder'
                                    placeholder='Enter account holder name'
                                    value={accountHolder}
                                    setValue={setAccountHolder}
                                    required
                                    />
                                </div>
                                <div className='flex items-center sm:flex-row flex-col gap-4'>
                                    <Input
                                    label='Account Number'
                                    placeholder='Enter Account Number'
                                    value={accountNo}
                                    setValue={setAccountNo}
                                    required
                                    />
                                    <Input
                                    type='number'
                                    label='Amount'
                                    placeholder='Enter Amount'
                                    value={amount}
                                    setValue={setAmount}
                                    required
                                    />
                                </div>
                                <div>
                                    <FileInput
                                    label='Receipt Image'
                                    value={proof}
                                    setValue={setProof}
                                    height='auto'
                                    required
                                    />
                                </div>
                                <div className='my-4'>
                                    <button className="btn-primary py-2 px-12">
                                        {
                                            loading 
                                            ? 
                                                <ClipLoader size={20} color='white' />
                                            : 
                                                'Deposit'
                                        }
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Deposit