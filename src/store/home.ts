import { createSlice } from "@reduxjs/toolkit";
import { createFetchThunk, type ChooseOption, type Review, type Section, type SiteSeparation, type Srcs, type Trip } from "../types";

interface IntroSection{
    supheading: string,
    heading: string,
    subheading: string,
    background: Srcs
}
interface HomePage {
    intro: IntroSection,
    trips: Section<Trip>,
    choose: SiteSeparation<ChooseOption>,
    reviews: Section<Review>
}

const initialState: HomePage = {
    intro: {
        supheading: "Helping Others",
        heading: "Live & Travel",
        subheading: "Special offers to suit your plan",
        background: { jpeg: "/img/start/intro/background.jpg", webp: "/img/start/intro/background.webp" }
    },
    trips: {
        header: {
            heading: "Plan your perfect trip", 
            description: "Search Flights & Places Hire to our most popular destinations",
            button: { active: "See more places", disable: "Hide" }
        },
        items: [],
        isLoading: false,
        error: null,
        maxShow: 9
    },
    choose: {
        flightsPart:{
            heading : "Flights",
            description : "Search Flights & Places Hire to our most popular destinations",
            button : "Show Filghts",
            background : { jpeg: "/img/start/choose/flights/image.jpg", webp: "/img/start/choose/flights/image.webp" }
        },
        hotelsPart: {
            heading : "Hotels",
            description : "Search hotels & Places Hire to our most popular destinations",
            button : "Show Hotels",
            background : { jpeg: "/img/start/choose/hotels/image.jpg", webp: "/img/start/choose/hotels/image.webp" }
        }
    },
    reviews: {
        header: {
            heading: "Reviews", 
            description: "What people says about Golobe facilities",
            button: { active: "See All", disable: "Hide" }
        },
        items: [],
        isLoading: false,
        error: null,
        maxShow: 3
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