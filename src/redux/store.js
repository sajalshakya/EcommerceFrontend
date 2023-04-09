import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/UserSlice'
import cartSlice from './slice/CartSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    },
})