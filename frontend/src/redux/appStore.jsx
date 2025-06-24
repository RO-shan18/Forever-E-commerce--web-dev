import { configureStore } from "@reduxjs/toolkit";
import productslice from './productsstlice';
import cartItemslice from './cartItemSlice';
import showsearchslice from './showsearchslice';
import searchvalueslice from './searchvalueslice'
import logintokenslice from './loginslice';
import utilityslice from './utilityslice';

const AppStore = configureStore({
    reducer : {
        products : productslice,
        cartItem : cartItemslice,
        showSearch : showsearchslice,
        Search : searchvalueslice,
        Token : logintokenslice,
        Utility : utilityslice,
    }
})

export default AppStore;