import { amenities, hotels, hotelType, sortTitles } from "../../types"
import firstItemImageMainJpeg from "../../assets/img/hotels/items/1/main.jpeg"
import firstItemImageMainWebp from "../../assets/img/hotels/items/1/main.webp"
import secondItemImageMainJpeg from "../../assets/img/hotels/items/2/main.jpeg"
import secondItemImageMainWebp from "../../assets/img/hotels/items/2/main.webp"
import thirdItemImageMainJpeg from "../../assets/img/hotels/items/3/main.jpeg"
import thirdItemImageMainWebp from "../../assets/img/hotels/items/3/main.webp"
import fourthItemImageMainJpeg from "../../assets/img/hotels/items/4/main.jpeg"
import fourthItemImageMainWebp from "../../assets/img/hotels/items/4/main.webp"

const defaultStore : hotels = {
    elements: [
        {
            id: 0,
            type: sortTitles.Hotels,
            images: {
                main: {srcs: {webp: firstItemImageMainWebp, jpeg: firstItemImageMainJpeg}, alt: ""},
                another: [
                    {srcs: {webp: firstItemImageMainWebp, jpeg: firstItemImageMainJpeg}, alt: ""}
                ]
            },
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: 204,
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            countStars: 5,
            amenities: [amenities.AirConditioned, amenities.FreeAirportShuttle],
            shortReview: {
                countReviews: 371,
                rating: 4.2
            }
        },
        {
            id: 1,
            type: sortTitles.Resorts,
            images: {
                main: {srcs: {webp: secondItemImageMainWebp, jpeg: secondItemImageMainJpeg}, alt: ""},
                another: [
                    {srcs: {webp: secondItemImageMainWebp, jpeg: secondItemImageMainJpeg}, alt: ""}
                ]
            },
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: 204,
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            countStars: 5,
            amenities: [amenities.AirConditioned, amenities.FreeAirportShuttle],
            shortReview: {
                countReviews: 371,
                rating: 4.2
            }
        },
        {
            id: 2,
            type: sortTitles.Motels,
            images: {
                main: {srcs: {webp: thirdItemImageMainWebp, jpeg: thirdItemImageMainJpeg}, alt: ""},
                another: [
                    {srcs: {webp: thirdItemImageMainWebp, jpeg: thirdItemImageMainJpeg}, alt: ""}
                ]
            },
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: 204,
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            countStars: 5,
            amenities: [amenities.AirConditioned, amenities.FreeAirportShuttle],
            shortReview: {
                countReviews: 371,
                rating: 4.2
            }
        },
        {
            id: 3,
            type: sortTitles.Hotels,
            images: {
                main: {srcs: {webp: fourthItemImageMainWebp, jpeg: fourthItemImageMainJpeg}, alt: ""},
                another: [
                    {srcs: {webp: fourthItemImageMainWebp, jpeg: fourthItemImageMainJpeg}, alt: ""}
                ]
            },
            title: "CVK Park Bosphorus Hotel Istanbul",
            price: 204,
            location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
            countStars: 5,
            amenities: [amenities.AirConditioned, amenities.FreeAirportShuttle],
            shortReview: {
                countReviews: 371,
                rating: 4.2
            }
        }
    ],
    isShowAll: false,
    buttonViewMore: {
        passive: "Show more results",
        active: "Hide"
    },
    buttonLink: "View Place"
}

export const hotelsItemsReducer = (store : hotels = defaultStore) : hotels => store