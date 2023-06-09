import React from 'react'

const ItemNotFound = ({ message = 'No item found.'}) => {
    return (
        <div className='w-full h-[200px] rounded-md border flex items-center mt-8 justify-center text-2xl font-semibold'>
            {message}
        </div>
    )
}

export default ItemNotFound