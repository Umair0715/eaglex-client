import WhiteLogo from 'assets/svgs/whiteLogo.svg'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='bg-gradient py-4 px-12 text-center text-pure h-[80px]'>
            <Link to='/' className='text-3xl font-semibold flex items-center justify-center'>
                <img src={WhiteLogo} alt="" className='-translate-y-9 w-[210px]'/>
            </Link>
            
        </nav>
    )
}

export default Navbar