import './styles.css';
import { useDrawerContext } from 'context/DrawerContext';
import useToggle from 'hooks/useToggle';
import { useRef } from 'react';
import useClickOutside from 'utils/clickOutside';
import { Link, useNavigate } from 'react-router-dom';
import Hamburger from 'assets/svgs/hamburger.svg';
import { useDispatch, useSelector } from 'react-redux';
import Logo from 'assets/svgs/Logo.svg';
import { logout } from 'redux/actions/authActions';
import { ClipLoader } from 'react-spinners';
import { baseURL } from 'config/api';

const userImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1fYaY9LEjaK0yhT3WsncM36y6MD9sLCHU4A&usqp=CAU';

const Header = () => {
    const { showDrawer , setShowDrawer } = useDrawerContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            <div className='flex items-center sm:gap-8 gap-3'>
                    <div className='relative'>
                    <div className='bg-darkSlate rounded-full w-[35px] h-[35px] flex items-center justify-center text-grayText text-xl cursor-pointer border p-0.5'
                    onClick={() => toggleMenu()}>
                        <img 
                        src={userImage} 
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
                                        src={`${baseURL}/user/${user?.image}`} 
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