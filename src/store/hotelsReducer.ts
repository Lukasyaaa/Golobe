import { flights, hotels, mapItemType, mapPartType, recentItem } from "../types"
//--------Intro--------
import introJpeg from "../assets/img/flights/intro/background.jpeg"
import introWebp from "../assets/img/flights/intro/background.webp"
//--------Travels--------
//----------------Webp--------
import travelsStartWebp_1 from "../assets/img/start/travels/1/main.webp"
import travelsStartWebp_2 from "../assets/img/start/travels/2/main.webp"
import travelsStartWebp_3 from "../assets/img/start/travels/3/main.webp"
import travelsStartWebp_4 from "../assets/img/start/travels/4/main.webp"
//----------------Jpeg--------
import travelsStartJpeg_1 from "../assets/img/start/travels/1/main.jpeg"
import travelsStartJpeg_2 from "../assets/img/start/travels/2/main.jpeg"
import travelsStartJpeg_3 from "../assets/img/start/travels/3/main.jpeg"
import travelsStartJpeg_4 from "../assets/img/start/travels/4/main.jpeg"
//----------------Webp--------
import travelsWebp_1 from "../assets/img/flights/travels/1/main.webp"
import travelsWebp_2 from "../assets/img/flights/travels/2/main.webp"
import travelsWebp_3 from "../assets/img/flights/travels/3/main.webp"
import travelsWebp_4 from "../assets/img/flights/travels/4/main.webp"
//----------------Jpeg--------
import travelsJpeg_1 from "../assets/img/flights/travels/1/main.jpeg"
import travelsJpeg_2 from "../assets/img/flights/travels/2/main.jpeg"
import travelsJpeg_3 from "../assets/img/flights/travels/3/main.jpeg"
import travelsJpeg_4 from "../assets/img/flights/travels/4/main.jpeg"
//--------Offers--------
//----------------Webp--------
import offersWebp_1 from "../assets/img/flights/offers/1/main.webp"
import offersWebp_2 from "../assets/img/flights/offers/2/main.webp"
import offersWebp_3 from "../assets/img/flights/offers/3/main.webp"
import offersWebp_4 from "../assets/img/flights/offers/4/main.webp"
//----------------Jpeg--------
import offersJpeg_1 from "../assets/img/flights/offers/1/main.jpeg"
import offersJpeg_2 from "../assets/img/flights/offers/2/main.jpeg"
import offersJpeg_3 from "../assets/img/flights/offers/3/main.jpeg"
import offersJpeg_4 from "../assets/img/flights/offers/4/main.jpeg"

const defaultState : hotels = {
    intro:{
        heading : "Make your travel whishlist, we’ll do the rest",
        subheading : "Special offers to suit your plan",
        background: {webp: introWebp, jpeg: introJpeg},
    },
    recent:{
        heading:"Your recent searches",
        items:[
            {
                image: {srcs: {webp: travelsStartWebp_1, jpeg: travelsStartJpeg_1}, alt: "Text"},
                city: "Istanbul", countPlaces: 325, linkPath: "#"
            },
            {
                image: {srcs: {webp: travelsStartWebp_2, jpeg: travelsStartJpeg_2}, alt: "Text"},
                city: "Istanbul", countPlaces: 325, linkPath: "#"
            },
            {
                image: {srcs: {webp: travelsStartWebp_3, jpeg: travelsStartJpeg_3}, alt: "Text"},
                city: "Istanbul", countPlaces: 325, linkPath: "#"
            },
            {
                image: {srcs: {webp: travelsStartWebp_4, jpeg: travelsStartJpeg_4}, alt: "Text"},
                city: "Istanbul", countPlaces: 325, linkPath: "#"
            }
        ]
    },
    travels:{
        header:{
            title: "Fall into travel",
            text: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.",
            buttonShowMore: {
                active: "See All",
                passive: "Hide"
            }
        },
        items:[
            {
                image: {webp: travelsWebp_1, jpeg: travelsJpeg_1}, 
                city: "Melbourne", shortInfo: "An amazing journey", price: 700, linkPath: "#"
            },
            {
                image: {webp: travelsWebp_2, jpeg: travelsJpeg_2}, 
                city: "Paris", shortInfo: "A Paris Adventure", price: 600, linkPath: "#"
            },
            {
                image: {webp: travelsWebp_3, jpeg: travelsJpeg_3}, 
                city: "London", shortInfo: "London eye adventure", price: 350, linkPath: "#"
            },
            {
                image: {webp: travelsWebp_4, jpeg: travelsJpeg_4}, 
                city: "Columbia", shortInfo: "Amazing streets", price: 700, linkPath: "#"
            },
            {
                image: {webp: travelsWebp_4, jpeg: travelsJpeg_4}, 
                city: "Columbia", shortInfo: "Amazing streets", price: 700, linkPath: "#"
            }
        ],
        buttonBook: "Book a Hotel",
        maxShow: 4
    },
    offers:{
        header:{
            title: "Fall into travel",
            text: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.",
            buttonShowMore: {
                active: "See All",
                passive: "Hide"
            }
        },
        items:[
            {
                title: "Backpacking Sri Lanka", price: 700, info: "Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
                linkPath: "#",
                images: [
                    {srcs: {webp: offersWebp_1, jpeg: offersJpeg_1}, alt: ""},
                    {srcs: {webp: offersWebp_2, jpeg: offersJpeg_2}, alt: ""},
                    {srcs: {webp: offersWebp_3, jpeg: offersJpeg_3}, alt: ""},
                    {srcs: {webp: offersWebp_4, jpeg: offersJpeg_4}, alt: ""},
                ]
            },
            {
                title: "Backpacking Sri Lanka", price: 700, info: "Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
                linkPath: "#",
                images: [
                    {srcs: {webp: offersWebp_1, jpeg: offersJpeg_1}, alt: ""},
                    {srcs: {webp: offersWebp_2, jpeg: offersJpeg_2}, alt: ""},
                    {srcs: {webp: offersWebp_3, jpeg: offersJpeg_3}, alt: ""},
                    {srcs: {webp: offersWebp_4, jpeg: offersJpeg_4}, alt: ""},
                ]
            },
            {
                title: "Backpacking Sri Lanka", price: 700, info: "Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
                linkPath: "#",
                images: [
                    {srcs: {webp: offersWebp_1, jpeg: offersJpeg_1}, alt: ""},
                    {srcs: {webp: offersWebp_2, jpeg: offersJpeg_2}, alt: ""},
                    {srcs: {webp: offersWebp_3, jpeg: offersJpeg_3}, alt: ""},
                    {srcs: {webp: offersWebp_4, jpeg: offersJpeg_4}, alt: ""},
                ]
            }
        ],
        buttonBook: "Book Flight",
        idShowedItem: 0
    }
}

enum hotelsAction{
    ADD_RECENT = "HOTELS_ADD-RECENT",
    REMOVE_RECENT = "HOTELS_REMOVE-RECENT"
}

interface hotelsAddRecent{
    type : hotelsAction.ADD_RECENT,
    payload : recentItem
}
interface hotelsRemoveRecent{
    type : hotelsAction.REMOVE_RECENT,
    payload : number
}

type hotelsActionType = hotelsAddRecent | hotelsRemoveRecent;

export const hotelsReducer = (state : hotels = defaultState, action : hotelsActionType) : hotels => {
    switch(action.type){
        case hotelsAction.ADD_RECENT:
            return {
                ...state,
                recent:{
                    ...state.recent, items: [...state.recent.items, action.payload]
                }
            };
        case hotelsAction.REMOVE_RECENT:
            return {
                ...state,
                recent:{
                    ...state.recent, items: state.recent.items.filter((_, i) => i !== action.payload)
                }
            };
        default:
            return state;
    }
}