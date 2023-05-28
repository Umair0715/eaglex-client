import ForgotPassword from "pages/auth/ForgotPassword";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ResetPassword from "pages/auth/ResetPassword";
import Dashboard from "pages/dashboard";
import Depsoits from "pages/deposits";
import DepositDetails from "pages/deposits/DepositDetails";
import Home from "pages/home";
import Invests from "pages/invests";
import Offers from "pages/offers";
import OfferDetails from "pages/offers/OfferDetails";
import Progress from "pages/progress";
import Team from "pages/team";
import WithdrawRequests from "pages/withdrawlRequests";
import WithdrawRequestDetails from "pages/withdrawlRequests/WithdrawRequestDetails";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WalletHistory from "pages/walletHistory";
import InvestNow from "pages/offers/InvestNow";
import InvestSuccess from "pages/offers/InvestSuccess";
import Profile from "pages/profile";
import Support from "pages/support/Support";
import Deposit from "pages/deposit";
import DepositSuccess from "pages/deposit/DepositSuccess";
import AddBank from "pages/withdraw/AddBank";
import Withdraw from "pages/withdraw";
import WithdrawSuccess from "pages/withdraw/WithdrawSuccess";
import ChangeBank from "pages/bank/ChangeBank";
import Invite from "pages/invite";
import { useApi } from "config/api";



function App() {
    useApi();

    return (
        <div>
            <ToastContainer 
                style={{fontSize: 15}}
                position="top-center"
                autoClose={2500}
                closeOnClick
                pauseOnHover
            />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/invests' element={<Invests />} />
                <Route path='/progress' element={<Progress />} />
                <Route path='/deposits/history' element={<Depsoits />} />
                <Route path='/deposits/details/:id' element={<DepositDetails />} />
                <Route path='/team' element={<Team />} />
                <Route 
                path='/withdraw-requests' 
                element={<WithdrawRequests />} 
                />
                <Route 
                path='/withdraw-requests/details/:id' 
                element={<WithdrawRequestDetails />} 
                />
                <Route 
                path='/wallet-history' 
                element={<WalletHistory />} 
                />
                <Route 
                path='/offers' 
                element={<Offers />} 
                />
                <Route 
                path='/offers/details/:id' 
                element={<OfferDetails />} 
                />
                <Route 
                path='/offers/invest/:id' 
                element={<InvestNow />} 
                />
                <Route 
                path='/offers/invest-success' 
                element={<InvestSuccess />} 
                />
                <Route 
                path='/profile'
                element={<Profile />}
                />
                <Route 
                path='/support'
                element={<Support />}
                />
                <Route 
                path='/deposit'
                element={<Deposit />}
                />
                <Route 
                path='/deposit/success'
                element={<DepositSuccess />}
                />
                <Route 
                path='/add-bank'
                element={<AddBank />}
                />
                <Route 
                path='/withdraw'
                element={<Withdraw />}
                />
                <Route 
                path='/withdraw/success'
                element={<WithdrawSuccess />}
                />
                <Route 
                path='/change-bank'
                element={<ChangeBank />}
                />
                <Route 
                path='/invite'
                element={<Invite />}
                />
            </Routes>
        </div> 
    );
}

export default App;
