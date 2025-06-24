import {createSlice} from '@reduxjs/toolkit'

const products = createSlice({
    name : 'products',

    initialState : {
        getproducts : [],
    },

    reducers : {
        addproduct : (state, action) => {
            state.getproducts.push(action.payload);
        }
    }
})

export const {addproduct} =  products.actions;
export default products.reducer;
