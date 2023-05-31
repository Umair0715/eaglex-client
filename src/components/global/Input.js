import React from 'react'

const Input = ({ 
    label , type = 'text' , placeholder , value = '' , setValue='' , optional , ...props
}) => {
    return (
        <div className='flex flex-col gap-1.5 flex-1 w-full'>
            <label className='font-semibold text-dark '>
                {label} {optional && <span className='text-gray-400 font-medium text-sm'>(Optional)</span>}
            </label>
            <input 
            type={type}
            placeholder={placeholder}
            className='input w-full'
            value={value}
            onChange={e => setValue(e.target.value)}
            {...props}
            />
        </div>
    )
}

export default Input