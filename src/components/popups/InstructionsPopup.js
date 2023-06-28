import { useEffect, useRef, useState } from 'react';
import './styles.css';
import useClickOutside from 'utils/clickOutside';
import { useQuery } from 'react-query';
import Axios from 'config/api';
import { HashLoader } from 'react-spinners';


const InstructionsPopup = ({ setShowInstructionsPopup }) => {
    const popupRef = useRef(null);
    const [settings , setSettings] = useState('');
    const { isLoading , data } = useQuery('fetch-settings' , () => Axios('/setting'));

    useEffect(() => {
        setSettings(data?.data?.data?.doc);
    }, [data])

    useClickOutside(popupRef , () => setShowInstructionsPopup(false))

    console.log({ settings })
    return (
        <div className='fixed top-0 left-0 w-full min-h-screen py-10 px-4 flex items-center justify-center bg-black bg-opacity-50 z-[9999]'>
            <div className='popup bg-white sm:w-[600px] w-full sm:p-4 p-4 rounded-lg relative'>
                <div 
                ref={popupRef}
                className='absolute top-1 right-3 text-2xl cursor-pointer'
                onClick={() => setShowInstructionsPopup(false)}
                >
                    <i className="uil uil-times"></i>
                </div>
                <center>
                    <h1 className='text-2xl urdu-font font-bold text-primary '> 
                        ضروری ہدایات    
                    </h1>
                    {/* <p className='text-sm text-grayText'>Please fill your detail to access your account.</p> */}
                </center>
                {
                    isLoading
                    ?
                        <div className='w-full h-[200px] flex items-center justify-center'>
                            <HashLoader size={20} />
                        </div>
                    : 
                        <ol className="text-right urdu-font font-medium mt-10 flex flex-col gap-5">
                            <li className='flex flex-row-reverse gap-2 text-sm leading-[2]'>
                                <span>(1</span>
                                <span className="">
                                رقم نکالنے کی درخواست دینے کا ٹائم صبح دس بجے سے لے کر شام پانچ بجے تک ہے۔
                                </span>
                            </li>
                            <li className='flex flex-row-reverse gap-2 text-sm leading-[2]'>
                                <span>(2</span>
                                <span className="">
                                آپکے بنک اکاؤنٹ میں رقم چوبیس سے اڑتالیس گھنٹے تک پہنچے گی اگر اس دوران نا پہنچے تو ایڈمنز سے رابطہ کریں۔
                                </span>
                            </li>
                            <li className='flex flex-row-reverse gap-2 text-sm'>
                                <span>(3</span>
                                <span className="">
                                کم سے کم رقم {settings?.minWithdraw} نکالی جا سکتی ہے اس سے کم نہیں۔
                                </span>
                            </li>
                            <li className='flex flex-row-reverse gap-2 text-sm'>
                                <span>(4</span>
                                <span className="">
                                رقم نکالنے پر ٪{settings?.platformFee} سروس چارجز لاگو ہوں گے۔
                                </span>
                            </li>
                            <li className='flex flex-row-reverse gap-2 text-sm leading-[2]'>
                                <span>(5</span>
                                <span className="">
                                ایگل ایکس کو زیادہ لوگوں تک پہنچانے والے صارفین کو ٪{settings?.extraCommission} اضافی بونس دیا جائے گا۔
                                </span>
                            </li>
                            <li className='flex flex-row-reverse gap-2 text-sm leading-[2]'>
                                <span>(6</span>
                                <span className="">
                                اگر آپ ہمارے برانڈ ایمبیسڈر بننا چاہتے ہیں تو واٹس ایپ پر رابطہ کریں۔
                                </span>
                            </li>
                        </ol>
                }
                
                <center>
                    <h3 className='mt-10 pb-4 text-xl font-sembold text-primary urdu-font'>
                        شکریہ
                    </h3>
                </center>
            </div>
        </div>
    )
}

export default InstructionsPopup