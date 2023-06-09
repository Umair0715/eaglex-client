import './styles.css';
import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDrawerContext } from 'context/DrawerContext';
import useClickOutside from 'utils/clickOutside';
// import Logo from 'assets/images/main-logo.png';
import Logo from 'assets/svgs/mainLogo.svg';
import Bg from 'assets/images/homeBg.jpg';
import { logout } from 'redux/actions/authActions';
import { useDispatch } from 'react-redux';
import ApkFile from 'assets/eaglexgroup.apk';


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sidebarRef = useRef();
    const location = useLocation();
    const { showDrawer , setShowDrawer } = useDrawerContext();
    const [showOrderDropMenu , setShowOrderDropMenu] = useState(false)
    const [showCatDropMenu , setShowCatDropMenu] = useState(false);

    useClickOutside(sidebarRef , () => setShowDrawer(false))

    const isActive = (path , home) => {
        if (home) return location.pathname === '/' ;
        return location.pathname.split('/').includes(path);
    }

   

    return (
        <div 
        className='sidebar'
        >
            {
                showDrawer && 
                <div className='fixed top-0 left-0 bg-gray-900 w-full h-screen bg-opacity-30 opacity-1 duration-300 z-10'>
                </div>
            }
            <div 
            className={`sidebar ${showDrawer ? 'show' : '' } fixed top-0 md:left-0 -left-[200%] w-[260px]  overflow-auto pb-4 h-full z-50 border-r bg-pure`} 
            ref={sidebarRef}
            >
                <div className='sidebar-overlay absolute top-0 left-0 w-full h-full'></div>
                <div className='overflow-auto'>
                    <div className='flex items-center justify-center border-b pb-6 pt-6'>
                        <Link to='/dashboard' className='text-2xl font-semibold'>
                            <img src={Logo} alt="" className='w-[90px] scale-[1.3]' />                        
                        </Link>
                    </div>
                    <ul className='sideMenu-list mt-6 text-dark h-full'>
                        <li 
                        className={`${isActive('dashboard') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/dashboard'>   
                                <i className="uil uil-home"></i>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('offers') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/offers'>   
                                <i className="uil uil-sitemap"></i>
                                <span>All Offers</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('invests') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/invests'>   
                                <i className="uil uil-usd-circle"></i>
                                <span>Invests</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('progress') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/progress'>   
                                <i className="uil uil-clock"></i>
                                <span>Progress</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('deposits') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/deposits/history'>   
                                <i className="uil uil-clipboard-notes"></i>
                                <span>Deposits</span>
                            </Link>
                        </li>

                        <li 
                        className={`${isActive('team') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/team'>   
                                <i className="uil uil-users-alt"></i>
                                <span>Bonus</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('wallet-history') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/wallet-history'>   
                                <i className="uil uil-history"></i>
                                <span>Wallet History</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('notifications') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/notifications'>   
                                <i className="uil uil-bell"></i>
                                <span>Notifications</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('change-bank') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/change-bank'>   
                                <i className="uil uil-university"></i>
                                <span>Change Bank</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('withdraw-requests') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/withdraw-requests'>   
                                <i className="uil uil-bill"></i>
                                <span>Withdrawal Records</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('invite') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/invite'>   
                                <i className="uil uil-award"></i>
                                <span>Invite Friend</span>
                            </Link>
                        </li>
                        <li 
                        className={`${isActive('support') ? 'active' : ''} sideMenu-item`}
                        onClick={() => setShowDrawer(false)}
                        >
                            <Link to='/support'>   
                                <i className="uil uil-envelope-question"></i>
                                <span>Contact Us</span>
                            </Link>
                        </li>
                        <li 
                        className='sideMenu-item'
                        >
                            <a href={ApkFile} download>
                                <i className="uil uil-download-alt"></i>
                                <span>Download Our App</span>
                            </a>
                        </li>
                        {/* <li 
                        className='sideMenu-item'
                        >
                            <a href='https://information.eaglexgroup.com' target='_blank'>   
                                <i className="uil uil-book-reader"></i>
                                <span>About Eaglex</span>
                            </a>
                        </li> */}

                        
                        <li 
                        className={`sideMenu-item signout`}
                        onClick={() => {
                            dispatch(logout(navigate))
                        }}
                        >
                            <i className="uil uil-signout"></i>
                            <span>Sign Out</span>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar