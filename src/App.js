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
import { BrowserRouter as Router , Routes , Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "ProtectedRoute";
import { useSelector } from "react-redux";
import VerifyOtp from "pages/auth/VerifyOtp";



function App() {
    useApi();

    const { user } = useSelector(state => state.auth);

    return (
        <div>
            <ToastContainer 
                style={{fontSize: 15}}
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnHover
                hideProgressBar
            />
            <Routes>
                <Route path='/' element={
                    user ? <Navigate to="/dashboard" replace /> : <Home />
                } />
                <Route path='/login' element={
                    user ? <Navigate to="/dashboard" replace /> : <Login />
                } />
                <Route path='/register' element={
                    user ? <Navigate to="/dashboard" replace /> : <Register />} 
                />
                <Route path='/verify-otp' element={
                    user ? <Navigate to="/dashboard" replace /> : <VerifyOtp />} 
                />
                <Route path='/forgot-password' element={
                    user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} 
                />
                <Route path='/reset-password/:otp' element={
                    user ? <Navigate to="/dashboard" replace /> : <ResetPassword />} 
                />
                <Route path='/dashboard' element={
                    <ProtectedRoute >
                        <Dashboard />
                    </ProtectedRoute>
                } 
                />
                <Route path='/invests' element={
                    <ProtectedRoute>
                        <Invests />
                    </ProtectedRoute>
                } />
                <Route path='/progress' element={
                    <ProtectedRoute>
                        <Progress />
                    </ProtectedRoute>
                } />
                <Route path='/deposits/history' element={
                    <ProtectedRoute>
                        <Depsoits />
                    </ProtectedRoute>
                } />
                <Route path='/deposits/details/:id' element={
                    <ProtectedRoute>
                        <DepositDetails />
                    </ProtectedRoute>
                } />
                <Route path='/team' element={
                    <ProtectedRoute>
                        <Team />
                    </ProtectedRoute>
                } />
                <Route 
                path='/withdraw-requests' 
                element={
                    <ProtectedRoute>
                        <WithdrawRequests />
                    </ProtectedRoute>
                } 
                />
                <Route 
                path='/withdraw-requests/details/:id' 
                element={
                    <ProtectedRoute>
                        <WithdrawRequestDetails />
                    </ProtectedRoute>
                } 
                />
                <Route 
                path='/wallet-history' 
                element={
                    <ProtectedRoute>
                        <WalletHistory />
                    </ProtectedRoute>
                } 
                />
                <Route 
                path='/offers' 
                element={
                    <ProtectedRoute>
                        <Offers />
                    </ProtectedRoute>
                } 
                />
                <Route 
                path='/offers/details/:id' 
                element={
                    <ProtectedRoute>
                        <OfferDetails />
                    </ProtectedRoute>
                } 
                />
                <Route 
                path='/offers/invest/:id' 
                element={
                    <ProtectedRoute>
                        <InvestNow />
                    </ProtectedRoute>
                } 
                />
                <Route 
                path='/offers/invest-success' 
                element={
                    <ProtectedRoute>
                        <InvestSuccess />
                    </ProtectedRoute>
                } 
                />
                <Route 
                path='/profile'
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/support'
                element={
                    <ProtectedRoute>
                        <Support />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/deposit'
                element={
                    <ProtectedRoute>
                        <Deposit />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/deposit/success'
                element={
                    <ProtectedRoute>
                        <DepositSuccess />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/add-bank'
                element={
                    <ProtectedRoute>
                        <AddBank />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/withdraw'
                element={
                    <ProtectedRoute>
                        <Withdraw />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/withdraw/success'
                element={
                    <ProtectedRoute>
                        <WithdrawSuccess />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/change-bank'
                element={
                    <ProtectedRoute>
                        <ChangeBank />
                    </ProtectedRoute>
                }
                />
                <Route 
                path='/invite'
                element={
                    <ProtectedRoute>
                        <Invite />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </div> 
    );
}

export default App;
