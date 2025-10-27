import { createSlice } from "@reduxjs/toolkit";
import { createFetchThunk, type IntroVariants, type Offer, type Recent, type Section, type Travel } from "../types";

interface HotelsStart{
    intro: IntroVariants,
    travels: Section<Travel>,
    offers: Section<Offer>,
    recent: Recent
}

interface Hotels{
    start: HotelsStart
}

const initialState : Hotels = {
    start: {
        intro: {
            heading: "Make your travel whishlist, we’ll do the rest",
            subheading: "Special offers to suit your plan",
            background: { 
                jpeg: "/img/hotels/home/banner/background.jpg", 
                webp: "/img/hotels/home/banner/background.webp" 
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
        recent: {
            heading: "Your recent searches",
            items: [],
        }
    }
}

export const fetchTravels = createFetchThunk<Travel[]>('travels/fetchAll', 'hotelsTravels');
export const fetchOffers = createFetchThunk<Offer[]>('offers/fetchAll', 'hotelsOffers');

export const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        addRecentItem: (state, action) => {
            state.start.recent.items.push(action.payload);
        },
        removeRecentItem: (state, action) => {
            const city = action.payload;
            state.start.recent.items = state.start.recent.items.filter(item => item.city !== city);
        },
        clearRecent: (state) => {
            state.start.recent.items = [];
        }
    },
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
    }
});