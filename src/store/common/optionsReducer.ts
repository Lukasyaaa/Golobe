import { options, optionIconPosition, optionsItemsType} from "../../types";

const defaultStore : options = {
    header:{
        start:{
            items:[
                {value: "Flights", iconValue: "_icon-plane"}, 
                {value: "Hotels", iconValue: "_icon-bed"}
            ],
            activeItem: 0
        },
        flights: "Where are you flying ?",
        hotels: "Where are you staying ?",
    },
    flights:[
        {
            title: "From - To", iconValue: "_icon-from-to", iconPosition: optionIconPosition.Right,
            value: "Lahore - Karachi", isActive: null
        },
        {
            title: "Trip", iconValue: null, iconPosition: optionIconPosition.Null,
            value:{
                items:["Depart", "Return"],
                activeItem: 0
            },
            isActive: false
        },
        {
            title: "Depart - Return", iconValue: null, iconPosition: optionIconPosition.Null,
            value: "07 Nov 22 - 13 Nov 22", isActive: null
        },
        {
            title: "Passenger - Class", iconValue: null, iconPosition: optionIconPosition.Null,
            value: "1 Passenger, Economy", isActive: null
        }
    ],
    hotels:[
        {
            title: "Enter Destination", iconValue: "_icon-bed", iconPosition: optionIconPosition.Left,
            isBigger: true, value: "Istanbul, Turkey",
            isActive: null
        },
        {
            title: "Check In", iconValue: "_icon-date", iconPosition: optionIconPosition.Right,
            isBigger: false, value: "Fri 12/2",
            isActive: null
        },
        {
            title: "Check Out", iconValue: "_icon-date", iconPosition: optionIconPosition.Right,
            isBigger: false, value: "Sun 12/4",
            isActive: null
        },
        {
            title: "Rooms & Guests", iconValue: "_icon-account", iconPosition: optionIconPosition.Left,
            isBigger: false, value: {
                items: ["1 room, 2 guests", "2 room, 1 guests"],
                activeItem: 0
            },
            isActive: false
        }
    ],
    footer:{
        promoButtonText: "Add Promo Code",
        sendButtonText:{
            flights: "Show Flights",
            hotels: "Show Places"
        }
    }
}

enum optionsAction{
    SWAP_ACTIVE = "OPTIONS_SWAP_ACTIVE",
    HIDE_ACTIVE = "OPTIONS_HIDE_ACTIVE",
    SET_ACTIVE_HEADER_LINK = "OPTIONS_SET_ACTIVE_HEADER_LINK",
    SET_ACTIVE_SELECT_LINK = "OPTIONS_SET_ACTVEI_SELECT_LINK"
}

interface payloadSwapActivePayload {
    id : number,
    parent : optionsItemsType | null,
}
type optionsSwapActive = {
    type : optionsAction.SWAP_ACTIVE,
    payload : payloadSwapActivePayload,
}

interface payloadOptionsSetActiveSelectLink{
    idLink : number,
    idSelect : number,
    parent : optionsItemsType
}
type optionsSetActiveSelectLink = {
    type : optionsAction.SET_ACTIVE_SELECT_LINK,
    payload : payloadOptionsSetActiveSelectLink,
}

type optionsSetActiveHeaderLink = {
    type : optionsAction.SET_ACTIVE_HEADER_LINK,
    payload : number,
}

type optionsHideActive = {
    type: optionsAction.HIDE_ACTIVE
}

type optionsActionType = optionsSwapActive | optionsSetActiveHeaderLink | optionsHideActive | optionsSetActiveSelectLink;
export const optionsReducer = (state : options = defaultStore, action : optionsActionType) : options =>{
    switch(action.type){
        case optionsAction.SWAP_ACTIVE:
            if(action.payload.parent === optionsItemsType.Flights){
                return{
                    ...state,
                    flights: state.flights.map((flightsItem, i) => {
                        return{
                            ...flightsItem, 
                            isActive: (i === action.payload.id) ? !flightsItem.isActive : flightsItem.isActive
                        };
                    })
                };
            }
            return{
                ...state,
                hotels: state.hotels.map((hotelsItem, i) => {
                    return{
                        ...hotelsItem, 
                        isActive: (i === action.payload.id) ? !hotelsItem.isActive : hotelsItem.isActive
                    };
                })
            };
        case optionsAction.HIDE_ACTIVE:
            return{
                ...state,
                flights: state.flights.map(flightsItem => {
                    return{
                        ...flightsItem, isActive: (flightsItem.isActive !== null) ? false : null
                    };
                }),
                hotels: state.hotels.map(hotelsItem => {
                    return{
                        ...hotelsItem, isActive: (hotelsItem.isActive !== null) ? false : null
                    };
                })
            };
        case optionsAction.SET_ACTIVE_HEADER_LINK:
            return {
                ...state, 
                header: { ...state.header,
                    start:{
                        ...state.header.start,
                        activeItem: action.payload
                    }
                }
            }
        case optionsAction.SET_ACTIVE_SELECT_LINK:
            if(action.payload.parent === optionsItemsType.Flights){
                return{
                    ...state,
                    flights: state.flights.map((flight, i) => {
                        if(i === action.payload.idSelect && typeof flight.value !== "string"){
                            return{
                                ...flight, value:{
                                    ...flight.value,
                                    activeItem: action.payload.idLink
                                }
                            }
                        }
                        return flight;
                    })
                }
            }
            return{
                ...state,
                hotels: state.hotels.map((hotel, i) => {
                    if(i === action.payload.idSelect && typeof hotel.value !== "string"){
                        return{
                            ...hotel, value:{
                                ...hotel.value,
                                activeItem: action.payload.idLink
                            }
                        }
                    }
                    return hotel;
                })
            }
        default:
            return state;
    }
}

export const optionsSwapActiveAction = (id : number, parent : optionsItemsType) : optionsSwapActive => ({
    type: optionsAction.SWAP_ACTIVE, payload: {id, parent}
});
export const optionsHideActiveAction = () : optionsHideActive => ({
    type: optionsAction.HIDE_ACTIVE
});
export const optionsSetActiveHeaderLinkAction = (newActive : number) : optionsSetActiveHeaderLink => ({
    type: optionsAction.SET_ACTIVE_HEADER_LINK, payload: newActive
});
export const optionsSetActiveSelectLink = (idLink: number, idSelect : number, parent : optionsItemsType) : optionsSetActiveSelectLink => ({
    type: optionsAction.SET_ACTIVE_SELECT_LINK, payload: {idLink, idSelect, parent}
})