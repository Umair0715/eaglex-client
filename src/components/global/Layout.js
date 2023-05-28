import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import BottomNav from './bottomNav'

const Layout = ({ children , showNav = false , home = false}) => {
    return (
        <div className='relative'>
            <Sidebar />
            <Header />
            <div className='space'>
                <div className={` ${home ? '' : 'sm:px-8 px-4'} py-6 ${showNav && !home ? 'pb-28' : 'pb-12'}`}>
                    {children}
                </div>
            </div>
            {
                showNav && 
                <div className='md:hidden block fixed bottom-0 left-0 w-full bg-pure border-t border-t-primary'>
                    <BottomNav />
                </div>
            }
        </div>
    )
}

export default Layout