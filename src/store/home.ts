import { createSlice } from "@reduxjs/toolkit";
import { createFetchFromDB, type Review, type Section, type Trip } from "../types";

interface HomePage {
    trips: Section<Trip>,
    reviews: Section<Review>
}

const initialState: HomePage = {
    trips: {
        items: [], isLoading: false, error: null,
    },
    reviews: {
        items: [], isLoading: false, error: null,
    },
};

export const fetchTrips = createFetchFromDB('trips');
export const fetchReviews = createFetchFromDB('reviews');

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchTrips.pending, state => {
            console.log("pending");
            state.trips.isLoading = true;
        })
        .addCase(fetchTrips.fulfilled, (state, action) => {
            console.log("fulfilled");
            state.trips.isLoading = false;
            state.trips.items = action.payload;
        })
        .addCase(fetchTrips.rejected, (state, action) => {
            console.log("error");
            let {message} = action.error;
            state.trips.isLoading = false;
            state.trips.error = (message === undefined) ? null : message;
        })
        .addCase(fetchReviews.pending, state => {
            state.reviews.isLoading = true;
        })
        .addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviews.isLoading = false;
            state.reviews.items = action.payload;
        })
        .addCase(fetchReviews.rejected, (state, action) => {
            let {message} = action.error;
            state.reviews.isLoading = false;
            state.reviews.error = (message === undefined) ? null : message;
        });
    }
});