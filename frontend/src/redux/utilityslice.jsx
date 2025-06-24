import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const utilities = createSlice({
    name : "utility",

    initialState : {
        currency : '$',
        delivery_fee : 10,
    },

    reducers : {

    }
})

export default utilities.reducer;