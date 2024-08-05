import { sorts, contentPart, placesType } from "../../types"

export enum sortFlightsTitles {
    Cheapest = "Cheapest",
    Best = "Best",
    Quickest = "Quickest",
    CountTransfers = "Count of Transfers"
}

export enum sortHotelsTitle {
    Hotels = "Hotels",
    Motels = "Motels",
    Resorts = "Resorts"
}

export const defaultStore : sorts = {
    flights:{
        items: [
            {
                title: sortFlightsTitles.Cheapest, subtitle: {price: 99, time: 138}
            },
            {
                title: sortFlightsTitles.Best, subtitle: {price: 99, time: 138}
            },
            {
                title: sortFlightsTitles.Quickest, subtitle: {price: 99, time: 138}
            },
            {
                title: sortFlightsTitles.CountTransfers, subtitle: {price: 99, time: 12}
            }
        ],
        activeItem: 1,
        isActive: false
    },
    hotels:{
        items: [
            {
                title: placesType.Hotels, count: 257
            },
            {
                title: placesType.Motels, count: 257
            },
            {
                title: placesType.Resorts, count: 257
            },
        ],
        activeItem: 0,
        isActive: false
    }
}

enum sortAction{
    CHANGE_ACTIVE_ITEM = "SORT_CHANGE_ACTIVE_ITEM",
    SWAP_ITEMS = "SWAP_ITEMS",
    HIDE_SELECT = "SORT_HIDE_SELECT",
    SHOW_SELECT = "SORT_SHOW_SELECT"
}

type sortShowSelect = {
    type : sortAction.SHOW_SELECT,
    payload : contentPart
}

type sortHideSelect = {
    type : sortAction.HIDE_SELECT,
    payload : contentPart
}

interface sortChangeActiveItemPayload{
    idNew : number,
    parent : contentPart
}
type sortChangeActiveItem = {
    type : sortAction.CHANGE_ACTIVE_ITEM,
    payload : sortChangeActiveItemPayload
}

interface sortSwapItemsPayload{
    idNew : number,
    parent : contentPart
}
type sortSwapItems = {
    type : sortAction.SWAP_ITEMS,
    payload : sortSwapItemsPayload
}

type sortActionType = sortHideSelect | sortShowSelect | sortChangeActiveItem | sortSwapItems;

export const sortReducer = ((state = defaultStore, action : sortActionType) : sorts => {
    switch(action.type){
        case sortAction.CHANGE_ACTIVE_ITEM:
            if(action.payload.parent === contentPart.Flights){
                return{
                    ...state,
                    flights: {...state.flights, activeItem: action.payload.idNew}
                }
            }
            return{
                ...state,
                hotels: {...state.hotels, activeItem: action.payload.idNew}
            }
        case sortAction.SWAP_ITEMS:
            if(action.payload.parent === contentPart.Flights){
                return{
                    ...state,
                    flights: {...state.flights, items : state.flights.items.map((item, index) =>{
                        if(index === state.flights.activeItem){
                            return{...state.flights.items[action.payload.idNew]};
                        }
                        if(index === action.payload.idNew){
                            return {...state.flights.items[state.flights.activeItem]};
                        }
                        return {...item};
                    })
                }}
            }
            return{
                ...state,
                hotels: {...state.hotels, items : state.hotels.items.map((item, index) =>{
                    if(index === state.hotels.activeItem - 1){
                        return{...state.hotels.items[action.payload.idNew]};
                    }
                    if(index === action.payload.idNew){
                        return {...state.hotels.items[state.hotels.activeItem - 1]};
                    }
                    return {...item};
                })
            }}
        case sortAction.HIDE_SELECT:
            if(action.payload === contentPart.Flights){
                return{
                    ...state,
                    flights: {...state.flights, isActive: false}
                }
            }
            return{
                ...state,
                hotels: {...state.hotels, isActive: false}
            }
        case sortAction.SHOW_SELECT:
            if(action.payload === contentPart.Flights){
                return{
                    ...state,
                    flights: {...state.flights, isActive: true}
                }
            }
            return{
                ...state,
                hotels: {...state.hotels, isActive: true}
            }
        default:
            return state;
    }
});

export const sortShowActive = (parent : contentPart) : sortShowSelect => ({
    type: sortAction.SHOW_SELECT, payload: parent
})
export const sortHideActive = (parent : contentPart) : sortHideSelect => ({
    type: sortAction.HIDE_SELECT, payload: parent
})
export const sortChangeActiveItemAction = (idNew : number, parent : contentPart) : sortChangeActiveItem => ({
    type: sortAction.CHANGE_ACTIVE_ITEM, payload: {idNew, parent}
})
export const sortSwapItemsAction = (idNew : number, parent : contentPart) : sortSwapItems => ({
    type: sortAction.SWAP_ITEMS, payload: {idNew, parent}
})