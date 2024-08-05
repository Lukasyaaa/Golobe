import { hotelsItems, amenities, freeOptions, placesType } from "../../types";
//--------------WEBP--------------
import hotelsWebp_1 from "../../assets/img/hotels-configurate/1/1.webp"
import hotelsWebp_2 from "../../assets/img/hotels-configurate/2/2.webp"
import hotelsWebp_3 from "../../assets/img/hotels-configurate/3/3.webp"
import hotelsWebp_4 from "../../assets/img/hotels-configurate/4/4.webp"
//--------------JPEG--------------
import hotelsJpeg_1 from "../../assets/img/hotels-configurate/1/1.jpeg"
import hotelsJpeg_2 from "../../assets/img/hotels-configurate/2/2.jpeg"
import hotelsJpeg_3 from "../../assets/img/hotels-configurate/3/3.jpeg"
import hotelsJpeg_4 from "../../assets/img/hotels-configurate/4/4.jpeg"

const defaultStore : hotelsItems = {
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
            id: 0,
            type: placesType.Hotels,
            image: {srcs: {webp: hotelsWebp_1, jpeg: hotelsJpeg_1}, alt: ""},
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: {
                pre: "starting from",
                main: 240,
                post: "excl. tax"
            },
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            amenities: {
                items: [amenities.AirConditioned, amenities.Fitness, amenities.OutdoorPool, freeOptions.AirportShuttle],
                isActive: false
            },
            stars:{
                count: 5,
                post: "Star Hotel"
            },
            review:{
                rating: 4.2,
                ratingText: "Very Good",
                countReviews: 54
            },
            buttonText: "View Place"
        },
        {
            id: 1,
            type: placesType.Hotels,
            image: {srcs: {webp: hotelsWebp_2, jpeg: hotelsJpeg_2}, alt: ""},
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: {
                pre: "starting from",
                main: 240,
                post: "excl. tax"
            },
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            amenities: {
                items: [amenities.AirConditioned, amenities.Fitness, amenities.IndoorPool, freeOptions.AirportShuttle],
                isActive: false
            },
            stars:{
                count: 5,
                post: "Star Hotel"
            },
            review:{
                rating: 4.2,
                ratingText: "Very Good",
                countReviews: 54
            },
            buttonText: "View Place"
        },
        {
            id: 2,
            type: placesType.Hotels,
            image: {srcs: {webp: hotelsWebp_3, jpeg: hotelsJpeg_3}, alt: ""},
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: {
                pre: "starting from",
                main: 240,
                post: "excl. tax"
            },
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            amenities: {
                items: [amenities.AirConditioned, amenities.Fitness, amenities.Gym, freeOptions.Internet],
                isActive: false
            },
            stars:{
                count: 5,
                post: "Star Hotel"
            },
            review:{
                rating: 1,
                ratingText: "Very Good",
                countReviews: 54
            },
            buttonText: "View Place"
        },
        {
            id: 3,
            type: placesType.Motels,
            image: {srcs: {webp: hotelsWebp_4, jpeg: hotelsJpeg_4}, alt: ""},
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: {
                pre: "starting from",
                main: 240,
                post: "excl. tax"
            },
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            amenities: {
                items:[amenities.AroundTheClockFrontDesk, amenities.Fitness, amenities.BarLounge, freeOptions.Breakfast],
                isActive: false
            },
            stars:{
                count: 5,
                post: "Star Hotel"
            },
            review:{
                rating: 2.5,
                ratingText: "Very Good",
                countReviews: 54
            },
            buttonText: "View Place"
        },
        {
            id: 4,
            type: placesType.Resorts,
            image: {srcs: {webp: hotelsWebp_4, jpeg: hotelsJpeg_1}, alt: ""},
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: {
                pre: "starting from",
                main: 240,
                post: "excl. tax"
            },
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            amenities: {
                items: [amenities.AirConditioned, amenities.Fitness, amenities.FreeWiFi, freeOptions.Parking],
                isActive: false
            },
            stars:{
                count: 5,
                post: "Star Hotel"
            },
            review:{
                rating: 3.2,
                ratingText: "Very Good",
                countReviews: 54
            },
            buttonText: "View Place"
        },
        {
            id: 4,
            type: placesType.Hotels,
            image: {srcs: {webp: hotelsWebp_4, jpeg: hotelsJpeg_1}, alt: ""},
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: {
                pre: "starting from",
                main: 240,
                post: "excl. tax"
            },
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            amenities: {
                items: [amenities.AirConditioned, amenities.Fitness, amenities.FreeWiFi, freeOptions.Parking],
                isActive: false
            },
            stars:{
                count: 5,
                post: "Star Hotel"
            },
            review:{
                rating: 3.2,
                ratingText: "Very Good",
                countReviews: 54
            },
            buttonText: "View Place"
        },
        {
            id: 4,
            type: placesType.Hotels,
            image: {srcs: {webp: hotelsWebp_4, jpeg: hotelsJpeg_1}, alt: ""},
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: {
                pre: "starting from",
                main: 240,
                post: "excl. tax"
            },
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            amenities: {
                items: [amenities.AirConditioned, amenities.Fitness, amenities.FreeWiFi, freeOptions.Parking],
                isActive: false
            },
            stars:{
                count: 5,
                post: "Star Hotel"
            },
            review:{
                rating: 3.2,
                ratingText: "Very Good",
                countReviews: 54
            },
            buttonText: "View Place"
        }
    ],
    isShowAll: false,
    button: {
        passive: "Show more results",
        active: "Hide"
    }
}

enum hotelsItemsAction{
    SWAP_ACTIVE = "HOTELS-ITEMS_SWAP_ACTIVE",
    SET_ACTIVE_SELECT_LINK = "HOTELS-ITEMS_SET_ACTIVE_SELECT_LINK",
    HIDE_ACTIVE = "HOTELS-ITEMS_HIDE_ACTIVE",
    SWAP_HOTELS_ACTIVE = "SWAP_HOTELS_ACTIVE",
    HIDE_ITEM_ACTIVE = "HIDE_ITEM_ACTIVE",
    SWAP_SHOW_ALL = "HOTELS-ITEMS_SWAP_SHOW_ALL"
}

type hotelsItemsHideActive = {
    type: hotelsItemsAction.HIDE_ACTIVE
}

type hotelsItemsSetActiveSelectLink = {
    type: hotelsItemsAction.SET_ACTIVE_SELECT_LINK,
    payload : number
}

type hotelsItemsSwapActive = {
    type: hotelsItemsAction.SWAP_ACTIVE
}

type hotelsItemsSwapItemActive = {
    type: hotelsItemsAction.SWAP_HOTELS_ACTIVE,
    payload: number
}

type hotelsItemsHideItemActive = {
    type: hotelsItemsAction.HIDE_ITEM_ACTIVE
}

type hotelsItemsSwapShowAll = {
    type: hotelsItemsAction.SWAP_SHOW_ALL
}

type hotelsItemsActionType = 
    hotelsItemsHideActive | hotelsItemsSwapActive | hotelsItemsSetActiveSelectLink | 
    hotelsItemsSwapItemActive | hotelsItemsHideItemActive | hotelsItemsSwapShowAll
;

export const hotelsItemsReducer = (state : hotelsItems = defaultStore, action : hotelsItemsActionType) : hotelsItems => {
    switch(action.type){
        case hotelsItemsAction.SWAP_ACTIVE:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, isActive: !state.header.select.isActive
                }}
            };
        case hotelsItemsAction.SET_ACTIVE_SELECT_LINK:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, activeItem: action.payload
                }}
            };
        case hotelsItemsAction.HIDE_ACTIVE:
            return{
                ...state,
                header: {...state.header, select: {
                    ...state.header.select, isActive: false
                }}
            };
        case hotelsItemsAction.SWAP_HOTELS_ACTIVE:
            return{
                ...state,
                items: state.items.map((hotel, i) => ({
                    ...hotel,
                    amenities: {...hotel.amenities, isActive: (i === action.payload) ? !(hotel.amenities.isActive) : hotel.amenities.isActive}
                }))
            };
        case hotelsItemsAction.HIDE_ITEM_ACTIVE:
            return{
                ...state,
                items: state.items.map((hotel, i) => ({
                    ...hotel,
                    amenities: {...hotel.amenities, isActive: false}
                }))
            };
        case hotelsItemsAction.SWAP_SHOW_ALL:
            return{
                ...state,
                isShowAll: !(state.isShowAll)
            };
        default:
            return state;
    }
};

export const hotelsItemsHideActiveAction = () : hotelsItemsHideActive => ({
    type: hotelsItemsAction.HIDE_ACTIVE
});
export const hotelsItemsSetActiveSelectLink = (id : number) : hotelsItemsSetActiveSelectLink => ({
    type: hotelsItemsAction.SET_ACTIVE_SELECT_LINK, payload: id
})
export const hotelsItemsSwapActiveAction = () : hotelsItemsSwapActive => ({
    type: hotelsItemsAction.SWAP_ACTIVE
});
export const hotelsItemsSwapItemActiveAction = (id : number) : hotelsItemsSwapItemActive => ({
    type: hotelsItemsAction.SWAP_HOTELS_ACTIVE, payload: id
})
export const hotelsItemsHideItemActiveAction = () : hotelsItemsHideItemActive => ({
    type: hotelsItemsAction.HIDE_ITEM_ACTIVE
})
export const hotelsItemsSwapShowAll = () : hotelsItemsSwapShowAll => ({
    type: hotelsItemsAction.SWAP_SHOW_ALL
})