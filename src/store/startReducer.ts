import { start, travelAvailable } from "../types";
//--------Intro--------
import introJpeg from "../assets/img/start/intro/background.jpeg"
import introWebp from "../assets/img/start/intro/background.webp"
//--------Travels--------
//----------------Webp--------
import travelsWebp_1 from "../assets/img/start/travels/1/main.webp"
import travelsWebp_2 from "../assets/img/start/travels/2/main.webp"
import travelsWebp_3 from "../assets/img/start/travels/3/main.webp"
import travelsWebp_4 from "../assets/img/start/travels/4/main.webp"
import travelsWebp_5 from "../assets/img/start/travels/5/main.webp"
import travelsWebp_6 from "../assets/img/start/travels/6/main.webp"
import travelsWebp_7 from "../assets/img/start/travels/7/main.webp"
import travelsWebp_8 from "../assets/img/start/travels/8/main.webp"
import travelsWebp_9 from "../assets/img/start/travels/9/main.webp"
//----------------Jpeg--------
import travelsJpeg_1 from "../assets/img/start/travels/1/main.jpeg"
import travelsJpeg_2 from "../assets/img/start/travels/2/main.jpeg"
import travelsJpeg_3 from "../assets/img/start/travels/3/main.jpeg"
import travelsJpeg_4 from "../assets/img/start/travels/4/main.jpeg"
import travelsJpeg_5 from "../assets/img/start/travels/5/main.jpeg"
import travelsJpeg_6 from "../assets/img/start/travels/6/main.jpeg"
import travelsJpeg_7 from "../assets/img/start/travels/7/main.jpeg"
import travelsJpeg_8 from "../assets/img/start/travels/8/main.jpeg"
import travelsJpeg_9 from "../assets/img/start/travels/9/main.jpeg"
//--------Choose--------
//----------------Webp--------
import flightsWebp from "../assets/img/start/choose/flights/main.webp"
import hotelsWebp from "../assets/img/start/choose/hotels/main.webp"
//----------------Jpeg--------
import flightsJpeg from "../assets/img/start/choose/flights/main.jpeg"
import hotelsJpeg from "../assets/img/start/choose/hotels/main.jpeg"
//--------Reviews--------
//----------------Webp--------
import reviewsWebp_1 from "../assets/img/start/reviews/1/main.webp"
import reviewsWebp_2 from "../assets/img/start/reviews/2/main.webp"
import reviewsWebp_3 from "../assets/img/start/reviews/3/main.webp"
//----------------Jpeg--------
import reviewsJpeg_1 from "../assets/img/start/reviews/1/main.jpeg"
import reviewsJpeg_2 from "../assets/img/start/reviews/2/main.jpeg"
import reviewsJpeg_3 from "../assets/img/start/reviews/3/main.jpeg"
//--------Google--------
import googleLogo from "../assets/img/logos/google.svg"

const defaultState : start = {
    intro:{
        background: {webp: introWebp, jpeg: introJpeg},
        supheading: "Helping Others",
        heading: "Live & Travel",
        subheading: "Special offers to suit your plan"
    },
    travels:{
        header:{
            title: "Plan your perfect trip",
            text: "Search Flights & Places Hire to our most popular destinations",
            buttonShowMore: {
                active: "See more places",
                passive: "Hide"
            }
        },
        items:[
            {
                image: {srcs: {webp: travelsWebp_1, jpeg: travelsJpeg_1}, alt: "Text"}, city: "Istanbul", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_2, jpeg: travelsJpeg_2}, alt: "Text"}, city: "Sydney", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_3, jpeg: travelsJpeg_3}, alt: "Text"}, city: "Baku", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_4, jpeg: travelsJpeg_4}, alt: "Text"}, city: "Malé", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_5, jpeg: travelsJpeg_5}, alt: "Text"}, city: "Paris", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_6, jpeg: travelsJpeg_6}, alt: "Text"}, city: "New York", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_7, jpeg: travelsJpeg_7}, alt: "Text"}, city: "London", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_8, jpeg: travelsJpeg_8}, alt: "Text"}, city: "Tokyo", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_9, jpeg: travelsJpeg_9}, alt: "Text"}, city: "Dubai", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            },
            {
                image: {srcs: {webp: travelsWebp_9, jpeg: travelsJpeg_9}, alt: "Text"}, city: "Dubai", 
                available: [travelAvailable.Flights, travelAvailable.Hotels, travelAvailable.Resorts]
            }
        ],
        maxShow: 9
    },
    choose:{
        flights:{
            title: "Flights",
            subtitle: "Search Flights & Places Hire to our most popular destinations",
            link: "Show Filghts",
            background: {webp: flightsWebp, jpeg: flightsJpeg}
        },
        hotels:{
            title: "Hotels",
            subtitle: "Search hotels & Places Hire to our most popular destinations",
            link: "Show Hotels",
            background: {webp: hotelsWebp, jpeg: hotelsJpeg}
        }
    },
    reviews:{
        header:{
            title: "Reviews",
            text: "What people says about Golobe facilities",
            buttonShowMore: {
                active: "See more places",
                passive: "Hide"
            }
        },
        items:[
            {
                title: "A real sense of community, nurtured", 
                info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                countStars: 5,
                author: "Olga",
                hotel:{
                    company: "Weave Studios",
                    location: "Kai Tak",
                    linkToLocation: "#"
                },
                image: {srcs: {webp: reviewsWebp_1, jpeg: reviewsJpeg_1}, alt: "Text"}
            },
            {
                title: "A real sense of community, nurtured", 
                info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                countStars: 5,
                author: "Olga",
                hotel:{
                    company: "Weave Studios",
                    location: "Kai Tak",
                    linkToLocation: "#"
                },
                image: {srcs: {webp: reviewsWebp_2, jpeg: reviewsJpeg_2}, alt: "Text"}
            },
            {
                title: "A real sense of community, nurtured", 
                info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                countStars: 5,
                author: "Olga",
                hotel:{
                    company: "Weave Studios",
                    location: "Kai Tak",
                    linkToLocation: "#"
                },
                image: {srcs: {webp: reviewsWebp_3, jpeg: reviewsJpeg_3}, alt: "Text"}
            },
            {
                title: "A real sense of community, nurtured", 
                info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                countStars: 5,
                author: "Olga",
                hotel:{
                    company: "Weave Studios",
                    location: "Kai Tak",
                    linkToLocation: "#"
                },
                image: {srcs: {webp: reviewsWebp_3, jpeg: reviewsJpeg_3}, alt: "Text"}
            }
        ],
        buttonViewAll: "View more",
        linkToLocation: {
            googleLogo: googleLogo,
            subGoogleLogo: "Google"
        },
        maxShow: 3
    }
}

export const startReducer = (state : start = defaultState) : start => state;