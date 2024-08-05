import { flightsItems, meridiem, airlines, flightType } from "../../types";
import emiratesJpeg from "../../assets/img/flights-configurate/1/1.png"
import emiratesWebp from "../../assets/img/flights-configurate/1/1.webp"
import flyDubaiJpeg from "../../assets/img/flights-configurate/2/2.png"
import flyDubaiWebp from "../../assets/img/flights-configurate/2/2.webp"
import qatarJpeg from "../../assets/img/flights-configurate/3/3.png"
import qatarWebp from "../../assets/img/flights-configurate/3/3.webp"
import etihadJpeg from "../../assets/img/flights-configurate/4/4.png"
import etihadWebp from "../../assets/img/flights-configurate/4/4.webp"


const defaultStore : flightsItems = {
    header:{
        countVisibleItems: 4,
        select: {
            list:[
                "Recommended", "Recommended", "Recommended"
            ],
            activeItem: 0,
            isActive: false,
        }
    },
    items:[
        {
            type: flightType.MultiCity,
            images: [
                {srcs: {webp: qatarJpeg, jpeg: qatarWebp}, alt: airlines.Qatar}
            ],
            review:{
                rating: 1,
                ratingText: "Very Good",
                countReviews: 54
            },
            price:{
                sub: "starting from",
                main: 75
            },
            schedule: [
                {
                    departureTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 1,
                        minute: 38,
                        meridiem: meridiem.PM
                    },
                    service: airlines.Qatar,
                    numberOfTransfers: 1,
                    from: "EWR",
                    to: "BNA"
                },                
                {
                    departureTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 1,
                        minute: 38,
                        meridiem: meridiem.PM
                    },
                    service: airlines.Qatar,
                    numberOfTransfers: 2,
                    from: "EWR",
                    to: "BNA"
                }
            ],
            buttonText: "View Deals"
        },
        {
            type: flightType.MultiCity,
            images: [
                {srcs: {jpeg: emiratesJpeg, webp: emiratesWebp}, alt: airlines.Emirates},
            ],
            review:{
                rating: 3,
                ratingText: "Very Good",
                countReviews: 54
            },
            price:{
                sub: "starting from",
                main: 250
            },
            schedule: [
                {
                    departureTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 4,
                        minute: 35,
                        meridiem: meridiem.AM
                    },
                    service: airlines.Emirates,
                    numberOfTransfers: 4,
                    from: "EWR",
                    to: "BNA"
                },                
                {
                    departureTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.PM
                    },
                    arrivalTime:{
                        hour: 6,
                        minute: 38,
                        meridiem: meridiem.PM
                    },
                    service: airlines.FlyDubai,
                    numberOfTransfers: 5,
                    from: "EWR",
                    to: "BNA"
                }
            ],
            buttonText: "View Deals"
        },
        {
            type: flightType.MyDatesAreFlexible,
            images: [
                {srcs: {webp: flyDubaiJpeg, jpeg: flyDubaiWebp}, alt: airlines.FlyDubai}
            ],
            review:{
                rating: 5,
                ratingText: "Very Good",
                countReviews: 54
            },
            price:{
                sub: "starting from",
                main: 125
            },
            schedule: [
                {
                    departureTime: {
                        hour: 3,
                        minute: 25,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 1,
                        minute: 38,
                        meridiem: meridiem.PM
                    },
                    service: airlines.Etihad,
                    numberOfTransfers: 4,
                    from: "EWR",
                    to: "BNA"
                },                
                {
                    departureTime: {
                        hour: 1,
                        minute: 3,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 3,
                        minute: 38,
                        meridiem: meridiem.PM
                    },
                    service: airlines.FlyDubai,
                    numberOfTransfers: 1,
                    from: "EWR",
                    to: "BNA"
                }
            ],
            buttonText: "View Deals"
        },
        {
            type: flightType.OnWay,
            images: [
                {srcs: {webp: etihadJpeg, jpeg: etihadWebp}, alt: airlines.Etihad}
            ],
            review:{
                rating: 4,
                ratingText: "Very Good",
                countReviews: 54
            },
            price:{
                sub: "starting from",
                main: 475
            },
            schedule: [
                {
                    departureTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 1,
                        minute: 38,
                        meridiem: meridiem.PM
                    },
                    service: airlines.Etihad,
                    numberOfTransfers: 0,
                    from: "EWR",
                    to: "BNA"
                },                
                {
                    departureTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 1,
                        minute: 38,
                        meridiem: meridiem.AM
                    },
                    service: airlines.Etihad,
                    numberOfTransfers: 0,
                    from: "EWR",
                    to: "BNA"
                }
            ],
            buttonText: "View Deals"
        },
        {
            type: flightType.RoundTrip,
            images: [
                {srcs: {webp: emiratesJpeg, jpeg: emiratesWebp}, alt: airlines.Emirates}
            ],
            review:{
                rating: 2.5,
                ratingText: "Very Good",
                countReviews: 54
            },
            price:{
                sub: "starting from",
                main: 225
            },
            schedule: [
                {
                    departureTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrivalTime:{
                        hour: 1,
                        minute: 38,
                        meridiem: meridiem.AM
                    },
                    service: airlines.Emirates,
                    numberOfTransfers: 3,
                    from: "EWR",
                    to: "BNA"
                }              
            ],
            buttonText: "View Deals"
        }
    ],
    isShowAll: false,
    button: {
        passive: "Show more results",
        active: "Hide"
    }
}

enum flightsItemsAction{
    SWAP_ACTIVE = "FLIGHTS-ITEMS_SWAP_ACTIVE",
    SET_ACTIVE_SELECT_LINK = "FLIGHTS-ITEMS_SET_ACTIVE_SELECT_LINK",
    HIDE_ACTIVE = "FLIGHTS-ITEMS_HIDE_ACTIVE",
    SWAP_SHOW_ALL = "FLIGHTS-ITEMS_SWAP_SHOW_ALL"
}

type flightsItemsHideActive = {
    type: flightsItemsAction.HIDE_ACTIVE
}

type flightsItemsSetActiveSelectLink = {
    type: flightsItemsAction.SET_ACTIVE_SELECT_LINK,
    payload : number
}

type flightsItemsSwapActive = {
    type: flightsItemsAction.SWAP_ACTIVE
}

type flightsItemsSwapShowAll = {
    type: flightsItemsAction.SWAP_SHOW_ALL
}

type flightsItemsActionType = 
    flightsItemsHideActive | flightsItemsSwapActive | flightsItemsSetActiveSelectLink | flightsItemsSwapShowAll
;

export const flightsItemsTextReducer = (state : flightsItems = defaultStore, action : flightsItemsActionType) : flightsItems => {
    switch(action.type){
        case flightsItemsAction.SWAP_ACTIVE:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, isActive: !state.header.select.isActive
                }}
            };
        case flightsItemsAction.SET_ACTIVE_SELECT_LINK:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, activeItem: action.payload
                }}
            };
        case flightsItemsAction.HIDE_ACTIVE:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, isActive: false
                }}
            };
        case flightsItemsAction.SWAP_SHOW_ALL:
            return{
                ...state,
                isShowAll: !(state.isShowAll)
            };
        default:
            return state;
    }
};

export const flightsItemsHideActiveAction = () : flightsItemsHideActive => ({
    type: flightsItemsAction.HIDE_ACTIVE
});
export const flightsItemsSetActiveSelectLink = (id : number) : flightsItemsSetActiveSelectLink => ({
    type: flightsItemsAction.SET_ACTIVE_SELECT_LINK, payload: id
})
export const flightsItemsSwapActiveAction = () : flightsItemsSwapActive => ({
    type: flightsItemsAction.SWAP_ACTIVE
});
export const flightsItemsSwapShowAll = () : flightsItemsSwapShowAll => ({
    type: flightsItemsAction.SWAP_SHOW_ALL
})