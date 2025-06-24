import { createSlice } from "@reduxjs/toolkit";

const searchvalue = createSlice({
    name : "searchvalue",

    initialState : {
        search : "",
    },

    reducers : {
        
        searchresult : (state, action)=>{
            state.search = action.payload;
        }
    }
})

export const { searchresult } = searchvalue.actions;
export default searchvalue.reducer