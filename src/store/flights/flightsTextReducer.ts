import { flighsStore } from "../../types"
//--------------Intro--------------
import introJpeg from "../../assets/img/flights/intro/background.jpeg"
import introWebp from "../../assets/img/flights/intro/background.webp"
//--------------Map--------------
import mapJpeg from "../../assets/img/flights/map/background.jpeg"
import mapWebp from "../../assets/img/flights/map/background.webp" 
//--------------------------JPEG--------------
import mapJpeg_1 from "../../assets/img/flights/map/items/1/1.jpeg"
import mapJpeg_2 from "../../assets/img/flights/map/items/2/2.jpeg"
import mapJpeg_3 from "../../assets/img/flights/map/items/3/3.jpeg"
import mapJpeg_4 from "../../assets/img/flights/map/items/4/4.jpeg"
import mapJpeg_5 from "../../assets/img/flights/map/items/5/5.jpeg"
//--------------------------WEBP--------------
import mapWebp_1 from "../../assets/img/flights/map/items/1/1.webp"
import mapWebp_2 from "../../assets/img/flights/map/items/2/2.webp"
import mapWebp_3 from "../../assets/img/flights/map/items/3/3.webp"
import mapWebp_4 from "../../assets/img/flights/map/items/4/4.webp"
import mapWebp_5 from "../../assets/img/flights/map/items/5/5.webp"
//--------------------------SVG--------------
import mapSvg_1 from "../../assets/img/flights/map/items/1/1.svg"
import mapSvg_2 from "../../assets/img/flights/map/items/2/2.svg"
import mapSvg_3 from "../../assets/img/flights/map/items/3/3.svg"
import mapSvg_4 from "../../assets/img/flights/map/items/4/4.svg"
import mapSvg_5 from "../../assets/img/flights/map/items/5/5.svg"
//--------------Travels--------------
//--------------------------JPEG--------------
import travelsJpeg_1 from "../../assets/img/flights/travels/1/1.jpeg"
import travelsJpeg_2 from "../../assets/img/flights/travels/2/2.jpeg"
import travelsJpeg_3 from "../../assets/img/flights/travels/3/3.jpeg"
import travelsJpeg_4 from "../../assets/img/flights/travels/4/4.jpeg"
//--------------------------WEBP--------------
import travelsWebp_1 from "../../assets/img/flights/travels/1/1.webp"
import travelsWebp_2 from "../../assets/img/flights/travels/2/2.webp"
import travelsWebp_3 from "../../assets/img/flights/travels/3/3.webp"
import travelsWebp_4 from "../../assets/img/flights/travels/4/4.webp"
//--------------Offer--------------
import offerJpeg_1 from "../../assets/img/flights/offer/1/1.jpeg"
import offerJpeg_2 from "../../assets/img/flights/offer/2/2.jpeg"
import offerJpeg_3 from "../../assets/img/flights/offer/3/3.jpeg"
import offerJpeg_4 from "../../assets/img/flights/offer/4/4.jpeg"
//--------------------------WEBP--------------
import offerWebp_1 from "../../assets/img/flights/offer/1/1.webp"
import offerWebp_2 from "../../assets/img/flights/offer/2/2.webp"
import offerWebp_3 from "../../assets/img/flights/offer/3/3.webp"
import offerWebp_4 from "../../assets/img/flights/offer/4/4.webp"

const defaultStore : flighsStore  = {
    intro:{
        heading: "Make your travel whishlist, we’ll do the rest",
        subheading: "Special offers to suit your plan",
        background: {webp: introWebp, jpeg: introJpeg}
    },
    map:{
        header:{
            heading: "Let's go places together", 
            info: "Discover the latest offers and news and start planning your next trip with us.",
            button: "See All"
        },
        items:[
            {
                title: "James Doe", info: "Boarding Pass N’123", 
                image:{
                    srcs: {jpeg: mapJpeg_1, webp: mapWebp_1, svg: mapSvg_1},
                    alt: "Something"
                }
            },
            {
                title: "James Doe", info: "Boarding Pass N’123", 
                image:{
                    srcs: {jpeg: mapJpeg_2, webp: mapWebp_2, svg: mapSvg_2},
                    alt: "Something"
                }
            },
            {
                title: "James Doe", info: "Boarding Pass N’123", 
                image:{
                    srcs: {jpeg: mapJpeg_3, webp: mapWebp_3, svg: mapSvg_3},
                    alt: "Something"
                }
            },
            {
                title: "James Doe", info: "Boarding Pass N’123", 
                image:{
                    srcs: {jpeg: mapJpeg_4, webp: mapWebp_4, svg: mapSvg_4},
                    alt: "Something"
                }
            },
            {
                title: "James Doe", info: "Boarding Pass N’123", 
                image:{
                    srcs: {jpeg: mapJpeg_5, webp: mapWebp_5, svg: mapSvg_5},
                    alt: "Something"
                }
            }
        ],
        background: {webp: mapWebp, jpeg: mapJpeg}
    },
    travels:{
        header:{
            heading: "Fall into travel", 
            info: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.",
            button: "See All"
        },
        items:[
            {
                title: "Melbourne", subtitle: "An amazing journey", price: 700, button: "Book Flight", href: "#",
                image: {srcs: {webp: travelsWebp_1, jpeg: travelsJpeg_1}, alt: "Subimage"}
            },
            {
                title: "Paris", subtitle: "A Paris Adventure", price: 600, button: "Book Flight", href: "#",
                image: {srcs: {webp: travelsWebp_2, jpeg: travelsJpeg_2}, alt: "Subimage"}
            },
            {
                title: "London", subtitle: "London Eye Adventure", price: 350, button: "Book Flight", href: "#",
                image: {srcs: {webp: travelsWebp_3, jpeg: travelsJpeg_3}, alt: "Subimage"}
            },
            {
                title: "Melbourne", subtitle: "Amazing Streets", price: 700, button: "Book Flight", href: "#",
                image: {srcs: {webp: travelsWebp_4, jpeg: travelsJpeg_4}, alt: "Subimage"}
            },
        ]
    },
    offer:{
        header:{
            heading: "Fall into travel", 
            info: "Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, we’ve got the travel tools to get you to your destination.",
            button: "See All",
        },
        item:{
            title: "Backpacking Sri Lanka",
            info: "Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.",
            price: 700,
            button: "Book Flight",
            href: "#",
            images:[
                {srcs: {webp: offerWebp_1, jpeg: offerJpeg_1}, alt: "Subimage"},
                {srcs: {webp: offerWebp_2, jpeg: offerJpeg_2}, alt: "Subimage"},
                {srcs: {webp: offerWebp_3, jpeg: offerJpeg_3}, alt: "Subimage"},
                {srcs: {webp: offerWebp_4, jpeg: offerJpeg_4}, alt: "Subimage"}
            ]
        }
    }
}

export const flightsTextReducer = ((state : flighsStore = defaultStore) : flighsStore => state);