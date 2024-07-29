import { flightsOptions } from "../../types"

export enum flightsOptionsTitles {
    Cheapest = "Cheapest",
    Best = "Best",
    Quickest = "Quickest",
    CountTransfers = "Count of Transfers"
}

export const defaultStore : flightsOptions = {
    items: [
        {
            title: flightsOptionsTitles.Cheapest, subtitle: {price: 99, time: 138}
        },
        {
            title: flightsOptionsTitles.Best, subtitle: {price: 99, time: 138}
        },
        {
            title: flightsOptionsTitles.Quickest, subtitle: {price: 99, time: 138}
        },
        {
            title: flightsOptionsTitles.CountTransfers, subtitle: {price: 99, time: 12}
        }
    ],
    activeItem: 2,
    isActive: false
}

enum optionsFlightsAction{
    CHANGE_ACTIVE_ITEM = "FLIGHTS-OPTIONS_CHANGE_ACTIVE_ITEM",
    SWAP_ITEMS = "SWAP_ITEMS",
    HIDE_SELECT = "FLIGHTS-OPTIONS_HIDE_SELECT",
    SHOW_SELECT = "FLIGHTS-OPTIONS_SHOW_SELECT"
}

type optionsFlightsHideSelect = {
    type : optionsFlightsAction.HIDE_SELECT
}

type optionsFlightsShowSelect = {
    type : optionsFlightsAction.SHOW_SELECT
}

type optionsFlightsChangeActiveItem = {
    type : optionsFlightsAction.CHANGE_ACTIVE_ITEM,
    payload : number
}

type optionsFlightsSwapItems = {
    type : optionsFlightsAction.SWAP_ITEMS,
    payload : number
}

type optionsFlightsActionType = optionsFlightsChangeActiveItem | optionsFlightsSwapItems | optionsFlightsHideSelect | optionsFlightsShowSelect;

export const flightsOptionsReducer = ((state = defaultStore, action : optionsFlightsActionType) : flightsOptions => {
    switch(action.type){
        case optionsFlightsAction.CHANGE_ACTIVE_ITEM:
            return{
                ...state,
                activeItem: action.payload
            }
        case optionsFlightsAction.SWAP_ITEMS:
            return{
                ...state,
                items : state.items.map((item, index) =>{
                    if(index === state.activeItem - 1){
                        return{...state.items[action.payload]};
                    }
                    if(index === action.payload){
                        return {...state.items[state.activeItem - 1]};
                    }
                    return {...item};
                })
            }
        case optionsFlightsAction.HIDE_SELECT:
            return{
                ...state,
                isActive: false
            }
        case optionsFlightsAction.SHOW_SELECT:
            return{
                ...state,
                isActive: true
            }
        default:
            return state;
    }
});

export const flightsOptionsShowActive = () : optionsFlightsShowSelect => ({
    type: optionsFlightsAction.SHOW_SELECT
})
export const flightsOptionsHideActive = () : optionsFlightsHideSelect => ({
    type: optionsFlightsAction.HIDE_SELECT
})
export const flightsOptionsChangeActiveItemAction = (newActive : number) : optionsFlightsChangeActiveItem => ({
    type: optionsFlightsAction.CHANGE_ACTIVE_ITEM, payload: newActive
})
export const flightsOptionsSwapItemsAction = (newActive : number) : optionsFlightsSwapItems => ({
    type: optionsFlightsAction.SWAP_ITEMS, payload: newActive
})