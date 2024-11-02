import { flightsHome, mapItemType, mapPartType } from "../../types"
//--------Intro--------
import introJpeg from "../../assets/img/flights/intro/background.jpeg"
import introWebp from "../../assets/img/flights/intro/background.webp"
//--------Map--------
import mapBackgroundJpeg from "../../assets/img/flights/map/background.jpeg"
import mapBackgroundWebp from "../../assets/img/flights/map/background.webp"
//----------------Webp--------
import subMapWebp_1 from "../../assets/img/flights/map/items/1/main.webp"
import subMapWebp_2 from "../../assets/img/flights/map/items/2/main.webp"
import subMapWebp_3 from "../../assets/img/flights/map/items/3/main.webp"
import subMapWebp_4 from "../../assets/img/flights/map/items/4/main.webp"
import subMapWebp_5 from "../../assets/img/flights/map/items/5/main.webp"
//----------------Jpeg--------
import subMapJpeg_1 from "../../assets/img/flights/map/items/1/main.jpeg"
import subMapJpeg_2 from "../../assets/img/flights/map/items/2/main.jpeg"
import subMapJpeg_3 from "../../assets/img/flights/map/items/3/main.jpeg"
import subMapJpeg_4 from "../../assets/img/flights/map/items/4/main.jpeg"
import subMapJpeg_5 from "../../assets/img/flights/map/items/5/main.jpeg"
//----------------Arrow--------
import subMapSvg_1 from "../../assets/img/flights/map/items/1/arrow.svg"
import subMapSvg_2 from "../../assets/img/flights/map/items/2/arrow.svg"
import subMapSvg_3 from "../../assets/img/flights/map/items/3/arrow.svg"
import subMapSvg_4 from "../../assets/img/flights/map/items/4/arrow.svg"
import subMapSvg_5 from "../../assets/img/flights/map/items/5/arrow.svg"
//--------Travels--------
//----------------Webp--------
import travelsWebp_1 from "../../assets/img/flights/travels/1/main.webp"
import travelsWebp_2 from "../../assets/img/flights/travels/2/main.webp"
import travelsWebp_3 from "../../assets/img/flights/travels/3/main.webp"
import travelsWebp_4 from "../../assets/img/flights/travels/4/main.webp"
//----------------Jpeg--------
import travelsJpeg_1 from "../../assets/img/flights/travels/1/main.jpeg"
import travelsJpeg_2 from "../../assets/img/flights/travels/2/main.jpeg"
import travelsJpeg_3 from "../../assets/img/flights/travels/3/main.jpeg"
import travelsJpeg_4 from "../../assets/img/flights/travels/4/main.jpeg"
//--------Offers--------
//----------------Webp--------
import offersWebp_1 from "../../assets/img/flights/offers/1/main.webp"
import offersWebp_2 from "../../assets/img/flights/offers/2/main.webp"
import offersWebp_3 from "../../assets/img/flights/offers/3/main.webp"
import offersWebp_4 from "../../assets/img/flights/offers/4/main.webp"
//----------------Jpeg--------
import offersJpeg_1 from "../../assets/img/flights/offers/1/main.jpeg"
import offersJpeg_2 from "../../assets/img/flights/offers/2/main.jpeg"
import offersJpeg_3 from "../../assets/img/flights/offers/3/main.jpeg"
import offersJpeg_4 from "../../assets/img/flights/offers/4/main.jpeg"

const defaultState : flightsHome = {
    intro:{
        heading : "Make your travel whishlist, we’ll do the rest",
        subheading : "Special offers to suit your plan",
        background: {webp: introWebp, jpeg: introJpeg},
    },
    map:{
        header:{
            title: "Let's go places together",
            text: "Discover the latest offers and news and start planning your next trip with us.",
            buttonShowMore: {
                active: "See All",
                passive: "Hide"
            }
        },
        items:[
            {
                image: {main: {srcs: {webp: subMapWebp_1, jpeg: subMapJpeg_1}, alt: "Text"}, arrow: {src: subMapSvg_1, alt: ""}},
                ticketNumb: 123, type: mapItemType.PartOfMap, location: mapPartType.Washington, linkPath: "#"
            },
            {
                image: {main: {srcs: {webp: subMapWebp_2, jpeg: subMapJpeg_2}, alt: "Text"}, arrow: {src: subMapSvg_2, alt: ""}},
                ticketNumb: 123, type: mapItemType.PartOfMap, location: mapPartType.Brazil, linkPath: "#"
            },
            {
                image: {main: {srcs: {webp: subMapWebp_3, jpeg: subMapJpeg_3}, alt: "Text"}, arrow: {src: subMapSvg_3, alt: ""}},
                ticketNumb: 123, type: mapItemType.PartOfMap, location: mapPartType.Alzhir, linkPath: "#"
            },
            {
                image: {main: {srcs: {webp: subMapWebp_4, jpeg: subMapJpeg_4}, alt: "Text"}, arrow: {src: subMapSvg_4, alt: ""}},
                ticketNumb: 123, type: mapItemType.PartOfMap, location: mapPartType.Aralsk, linkPath: "#"
            },
            {
                image: {main: {srcs: {webp: subMapWebp_5, jpeg: subMapJpeg_5}, alt: "Text"}, arrow: {src: subMapSvg_5, alt: ""}},
                ticketNumb: 123, type: mapItemType.PartOfMap, location: mapPartType.Japan, linkPath: "#"
            },
            {
                image: {srcs: {webp: subMapWebp_4, jpeg: subMapJpeg_4}, alt: "Text"},
                ticketNumb: 123, type: mapItemType.Default, linkPath: "#"
            },
            {
                image: {srcs: {webp: subMapWebp_2, jpeg: subMapJpeg_2}, alt: "Text"},
                ticketNumb: 123, type: mapItemType.Default, linkPath: "#"
            },
            {
                image: {srcs: {webp: subMapWebp_5, jpeg: subMapJpeg_5}, alt: "Text"},
                ticketNumb: 123, type: mapItemType.Default, linkPath: "#"
            }
        ],
        background: {webp: mapBackgroundWebp, jpeg: mapBackgroundJpeg}
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
        buttonBook: "Book Flight",
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

export const flightsReducer = (state : flightsHome = defaultState) : flightsHome => state;