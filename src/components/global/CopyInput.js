import CopySuccessSvg from 'assets/svgs/CopySuccessSvg';
import CopySvg from 'assets/svgs/CopySvg';
import { useState, useRef } from 'react';

const CopyInput = ({ value , label }) => {
    const inputRef = useRef(null);
    const [copied , setCopied] = useState('');

    const handleCopy = () => {
        inputRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000)
    };

    return (
        <div className='flex flex-col gap-1.5 flex-1 w-full'>
            {
                label && 
                <label className='font-semibold text-dark '>
                    {label}
                </label>
            }
            <div className='relative'>
                <input
                    ref={inputRef}
                    type="text"
                    className='copy-input'
                    value={value}
                    readOnly
                />
                <div className='absolute sm:right-3 right-2 top-[55%] -translate-y-1/2 '>
                    {
                        copied 
                        ? 
                        <button>
                            <CopySuccessSvg />
                        </button>
                        : 
                        <button onClick={handleCopy}>
                            <CopySvg />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default CopyInput;
