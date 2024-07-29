import { hotelsStore } from "../../types"
//--------------Intro--------------
import introWebp from "../../assets/img/hotels/intro/background.webp"
import introJpeg from "../../assets/img/hotels/intro/background.jpeg"
//--------------Travels--------------
//--------------------------JPEG--------------
import travelsJpeg_1 from "../../assets/img/hotels/travels/1/1.jpeg"
import travelsJpeg_2 from "../../assets/img/hotels/travels/2/2.jpeg"
import travelsJpeg_3 from "../../assets/img/hotels/travels/3/3.jpeg"
import travelsJpeg_4 from "../../assets/img/hotels/travels/4/4.jpeg"
//--------------------------WEBP--------------
import travelsWebp_1 from "../../assets/img/hotels/travels/1/1.webp"
import travelsWebp_2 from "../../assets/img/hotels/travels/2/2.webp"
import travelsWebp_3 from "../../assets/img/hotels/travels/3/3.webp"
import travelsWebp_4 from "../../assets/img/hotels/travels/4/4.webp"
//--------------Offer--------------
import offerJpeg_1 from "../../assets/img/hotels/offer/1/1.jpeg"
import offerJpeg_2 from "../../assets/img/hotels/offer/2/2.jpeg"
import offerJpeg_3 from "../../assets/img/hotels/offer/3/3.jpeg"
import offerJpeg_4 from "../../assets/img/hotels/offer/4/4.jpeg"
//--------------------------WEBP--------------
import offerWebp_1 from "../../assets/img/hotels/offer/1/1.webp"
import offerWebp_2 from "../../assets/img/hotels/offer/2/2.webp"
import offerWebp_3 from "../../assets/img/hotels/offer/3/3.webp"
import offerWebp_4 from "../../assets/img/hotels/offer/4/4.webp"

const defaultStore : hotelsStore  = {
    intro:{
        heading: "Make your travel whishlist, we’ll do the rest",
        subheading: "Special offers to suit your plan",
        background: {webp: introWebp, jpeg: introJpeg}
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

export const hotelsTextReducer = (state : hotelsStore = defaultStore) => state;