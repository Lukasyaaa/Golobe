import { createSlice } from "@reduxjs/toolkit";
import { createFetchThunk, FLIGHTS_SORT_TYPE } from "../types";
import type { Catalog, Flight, objType, Offer, Section, Submap, Travel} from "../types";

interface FlightsStart{
    travels: Section<Travel>,
    offers: Section<Offer>,
    map: Section<Submap>
}

interface Flights{
    start: FlightsStart,
    catalog: Catalog<Flight, objType<typeof FLIGHTS_SORT_TYPE>>
}

const initialState : Flights = {
    start: {
        travels: {
            items: [], isLoading: false, error: null,
        },
        offers: {
            items: [], isLoading: false, error: null,
        },
        map: {
            items: [], isLoading: false, error: null
        }
    },
    catalog: {
        sort: [FLIGHTS_SORT_TYPE.cheapest, FLIGHTS_SORT_TYPE.best, FLIGHTS_SORT_TYPE.quickest],
        container: {
            items: [], isLoading: false, error: null,
        }
    }
}

export const fetchTravels = createFetchThunk<Travel[]>('flightsTravels/fetchAll', 'flightsTravels');
export const fetchOffers = createFetchThunk<Offer[]>('flightsOffers/fetchAll', 'flightsOffers');
export const fetchMap = createFetchThunk<Submap[]>('map/fetchAll', 'map');
export const fetchFlights = createFetchThunk<Flight[]>('flights/fetchAll', 'flights');

export const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        swapSortLinks: (state, action) => {
            const { firstIndex, secondIndex } = action.payload;
            const temp = state.catalog.sort[firstIndex];
            state.catalog.sort[firstIndex] = state.catalog.sort[secondIndex];
            state.catalog.sort[secondIndex] = temp;
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
        .addCase(fetchFlights.pending, state => {
            state.catalog.container.isLoading = true;
        })
        .addCase(fetchFlights.fulfilled, (state, action) => {
            state.catalog.container.isLoading = false;
            state.catalog.container.items = action.payload;
        })
        .addCase(fetchFlights.rejected, (state, action) => {
            let {message} = action.error;
            state.catalog.container.isLoading = false;
            state.catalog.container.error = (message === undefined) ? null : message;
        })
    }
});