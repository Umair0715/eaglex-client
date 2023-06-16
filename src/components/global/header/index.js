import './styles.css';
import { useDrawerContext } from 'context/DrawerContext';
import useToggle from 'hooks/useToggle';
import { useRef } from 'react';
import useClickOutside from 'utils/clickOutside';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Hamburger from 'assets/svgs/hamburger.svg';
import { useDispatch, useSelector } from 'react-redux';
import Logo from 'assets/svgs/Logo.svg';
import { logout } from 'redux/actions/authActions';
import { ClipLoader } from 'react-spinners';
import { baseURL } from 'config/api';
import { useNotificationContext } from 'context/NotificationContext';
import ApkFile from 'assets/eaglexgroup.apk';


const userImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1fYaY9LEjaK0yhT3WsncM36y6MD9sLCHU4A&usqp=CAU';

const Header = () => {
    const { showDrawer , setShowDrawer } = useDrawerContext();
    const { notificationsCount } = useNotificationContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { loading , user } = useSelector(state => state.auth);

    const menuRef = useRef(null);
    const [showMenu , toggleMenu] = useToggle(false);

    useClickOutside(menuRef , () => toggleMenu(false));

    const logoutHandler = () => {
        dispatch(logout(navigate));
    }

    return (
       <div className='w-full py-3 border-b flex items-center md:justify-end justify-between gap-8 md:px-12 sm:px-8 px-2  text-lg'>
            <div className='cursor-pointer w-fit md:hidden block'
            onClick={() => setShowDrawer(true)}
            >
                <img src={Hamburger} alt="Hamburger" className='sm:w-[40px] w-[30px]' />
            </div>
            {/* <div>
                <img 
                src={Logo} 
                alt=""
                className='w-[150px] h-[40px]' 
                />
            </div> */}
            <div className='flex items-center sm:gap-5 gap-3'>
                    {
                        location.pathname.split('/').includes('deposits') && 
                        <Link to='/deposit'>
                            <button className='btn-primary py-1.5 px-4 sm:text-sm text-xs'>Deposit Now</button>
                        </Link>
                    }
                    {
                        location.pathname === '/dashboard' &&
                        <a href={ApkFile} download className='border sm:text-[14px] text-xs flex items-center gap-2 rounded-full px-3  py-2 cursor-pointer hover:shadow-md'>
                            <i className="uil uil-download-alt"></i>
                            <span>Download App</span>
                        </a>
                    }
                    
                    <div className='relative border rounded-full w-[35px] h-[35px] flex items-center justify-center'>
                        <Link to='/notifications' title='Notifications'>
                            <i className="uil uil-bell text-xl"></i>
                        </Link>
                        {
                            notificationsCount > 0 && 
                            <div className='absolute top-0 -right-2 bg-red-500 text-white text-[10px] w-[15px] h-[15px] flex items-center justify-center rounded-full'>
                                {notificationsCount}
                            </div>
                        }
                    </div>
                    <div className='relative'>
                    <div className='bg-darkSlate rounded-full w-[35px] h-[35px] flex items-center justify-center text-grayText text-xl cursor-pointer border p-0.5'
                    onClick={() => toggleMenu()}>
                        <img 
                        src={user?.image ? baseURL + user?.image : userImage } 
                        alt={`User`} 
                        className='w-full h-full rounded-full object-cover'
                        />
                    </div>
                    {
                        showMenu && 
                        <div 
                        className='absolute right-[30%] top-[110%] w-[240px] h-auto bg-pure shadow-lg rounded-lg border z-[50]'
                        ref={menuRef}
                        >
                            <div className='text-sm'>
                                <div className='flex items-center gap-2 py-3 px-3 border-b'>
                                    <div className='bg-darkSlate rounded-full w-[35px] h-[35px] flex items-center justify-center text-grayText text-xl cursor-pointer'>
                                        <img 
                                        src={`${user?.image ? baseURL + user?.image : userImage }`} 
                                        alt={`User`} 
                                        className='w-full h-full rounded-full object-cover'
                                        />
                                    </div>
                                    <div className='text-sm'>
                                        <p className='font-semibold'>
                                            {user?.firstName + ' ' + user?.lastName}
                                        </p>
                                        
                                    </div>
                                </div>
                                <div
                                onClick={() => navigate('/profile')}
                                className='py-3 px-3 border-b cursor-pointer text-dark hover:bg-gray-100'>
                                    Settings
                                </div>
                                <div className='py-3 px-3 border-b cursor-pointer text-dark hover:bg-gray-100'
                                onClick={logoutHandler}
                                >
                                    {
                                        loading 
                                        ? 
                                            <ClipLoader size={20} />
                                        : 
                                            'Sign Out'
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
       </div>
    )
}

export default Header;