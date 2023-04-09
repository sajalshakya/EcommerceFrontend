import { createSlice } from '@reduxjs/toolkit'

// let  initialState = null // after login // {name, email , role}
let initialState = {
    cart_items: []
} // after login // {name, email , role}

export let CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {

            /* 
                {
                    price,
                    _id:
                    quantiy
                    name
                }
             */


            let temp = [...state.cart_items]

            let existing_product = temp.find(cart_product => cart_product._id === action.payload._id)

            if (existing_product) {
                temp = temp.map(el => {
                    return {
                        ...el,
                        quantity: el.quantity + 1
                    }
                })
            } else {
                temp.push({
                    ...action.payload,
                    quantity: 1
                })
            }



            state.cart_items = temp
        },

    },
})

// Action creators are generated for each case reducer function
export const { setCart } = CartSlice.actions

export default CartSlice.reducer