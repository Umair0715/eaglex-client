import Axios from 'config/api';
import { setLoading, setUser , setUpdateLoading, setShowBlockedPopup } from 'redux/reducers/authReducer';
import toastError from 'utils/toastError';
import { toast } from 'react-toastify';

export const register = (data , navigate ) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { message , doc } } } = await Axios.post('/user/register' , data );
        dispatch(setUser({...doc}));
        localStorage.setItem('user' , JSON.stringify({...doc}));
        dispatch(setLoading(false));
        navigate('/dashboard');
        toast.success(message);
    } catch (err) {
        dispatch(setLoading(false));
        console.log('register error' , err);
        toastError(err);
    }
}

export const login = (data , navigate ) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { message , doc } } } = await Axios.post('/user/login' , data );
        if(doc?.isActive) {
            dispatch(setUser({...doc}));
            localStorage.setItem('user' , JSON.stringify({...doc}));
            navigate('/dashboard');
            toast.success(message);
        }else {
            dispatch(setShowBlockedPopup(true));
        }
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('login error' , err);
        toastError(err);
    }
}

export const updateProfile = (updatedData) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    const token = getState().auth.user.token;
    try {
        const { data : { data : { doc , message } } } = await Axios.put('/user/profile' , updatedData  , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        toast.success(message);
        dispatch(setUser({...doc , token }));
        localStorage.setItem('user' , JSON.stringify({...doc , token }));
        dispatch(setUpdateLoading(false))
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('Update Profile error' , err);
        toastError(err);
    }
}

export const logout = (navigate , showToast = true) => async(dispatch) => {
    dispatch(setLoading(true));
    try {
        await Axios('/user/logout');
        dispatch(setUser(null));
        localStorage.removeItem('user');
        dispatch(setLoading(false));
        navigate('/login');
        if(showToast){
            toast.success('Logged out successfully.')
        }
        localStorage.removeItem('isPopupShown');
    } catch (err) {
        dispatch(setLoading(false));
        console.log('logout error' , err);
        toastError(err);
    }
}