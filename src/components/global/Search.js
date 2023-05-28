import React from 'react'

const Search = () => {
    return (
        <div className='flex items-center gap-4 border border-grayText rounded-full sm:py-2 py-1.5 px-4 '>
            <i className="uil uil-search text-grayText"></i>
            <input 
            type="text" 
            placeholder='Search...' 
            className='outline-none border-none'
            />
        </div>
    )
}

export default Search