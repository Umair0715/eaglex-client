import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : 'auth' ,
    initialState : {
        user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null ,
        loading : false ,
        updateLoading : false 
    } ,
    reducers : {
        setUser(state , action) {
            state.user = action.payload;
        } , 
        setLoading(state , action){
            state.loading = action.payload;
        } ,
        setUpdateLoading(state , action){
            state.updateLoading = action.payload;
        }
    }
    
});

export const { setUser , setLoading , setUpdateLoading } = authSlice.actions;
export default authSlice.reducer;


