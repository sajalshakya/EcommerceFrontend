import { createSlice } from '@reduxjs/toolkit'

// let  initialState = null // after login // {name, email , role}
let initialState = {
    user: null
} // after login // {name, email , role}

export let UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log({action})
            state.user = action.payload
            // state = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = UserSlice.actions

export default UserSlice.reducer