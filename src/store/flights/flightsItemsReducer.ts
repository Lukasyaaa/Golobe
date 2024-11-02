import { airlines, flights, meridiem, tripsType } from "../../types"
import etihadJpeg from "../../assets/img/flights/items/airlines/etihad/main.png"
import etihadWebp from "../../assets/img/flights/items/airlines/etihad/main.webp"
import flyDubaiJpeg from "../../assets/img/flights/items/airlines/flyDubai/main.png"
import flyDubaiWebp from "../../assets/img/flights/items/airlines/flyDubai/main.webp"
import emiratedJpeg from "../../assets/img/flights/items/airlines/emirated/main.png"
import emiratedWebp from "../../assets/img/flights/items/airlines/emirated/main.webp"
import qatarJpeg from "../../assets/img/flights/items/airlines/qatar/main.png"
import qatarWebp from "../../assets/img/flights/items/airlines/qatar/main.webp"

const defaultStore : flights = {
    elements: [
        {
            id: 0,
            type: tripsType.MultiCity,
            images: [{srcs: {jpeg: emiratedJpeg, webp: emiratedWebp}, alt: ""}],
            shortReview: {
                rating: 3,
                countReviews: 52
            },
            price: 102,
            schedule: {
                depart:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.PM
                    },
                    arrayTime: {
                        hour: 1,
                        minute: 28,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.Emirated,
                    transfersCount: 0,
                    from: "EWR",
                    to: "BNA",
                },
                return:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.PM
                    },
                    arrayTime: {
                        hour: 1,
                        minute: 28,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.Emirated,
                    transfersCount: 0,
                    from: "EWR",
                    to: "BNA",
                },
                currentChoosed: []
            }
        },
        {
            id: 1,
            type: tripsType.MultiCity,
            images: [{srcs: {jpeg: flyDubaiJpeg, webp: flyDubaiWebp}, alt: ""}],
            shortReview: {
                rating: 5,
                countReviews: 52
            },
            price: 102,
            schedule: {
                depart:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.PM
                    },
                    arrayTime: {
                        hour: 1,
                        minute: 28,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.FlyDubai,
                    transfersCount: 3,
                    from: "EWR",
                    to: "BNA",
                },
                return:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.PM
                    },
                    arrayTime: {
                        hour: 5,
                        minute: 28,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.FlyDubai,
                    transfersCount: 2,
                    from: "EWR",
                    to: "BNA",
                },
                currentChoosed: []
            }
        },
        {
            id: 2,
            type: tripsType.MyDatesAreFlexible,
            images: [{srcs: {jpeg: qatarJpeg, webp: qatarWebp}, alt: ""}, {srcs: {jpeg: emiratedJpeg, webp: emiratedWebp}, alt: ""}],
            shortReview: {
                rating: 4,
                countReviews: 52
            },
            price: 102,
            schedule: {
                depart:{
                    takeoffTime: {
                        hour: 12,
                        minute: 1,
                        meridiem: meridiem.AM
                    },
                    arrayTime: {
                        hour: 1,
                        minute: 28,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.Qatar,
                    transfersCount: 1,
                    from: "EWR",
                    to: "BNA",
                },
                return:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrayTime: {
                        hour: 1,
                        minute: 35,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.Emirated,
                    transfersCount: 5,
                    from: "EWR",
                    to: "BNA",
                },
                currentChoosed: []
            }
        },
        {
            id: 3,
            type: tripsType.OnWay,
            images: [{srcs: {jpeg: etihadJpeg, webp: etihadWebp}, alt: ""}],
            shortReview: {
                rating: 1,
                countReviews: 52
            },
            price: 102,
            schedule: {
                depart:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrayTime: {
                        hour: 1,
                        minute: 28,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.Etihad,
                    transfersCount: 0,
                    from: "EWR",
                    to: "BNA",
                },
                return:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.PM
                    },
                    arrayTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    airline: airlines.Etihad,
                    transfersCount: 0,
                    from: "EWR",
                    to: "BNA",
                },
                currentChoosed: []
            }
        },
        {
            id: 3,
            type: tripsType.OnWay,
            images: [{srcs: {jpeg: etihadJpeg, webp: etihadWebp}, alt: ""}],
            shortReview: {
                rating: 1,
                countReviews: 52
            },
            price: 102,
            schedule: {
                depart:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    arrayTime: {
                        hour: 1,
                        minute: 28,
                        meridiem: meridiem.PM
                    },
                    airline: airlines.Etihad,
                    transfersCount: 0,
                    from: "EWR",
                    to: "BNA",
                },
                return:{
                    takeoffTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.PM
                    },
                    arrayTime: {
                        hour: 12,
                        minute: 0,
                        meridiem: meridiem.AM
                    },
                    airline: airlines.Etihad,
                    transfersCount: 0,
                    from: "EWR",
                    to: "BNA",
                },
                currentChoosed: []
            }
        }
    ],
    isShowAll: false,
    buttonViewMore: {
        passive: "Show more results",
        active: "Hide"
    },
    buttonLink: "View Deals"
}

export const flightsItemsReducer = (store : flights = defaultStore) : flights => store