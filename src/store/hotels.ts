import { createSlice } from "@reduxjs/toolkit";
import { createFetchFromDB, HOTELS_CHOOSE_TYPE} from "../types";
import type { Catalog, Hotel, HotelReview, objType, Offer, RecentItem, Section, Travel } from "../types";

interface HotelsStart{
    travels: Section<Travel>,
    offers: Section<Offer>,
    recent: RecentItem[]
}

interface Hotels{
    start: HotelsStart,
    catalog: Catalog<Hotel, objType<typeof HOTELS_CHOOSE_TYPE>>,
    reviews: HotelReview[]
}

const initialState : Hotels = {
    start: {
        travels: {
            items: [], isLoading: false, error: null
        },
        offers: {
            items: [], isLoading: false, error: null
        },
        recent: [],
    },
    catalog: {
        sort: [HOTELS_CHOOSE_TYPE.hotels, HOTELS_CHOOSE_TYPE.motels, HOTELS_CHOOSE_TYPE.resorts],
        container: {
            items: [], isLoading: false, error: null
        }
    },
    reviews: [

    ]
}

export const fetchTravels = createFetchFromDB<Travel[]>('hotelsTravels');
export const fetchOffers = createFetchFromDB<Offer[]>('hotelsOffers');
export const fetchHotels = createFetchFromDB<Hotel[]>('hotels');

export const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        addRecentItem: (state, action) => {
            state.start.recent.push(action.payload);
        },
        removeRecentItem: (state, action) => {
            const city = action.payload;
            state.start.recent = state.start.recent.filter(item => item.city !== city);
        },
        clearRecent: (state) => {
            state.start.recent = [];
        },
        swapSortLinks: (state, action) => {
            const { firstIndex, secondIndex } = action.payload;
            const temp = state.catalog.sort[firstIndex];
            state.catalog.sort[firstIndex] = state.catalog.sort[secondIndex];
            state.catalog.sort[secondIndex] = temp;
        },
        loadReviews: (state, action) => {
            state.reviews = action.payload
        },
        addReview: (state, action) => {
            state.reviews.push(action.payload);
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
        .addCase(fetchHotels.pending, state => {
            state.catalog.container.isLoading = true;
        })
        .addCase(fetchHotels.fulfilled, (state, action) => {
            state.catalog.container.isLoading = false;
            state.catalog.container.items = action.payload;
        })
        .addCase(fetchHotels.rejected, (state, action) => {
            let {message} = action.error;
            state.catalog.container.isLoading = false;
            state.catalog.container.error = (message === undefined) ? null : message;
        })
    }
});