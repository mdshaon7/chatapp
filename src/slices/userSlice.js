import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
}

export const userSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    userinfo: (state,action) => {
      
      state.value = action.payload
    },
    
  
  },
})

export const { userinfo } = userSlice.actions

export default userSlice.reducer;