import { flightsItems, meridiem, airlines } from "../../types";
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
            images: [
                {srcs: {webp: qatarJpeg, jpeg: qatarWebp}, alt: airlines.Qatar}
            ],
            ratingNumb: 1,
            ratingText: "Very Good",
            subprice: "starting from",
            countReviews: 54,
            price: 75,
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
            images: [
                {srcs: {jpeg: emiratesJpeg, webp: emiratesWebp}, alt: airlines.Emirates},
            ],
            ratingNumb: 3,
            ratingText: "Very Good",
            countReviews: 54,
            subprice: "starting from",
            price: 550,
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
            images: [
                {srcs: {webp: flyDubaiJpeg, jpeg: flyDubaiWebp}, alt: airlines.FlyDubai}
            ],
            ratingNumb: 5,
            ratingText: "Very Good",
            subprice: "starting from",
            countReviews: 54,
            price: 125,
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
            images: [
                {srcs: {webp: etihadJpeg, jpeg: etihadWebp}, alt: airlines.Etihad}
            ],
            ratingNumb: 4,
            ratingText: "Very Good",
            subprice: "starting from",
            countReviews: 54,
            price: 55,
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
            images: [
                {srcs: {webp: "", jpeg: ""}, alt: ""}
            ],
            ratingNumb: 2.5,
            ratingText: "Very Good",
            subprice: "starting from",
            countReviews: 54,
            price: 250,
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
    button: "Show more results"
}

enum flightsItemsAction{
    SWAP_ACTIVE = "FLIGHTS-ITEMS_SWAP_ACTIVE",
    HIDE_ACTIVE = "FLIGHTS-ITEMS_HIDE_ACTIVE"
}

type flightsItemsHideActive = {
    type: flightsItemsAction.HIDE_ACTIVE
}

type flightsItemsSwapActive = {
    type: flightsItemsAction.SWAP_ACTIVE
}

type flightsItemsActionType = flightsItemsHideActive | flightsItemsSwapActive;

export const flightsItemsTextReducer = (state : flightsItems = defaultStore, action : flightsItemsActionType) : flightsItems => {
    switch(action.type){
        case flightsItemsAction.SWAP_ACTIVE:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, isActive: !state.header.select.isActive
                }}
            }
        case flightsItemsAction.HIDE_ACTIVE:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, isActive: false
                }}
            }
        default:
            return state;
    }
};

export const flightsItemsHideActiveAction = () : flightsItemsHideActive => ({
    type: flightsItemsAction.HIDE_ACTIVE,
});
export const flightsItemsSwapActiveAction = () : flightsItemsSwapActive => ({
    type: flightsItemsAction.SWAP_ACTIVE,
});