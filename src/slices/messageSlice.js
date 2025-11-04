import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:  "",
}

export const messageSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    messageInfo: (state,action) => {
      
      state.value = action.payload
    },
    
  
  },
})

export const { messageInfo } = messageSlice.actions

export default messageSlice.reducer;