import { createSlice } from "@reduxjs/toolkit";
import type { SiteSeparation } from "../types";

interface HeaderAuthorization{
    login: string,
    signUp: string
}
interface Header {
    links: SiteSeparation<string>,
    authorization : HeaderAuthorization
}

const initialState: Header = {
    links: {
        flightsPart: "Find Flights",
        hotelsPart: "Find Stays"
    },
    authorization: {
        login: "Login",
        signUp: "Sign up"
    }
};

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {}
});