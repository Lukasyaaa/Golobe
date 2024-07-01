import { header, intro, sectionHeaderItems, tripVariantsItem, choiceItem } from "../types";
//--------------Trip Variant--------------
//--------------------------WEBP--------------
import tripVariantWebp_1 from "../assets/img/main/trip-variants/1.webp"
import tripVariantWebp_2 from "../assets/img/main/trip-variants/2.webp"
import tripVariantWebp_3 from "../assets/img/main/trip-variants/3.webp"
import tripVariantWebp_4 from "../assets/img/main/trip-variants/4.webp"
import tripVariantWebp_5 from "../assets/img/main/trip-variants/5.webp"
import tripVariantWebp_6 from "../assets/img/main/trip-variants/6.webp"
import tripVariantWebp_7 from "../assets/img/main/trip-variants/7.webp"
import tripVariantWebp_8 from "../assets/img/main/trip-variants/8.webp"
import tripVariantWebp_9 from "../assets/img/main/trip-variants/9.webp"
//--------------------------JPEG--------------
import tripVariantJpeg_1 from "../assets/img/main/trip-variants/1.jpeg"
import tripVariantJpeg_2 from "../assets/img/main/trip-variants/2.jpeg"
import tripVariantJpeg_3 from "../assets/img/main/trip-variants/3.jpeg"
import tripVariantJpeg_4 from "../assets/img/main/trip-variants/4.jpeg"
import tripVariantJpeg_5 from "../assets/img/main/trip-variants/5.jpeg"
import tripVariantJpeg_6 from "../assets/img/main/trip-variants/6.jpeg"
import tripVariantJpeg_7 from "../assets/img/main/trip-variants/7.jpeg"
import tripVariantJpeg_8 from "../assets/img/main/trip-variants/8.jpeg"
import tripVariantJpeg_9 from "../assets/img/main/trip-variants/9.jpeg"
//--------------Choice--------------
//--------------------------WEBP--------------
import choiceWebp_1 from "../assets/img/main/choice/1.webp"
import choiceWebp_2 from "../assets/img/main/choice/2.webp"
//--------------------------JPEG--------------
import choiceJpeg_1 from "../assets/img/main/choice/1.jpeg"
import choiceJpeg_2 from "../assets/img/main/choice/2.jpeg"

interface store{
    header : header,
    intro : intro,
    tripVariants : sectionHeaderItems<tripVariantsItem>,
    choice : choiceItem[],
}

const defaultStore : store  = {
    header:{
        links:[
            {href: "#", value: "Find Flight"},
            {href: "#", value: "Find Hotels"},
        ],
        buttons:[
            {href: "#", value: "Login"},
            {href: "#", value: "Sign up"},
        ]
    },
    intro:{
        start:{
            supheading: "Helping Others",
            heading: "Live & Travel",
            subheading: "Special offers to suit your plan",
        },
        flights:{
            heading: "Make your travel whishlist, we’ll do the rest",
            subheading: "Special offers to suit your plan",
        },
        hotels:{
            heading: "Make your travel whishlist, we’ll do the rest",
            subheading: "Special offers to suit your plan",
        },
    },
    tripVariants:{
        items:[
            {
                image: {srcs: {webp: tripVariantWebp_1, jpeg: tripVariantJpeg_1}, alt: "Istanbul, Turkey"}, 
                title: "Istanbul, Turkey", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_2, jpeg: tripVariantJpeg_2}, alt: "Sydney, Australia"}, 
                title: "Sydney, Australia", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_3, jpeg: tripVariantJpeg_3}, alt: "Baku, Azerbaijan"}, 
                title: "Baku, Azerbaijan", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_4, jpeg: tripVariantJpeg_4}, alt: "Malé, Maldives"}, 
                title: "Malé, Maldives", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_5, jpeg: tripVariantJpeg_5}, alt: "Paris, France"}, 
                title: "Paris, France", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_6, jpeg: tripVariantJpeg_6}, alt: "New York, US"}, 
                title: "New York, US", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_7, jpeg: tripVariantJpeg_7}, alt: "London, UK"}, 
                title: "London, UK", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_8, jpeg: tripVariantJpeg_8}, alt: "Tokyo, Japan"}, 
                title: "Tokyo, Japan", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
            {
                image: {srcs: {webp: tripVariantWebp_9, jpeg: tripVariantJpeg_9}, alt: "Dubai, UAE"}, 
                title: "Dubai, UAE", features: ["Flights", "Hotels", "Resorts"],
                href: "#",
            },
        ],
        header:{
            heading: "Plan your perfect trip", 
            info: "Search Flights & Places Hire to our most popular destinations",
            button: "See more places",
        },
    },
    choice:[
        {
            image: {srcs: {webp: choiceWebp_1, jpeg: choiceJpeg_1}, alt: "Flights"},
            text:{
                heading: "Flights", 
                info: "Search Flights & Places Hire to our most popular destinations", 
                button: "Show Filghts",
            },
        },
        {
            image: {srcs: {webp: choiceWebp_2, jpeg: choiceJpeg_2}, alt: "Hotels"},
            text:{ 
                heading: "Hotels", 
                info: "Search hotels & Places Hire to our most popular destinations", 
                button: "Show Hotels",
            },
        },
    ],
}

export const anotherReducer = ((store = defaultStore) => store);