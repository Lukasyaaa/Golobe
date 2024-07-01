import { options, optionIconPosition, optionsType, flightsOptionsItem, hotelsOptionsItem } from "../types";

const defaultStore : options = {
    header:[
        {value: "Flights", iconValue: "_icon-plane", isActive: true,}, 
        {value: "Hotels", iconValue: "_icon-bed", isActive: false,},
    ],
    flights:[
        {
            title: "From - To", iconValue: "_icon-from-to", iconPosition: optionIconPosition.Right,
            value: "Lahore - Karachi", isActive: null,
        },
        {
            title: "Trip", iconValue: null, iconPosition: optionIconPosition.Null,
            value:[{value: "Depart", isDisabled: true}, {value: "Return", isDisabled: false}],
            isActive: false,
        },
        {
            title: "Depart - Return", iconValue: null, iconPosition: optionIconPosition.Null,
            value: "07 Nov 22 - 13 Nov 22", isActive: null,
        },
        {
            title: "Passenger - Class", iconValue: null, iconPosition: optionIconPosition.Null,
            value: "1 Passenger, Economy", isActive: null,
        },
    ],
    hotels:[
        {
            title: "Enter Destination", iconValue: "_icon-bed", iconPosition: optionIconPosition.Left,
            isBigger: true, value: "Istanbul, Turkey",
            isActive: null,
        },
        {
            title: "Check In", iconValue: "_icon-date", iconPosition: optionIconPosition.Right,
            isBigger: false, value: "Fri 12/2",
            isActive: null,
        },
        {
            title: "Check Out", iconValue: "_icon-date", iconPosition: optionIconPosition.Right,
            isBigger: false, value: "Sun 12/4",
            isActive: null,
        },
        {
            title: "Rooms & Guests", iconValue: "_icon-account", iconPosition: optionIconPosition.Left,
            isBigger: false, value: [{value: "1 room, 2 guests", isDisabled: true}, {value: "2 room, 1 guests", isDisabled: false}],
            isActive: false,
        },
    ]
}

enum optionsAction{
    CHANGE_IS_ACTIVE = "OPTIONS_CHANGE_IS_ACTIVE",
    REPLACE_ACTIVE_HEADER_LINK = "REPLACE_ACTIVE_HEADER_LINK",
}

type payloadChangeIsActive = {
    id : number,
    parent : optionsType | null,
}
type optionsChangeIsActive = {
    type : optionsAction.CHANGE_IS_ACTIVE,
    payload : payloadChangeIsActive,
}

type payloadReplaceActiveHeaderLink={
    oldActive : number,
    newActive : number,
}
type optionsReplaceActiveHeaderLink = {
    type : optionsAction.REPLACE_ACTIVE_HEADER_LINK,
    payload : payloadReplaceActiveHeaderLink,
}

const changeItems = (newItems : flightsOptionsItem[] | hotelsOptionsItem[], id : number) : void =>{
    if(id === -1){
        newItems.forEach(item =>{
            if(typeof item.value !== "string") item.isActive = false;
        })
    }else if(typeof id === "number" && newItems[id].isActive !== null){
        newItems[id].isActive = !(newItems[id].isActive);
    }
}

type optionsActionType = optionsChangeIsActive | optionsReplaceActiveHeaderLink;

export const optionsReducer = (state : options = defaultStore, action : optionsActionType) : options =>{
    switch(action.type){
        case optionsAction.CHANGE_IS_ACTIVE:
            let newItemsFlights : flightsOptionsItem[] = state.flights;
            let newItemsHotels : hotelsOptionsItem[] = state.hotels;
            if(action.payload.parent === null){
                newItemsFlights.forEach(itemFlights =>{
                    if(typeof itemFlights.value !== "string") itemFlights.isActive = false;
                })
                newItemsHotels.forEach(itemHotels =>{
                    if(typeof itemHotels.value !== "string") itemHotels.isActive = false;
                })
            }else if(action.payload.parent === optionsType.Flights){
                changeItems(newItemsFlights, action.payload.id);
            }else{
                changeItems(newItemsHotels, action.payload.id);
            }
            return {...state, flights: newItemsFlights, hotels: newItemsHotels};
        case optionsAction.REPLACE_ACTIVE_HEADER_LINK:
            return {
                ...state, 
                header: state.header.map((headerLink, index) => {
                    if(index === action.payload.oldActive){
                        return{...headerLink, isActive: false};
                    }
                    if(index === action.payload.newActive){
                        return{...headerLink, isActive: true};
                    }
                    return{...headerLink};
                })
            }
        default:
            return state;
    }
}

export const optionsChangeIsActiveAction = (id : number = -1, parent : optionsType | null = null) : optionsChangeIsActive => ({
    type: optionsAction.CHANGE_IS_ACTIVE, payload: {id, parent}
})

export const optionsReplaceActiveHeaderLinkAction = (oldActive : number, newActive : number) : optionsReplaceActiveHeaderLink => ({
    type: optionsAction.REPLACE_ACTIVE_HEADER_LINK, payload: {oldActive, newActive}
})