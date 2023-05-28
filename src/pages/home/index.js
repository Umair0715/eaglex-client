import Navbar from 'components/global/navbar';
import HomeBg from 'assets/images/homeBg.jpg';
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='h-screen' style={{
            backgroundImage : `url(${HomeBg})` ,
            backgroundSize : 'cover' ,
            backgroundPosition : 'center'
        }}>
            <div>
                <Navbar />
            </div>
            <div className='relative px-2' style={{
                height : 'calc(100vh - 90px)'
            }}>
                <div className="absolute top-0 left-0  w-full h-[101.7%] bg-black bg-opacity-50"></div>
                <div className='relative z-10 text-white flex flex-col gap-8 text-center justify-center w-full h-full '>
                        <h1 className='lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-bold '>
                            WELCOME TO EAGLE<span className='gradient-text'>X</span>
                        </h1>
                        <p>
                            Innovator of education and technology for retail traders and investors
                        </p>
                        <div className='flex items-center justify-center gap-6'>
                            <Link to='/login' className='btn-primary flex items-center justify-center py-2 sm:w-[120px] w-[100px]'>
                                Login
                            </Link>
                            <Link to='/register' className='btn-primary py-2 flex items-center justify-center sm:w-[120px] w-[100px]'>
                                Register
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Home