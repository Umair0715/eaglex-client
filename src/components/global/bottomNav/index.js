import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import HomeSvg from 'assets/svgs/home.svg';
import InvestSvg from 'assets/svgs/invest.svg';
import ProgressSvg from 'assets/svgs/progress.svg';
import BonusSvg from 'assets/svgs/bonus.svg';
import { useDrawerContext } from 'context/DrawerContext';
import './styles.css';

const BottomNav = () => {
    const location = useLocation();
    const { showDrawer , setShowDrawer } = useDrawerContext();

    const isActive = (path , home) => {
        if (home) return location.pathname === '/' ;
        return location.pathname.split('/').includes(path);
    }

    return (
        <div className='bottom-nav-container'>
            <ul className='bottom-nav-list'>
                <li 
                    className={`${isActive('dashboard') ? 'active' : ''} bottom-nav-item`}
                    onClick={() => setShowDrawer(false)}
                    >
                    <Link to='/dashboard'>   
                        <div>
                            <img src={HomeSvg} alt="home" />
                        </div>
                        <span>Home</span>
                    </Link>
                </li>
                <li 
                    className={`${isActive('invests') ? 'active' : ''} bottom-nav-item`}
                    onClick={() => setShowDrawer(false)}
                    >
                    <Link to='/invests'>   
                        <div>
                            <img src={InvestSvg} alt="Invest" />
                        </div>
                        <span>Invest</span>
                    </Link>
                </li>
                <li 
                    className={`${isActive('progress') ? 'active' : ''} bottom-nav-item`}
                    onClick={() => setShowDrawer(false)}
                    >
                    <Link to='/progress'>   
                        <div>
                            <img src={ProgressSvg} alt="Progress" />
                        </div>
                        <span>Progress</span>
                    </Link>
                </li>
                <li 
                    className={`${isActive('team') ? 'active' : ''} bottom-nav-item`}
                    onClick={() => setShowDrawer(false)}
                    >
                    <Link to='/team'>   
                        <div>
                            <img src={BonusSvg} alt="Bonus" />
                        </div>
                        <span>Bonus</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default BottomNav