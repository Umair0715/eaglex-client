import Layout from 'components/global/Layout'
import gift from 'assets/images/gift.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BackBtn from 'components/global/BackBtn';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import CopySvg from 'assets/svgs/CopySvg';
import CopySuccessSvg from 'assets/svgs/CopySuccessSvg';

const Invite = () => {
    const { user } = useSelector(state => state.auth);
    const url = window.location.origin + `/register?ref_code=${user?.referralCode}`;
    const [copied , setCopied] = useState(false);

    const copyToClipboard = () => {
        copy(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000)
        toast.success('Referral Link Copied.' , {
            autoClose : 1000
        })
    }

    useEffect(() => {
        window.scrollTo(0,0);
    },[]);

    return (
        <Layout>
            <BackBtn />
            <div className='shadow-bg p-4 py-8 pt-4  mt-4 rounded-lg'>
                <div className='flex items-center justify-center mt-4'>
                    <img 
                    src={gift}
                    alt="" 
                    />
                </div>
                <div className='mt-4'>
                    <h1 className='sm:text-5xl text-2xl font-bold gradient-text text-center'>
                        Invite a Friend
                    </h1>
                    <p className='text-center mt-4 text-dark'>
                        Invite friend with your invitation code and earn                       
                    </p>
                    <div className='mt-8'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold flex items-center gap-2 text-gray-700'>
                                <span>
                                    Your Referral Code
                                </span>
                                <div 
                                onClick={copyToClipboard} className='cursor-pointer'
                                title='Copy Your referral link'
                                >
                                    {copied ? <CopySuccessSvg /> : <CopySvg />}
                                </div>
                            </label>
                            <input 
                            type="text" 
                            className="input" 
                            value={url}
                            />
                        </div>
                    </div>
                </div>
                
            </div>
        </Layout>
    )
}

export default Invite