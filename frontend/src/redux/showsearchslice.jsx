import { createSlice } from "@reduxjs/toolkit";

const showsearch = createSlice({
    name : "search",

    initialState : {
        showsearch : false,
    },

    reducers : {
        
        togglesearch : (state, action)=>{
            state.showsearch = action.payload;
        }
    }
})

export const { togglesearch } = showsearch.actions;
export default showsearch.reducer