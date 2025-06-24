import { createSlice } from "@reduxjs/toolkit";

const cartItem = createSlice({
    name : "cartitem",

    initialState : {
        cartitem : {},
    },

    reducers : {
        addItem : (state, action)=>{
            state.cartitem = action.payload;
        },

        updateItem : (state, action)=>{
           state.cartitem =  action.payload;
        },

        removeItem : (state, action)=>{
            state.cartitem = {}
        }
    }
})

export const { addItem, updateItem, removeItem } = cartItem.actions;
export default cartItem.reducer