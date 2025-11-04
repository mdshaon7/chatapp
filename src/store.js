import { configureStore } from '@reduxjs/toolkit'
import userSlice, { userinfo } from './slices/userSlice'
import messageSlice from './slices/messageSlice'

export const store = configureStore({
  reducer: {
    userinfo: userSlice,
    selecteduser : messageSlice

  },
})