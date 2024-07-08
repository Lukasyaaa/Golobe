import { options, optionIconPosition, optionsType} from "../../types";

const defaultStore : options = {
    header:{
        start:[
            {value: "Flights", iconValue: "_icon-plane", isActive: true}, 
            {value: "Hotels", iconValue: "_icon-bed", isActive: false}
        ],
        flights: "Where are you flying ?",
        hotels: "Where are you staying ?"
    },
    flights:[
        {
            title: "From - To", iconValue: "_icon-from-to", iconPosition: optionIconPosition.Right,
            value: "Lahore - Karachi", isActive: null
        },
        {
            title: "Trip", iconValue: null, iconPosition: optionIconPosition.Null,
            value:[{value: "Depart", isDisabled: true}, {value: "Return", isDisabled: false}],
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
            isBigger: false, value: [{value: "1 room, 2 guests", isDisabled: true}, {value: "2 room, 1 guests", isDisabled: false}],
            isActive: false
        }
    ]
}

enum optionsAction{
    SWAP_IS_ACTIVE = "OPTIONS_SWAP_IS_ACTIVE",
    MAKE_ALL_NOT_ACTIVE = "OPTIONS_MAKE_ALL_NOT_ACTIVE",
    REPLACE_ACTIVE_HEADER_LINK = "REPLACE_ACTIVE_HEADER_LINK",
}

type payloadChangeIsActive = {
    id : number,
    parent : optionsType | null,
}
type optionsSwapIsActive = {
    type : optionsAction.SWAP_IS_ACTIVE,
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

type optionsMakeAllNotActive = {
    type: optionsAction.MAKE_ALL_NOT_ACTIVE
}

type optionsActionType = optionsSwapIsActive | optionsReplaceActiveHeaderLink | optionsMakeAllNotActive;
export const optionsReducer = (state : options = defaultStore, action : optionsActionType) : options =>{
    switch(action.type){
        case optionsAction.SWAP_IS_ACTIVE:
            if(action.payload.parent === optionsType.Flights){
                return{
                    ...state,
                    flights: state.flights.map((flightsItem, index) => {
                        if(index === action.payload.id){
                            return{...flightsItem, isActive: !(flightsItem.isActive)};
                        }
                        return{...flightsItem};
                    })
                };
            }
            return{
                ...state,
                hotels: state.hotels.map((hotelsItem, index) => {
                    if(index === action.payload.id){
                        return{...hotelsItem, isActive: !(hotelsItem.isActive)};
                    }
                    return{...hotelsItem};
                })
            };
        case optionsAction.MAKE_ALL_NOT_ACTIVE:
            return{
                ...state,
                flights: state.flights.map(flightsItem => ({
                    ...flightsItem,
                    isActive: false
                })),
                hotels: state.hotels.map(hotelsItem => ({
                    ...hotelsItem,
                    isActive: false
                }))
            };
        case optionsAction.REPLACE_ACTIVE_HEADER_LINK:
            return {
                ...state, 
                header: {
                    ...state.header,
                    start: state.header.start.map((headerLink, index) => {
                        if(index === action.payload.oldActive){
                            return{...headerLink, isActive: false};
                        }
                        if(index === action.payload.newActive){
                            return{...headerLink, isActive: true};
                        }
                        return{...headerLink};
                    })
                }
            }
        default:
            return state;
    }
}

export const optionsSwapIsActiveAction = (id : number, parent : optionsType) : optionsSwapIsActive => ({
    type: optionsAction.SWAP_IS_ACTIVE, payload: {id, parent}
});
export const optionsMakeAllNotActiveAction = () : optionsMakeAllNotActive => ({
    type: optionsAction.MAKE_ALL_NOT_ACTIVE
});
export const optionsReplaceActiveHeaderLinkAction = (oldActive : number, newActive : number) : optionsReplaceActiveHeaderLink => ({
    type: optionsAction.REPLACE_ACTIVE_HEADER_LINK, payload: {oldActive, newActive}
});