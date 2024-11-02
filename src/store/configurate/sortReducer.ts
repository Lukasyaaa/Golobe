import { contentPart, sort, sortTitles } from "../../types";

const defaultStore : sort = {
    flights: {
        items: [
            {title: sortTitles.Cheapest, subtitle: {price: 305, flyTime: 138}},
            {title: sortTitles.Best, subtitle: {price: 305, flyTime: 138}},
            {title: sortTitles.Quickest, subtitle: {price: 305, flyTime: 138}},
            {title: sortTitles.CountTransfers, subtitle: {price: 305, flyTime: 138}}
        ], 
        currentActive: 1,
        maxShow: 3
    },
    hotels: {
        items: [
            {title: sortTitles.Motels, subtitle: 53},
            {title: sortTitles.Hotels, subtitle: 53},
            {title: sortTitles.Resorts, subtitle: 53}
        ], 
        currentActive: 1,
        maxShow: 3
    },
    buttonShowMore: "Other sort"
}

enum sortActionsType{
    SORT_SET_ACTIVE = "SORT_SET_ACTIVE",
    SORT_REPLACE = "SORT_REPLACE"
}

interface sortSetActivePayload{
    contentType : contentPart,
    id : number
}
type sortSetActive = {
    type : sortActionsType.SORT_SET_ACTIVE,
    payload : sortSetActivePayload
}

interface sortReplacePayload{
    contentType : contentPart,
    id : number,
}
type sortReplace = {
    type : sortActionsType.SORT_REPLACE,
    payload : sortReplacePayload
}

type sortAction = sortReplace | sortSetActive;

export const sortReducer = (store : sort = defaultStore, action : sortAction) : sort => {
    switch(action.type){
        case sortActionsType.SORT_SET_ACTIVE:
            if(action.payload.contentType === contentPart.Flights){
                return {
                    ...store,
                    flights: {
                        ...store.flights,
                        currentActive: action.payload.id
                    }
                }
            }
            return {
                ...store,
                hotels: {
                    ...store.hotels,
                    currentActive: action.payload.id
                }
            }
        case sortActionsType.SORT_REPLACE:
            if(action.payload.contentType === contentPart.Flights){
                return {
                    ...store,
                    flights: {
                        ...store.flights,
                        items: store.flights.items.map((sortCategory, i) => {
                            if(i === store.flights.currentActive){
                                return store.flights.items[action.payload.id + store.flights.maxShow];
                            }
                            if(i === action.payload.id + store.flights.maxShow){
                                return store.flights.items[store.flights.currentActive]
                            }
                            return sortCategory;
                        })
                    }
                }
            }
            return {
                ...store,
                hotels: {
                    ...store.hotels,
                    items: store.hotels.items.map((sortCategory, i) => {
                        if(i === store.hotels.currentActive){
                            return store.hotels.items[action.payload.id + store.hotels.maxShow];
                        }
                        if(i === action.payload.id + store.hotels.maxShow){
                            return store.hotels.items[store.hotels.currentActive]
                        }
                        return sortCategory;
                    })
                }
            }
        default:
            return store;
    }
};

export const sortSetActiveAction = (contentType : contentPart, id : number) : sortSetActive => ({
    type: sortActionsType.SORT_SET_ACTIVE,
    payload: {contentType, id}
});

export const sortReplaceAction = (contentType : contentPart, id : number) : sortReplace => ({
    type: sortActionsType.SORT_REPLACE,
    payload: {contentType, id}
})