import { createSlice } from "@reduxjs/toolkit";

const logintoken = createSlice({
    name : "token",

    initialState : {
        token : "",
    },

    reducers : {
        
        gettoken : (state, action)=>{
            state.token = action.payload;
        },

        removetoken : state =>{
            state.token = ""
        }
    }
})

export const { gettoken, removetoken } = logintoken.actions;
export default logintoken.reducer