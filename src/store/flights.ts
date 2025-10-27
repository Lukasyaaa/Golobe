import { createSlice } from "@reduxjs/toolkit";
import { createFetchThunk, type IntroVariants, type Offer, type Section, type Submap, type Travel } from "../types";

interface FlightsStart{
    intro: IntroVariants,
    travels: Section<Travel>,
    offers: Section<Offer>,
    map: Section<Submap>
}

interface Flights{
    start: FlightsStart
}

const initialState : Flights = {
    start: {
        intro: {
            heading: "Make your travel whishlist, we’ll do the rest",
            subheading: "Special offers to suit your plan",
            background: { 
                jpeg: "/img/flights/home/banner/background.jpg", 
                webp: "/img/flights/home/banner/background.webp" 
            }
        },
        travels: {
            header: {
                heading: "Fall into travel", 
                description: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.", 
                button: {active: "See All", disable: "Hide"}
            },
            items: [], isLoading: false, error: null, maxShow: 4
        },
        offers: {
            header: {
                heading: "Fall into travel", 
                description: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.", 
                button: {active: "See All", disable: "Hide"}
            },
            items: [], isLoading: false, error: null, maxShow: 1
        },
        map: {
            header: {
                heading: "Let's go places together", 
                description: "Discover the latest offers and news and start planning your next trip with us.", 
                button: {active: "See All", disable: "Hide"}
            },
            items: [], isLoading: false, error: null, maxShow: 5
        }
    }
}

export const fetchTravels = createFetchThunk<Travel[]>('travels/fetchAll', 'flightsTravels');
export const fetchOffers = createFetchThunk<Offer[]>('offers/fetchAll', 'flightsOffers');
export const fetchMap = createFetchThunk<Submap[]>('map/fetchAll', 'map');

export const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchTravels.pending, state => {
            state.start.travels.isLoading = true;
        })
        .addCase(fetchTravels.fulfilled, (state, action) => {
            state.start.travels.isLoading = false;
            state.start.travels.items = action.payload;
        })
        .addCase(fetchTravels.rejected, (state, action) => {
            let {message} = action.error;
            state.start.travels.isLoading = false;
            state.start.travels.error = (message === undefined) ? null : message;
        })
        .addCase(fetchOffers.pending, state => {
            state.start.offers.isLoading = true;
        })
        .addCase(fetchOffers.fulfilled, (state, action) => {
            state.start.offers.isLoading = false;
            state.start.offers.items = action.payload;
        })
        .addCase(fetchOffers.rejected, (state, action) => {
            let {message} = action.error;
            state.start.offers.isLoading = false;
            state.start.offers.error = (message === undefined) ? null : message;
        })
        .addCase(fetchMap.pending, state => {
            state.start.map.isLoading = true;
        })
        .addCase(fetchMap.fulfilled, (state, action) => {
            state.start.map.isLoading = false;
            state.start.map.items = action.payload;
        })
        .addCase(fetchMap.rejected, (state, action) => {
            let {message} = action.error;
            state.start.map.isLoading = false;
            state.start.map.error = (message === undefined) ? null : message;
        })
    }
});