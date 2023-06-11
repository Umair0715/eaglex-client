import React from 'react'

const AboutLink = ({ color , hoverColor}) => {
    return (
        <div>
            <div className='absolute sm:bottom-4 bottom-2 sm:right-4 right-2 '>
                <a 
                href="https://information.eaglexgroup.com" 
                target='_blank'
                className={`underline cursor-pointer ${color} ${hoverColor} sm:text-[15px] text-sm`}
                >
                    Read More About Eaglex
                </a>
            </div>
        </div>
    )
}

export default AboutLink