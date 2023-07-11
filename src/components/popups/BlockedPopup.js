import { useEffect, useRef, useState } from 'react';
import './styles.css';
import useClickOutside from 'utils/clickOutside';
import { setShowBlockedPopup } from 'redux/reducers/authReducer';
import BlockImg from 'assets/images/block-svgrepo-com.png'
import { useDispatch } from 'react-redux';


const BlockedPopup = () => {
    const dispatch = useDispatch();
    const popupRef = useRef(null);
    

    useClickOutside(popupRef , () => dispatch(setShowBlockedPopup(false)))

    // console.log({ settings })
    return (
        <div className='fixed top-0 left-0 w-full min-h-screen py-10 px-4 flex items-center justify-center bg-black bg-opacity-50 z-[9999]'>
            <div
            ref={popupRef} 
            className='popup bg-white sm:w-[600px] w-full sm:p-4 p-4 rounded-lg relative'>
                <div 
                className='absolute top-1 right-3 text-2xl cursor-pointer'
                onClick={() => dispatch(setShowBlockedPopup(false))}
                >
                    <i className="uil uil-times"></i>
                </div>
                <center>
                    <img src={BlockImg} alt="" className='sm:w-[100px] w-[70px] sm:h-[100px] h-[70px]' />
                    <h3 className='sm:text-2xl text-xl font-semibold mt-1'>Your Account is Blocked</h3>
                </center>
                <div className='mt-4'>
                    <p className='text-sm text-center font-medium text-dark'>Your account has been blocked due to a violation of our policies and rules. Please contact our support team for further assistance.</p>
                    <div className='mt-6 flex items-center justify-center'>
                        <button 
                        className="btn-primary py-1.5 px-8"
                        onClick={() => dispatch(setShowBlockedPopup(false))}
                        >
                            Ok
                        </button>
                    </div>
                </div>
                
                <center>
                    
                </center>
            </div>
        </div>
    )
}

export default BlockedPopup