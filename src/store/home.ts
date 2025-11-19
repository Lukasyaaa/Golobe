import { createSlice } from "@reduxjs/toolkit";
import { createFetchThunk, type Review, type Section, type Trip } from "../types";

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

export const fetchTrips = createFetchThunk<Trip[]>('trips/fetchAll', 'trips');
export const fetchReviews = createFetchThunk<Review[]>('reviews/fetchAll', 'reviews');

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchTrips.pending, state => {
            state.trips.isLoading = true;
        })
        .addCase(fetchTrips.fulfilled, (state, action) => {
            state.trips.isLoading = false;
            state.trips.items = action.payload;
        })
        .addCase(fetchTrips.rejected, (state, action) => {
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