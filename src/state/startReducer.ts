//Intro
import introJpeg from "../assets/img/intro/start/main.jpeg";
import introWebp from "../assets/img/intro/start/main.webp";
//Choose
import chooseFlightsJpeg from "../assets/img/start/choose/flights/main.jpeg";
import chooseFlightsWebp from "../assets/img/start/choose/flights/main.webp";
import chooseHotelsJpeg from "../assets/img/start/choose/hotels/main.jpeg";
import chooseHotelsWebp from "../assets/img/start/choose/hotels/main.webp";
import { Dispatch } from "redux";
import axios from "axios";
import { Review, Section, Separation, Srcs, Trip, ChooseVariant } from "../types";

console.log(introJpeg);

interface Intro{
    supheading : string,
    heading : string,
    subheading : string,
    background : Srcs
}

interface Start{
    intro : Intro,
    trips : Section<Trip>,
    choose : Separation<ChooseVariant>,
    reviews : Section<Review>
}

const defaultStore : Start = {
    intro: {
        supheading: "Helping Others",
        heading: "Live & Travel",
        subheading: "Special offers to suit your plan",
        background: { jpeg: introJpeg, webp: introWebp }
    },
    trips: {
        header: {
            heading: "Plan your perfect trip",
            description: "Search Flights & Places Hire to our most popular destinations",
            buttonMore: { active: "See more places", passive: "Hide" }
        },
        items: {
            container: [],
            loading: { is: false, description: "Trips is Loading..." },
            errorMessage: null
        },
        maxShow: 9
    },
    choose: {
        flights: {
            background: { jpeg: chooseFlightsJpeg, webp: chooseFlightsWebp},
            title: "Flights",
            description: "Search Flights & Places Hire to our most popular destinations",
            linkText: "Show Filghts"
        },
        hotels: {
            background: { jpeg: chooseHotelsJpeg, webp: chooseHotelsWebp},
            title: "Hotels",
            description: "Search hotels & Places Hire to our most popular destinations",
            linkText: "Show Hotels"
        }
    },
    reviews: {
        header: {
            heading: "Reviews",
            description: "What people says about Golobe facilities",
            buttonMore: { active: "See All", passive: "Hide" }
        },        
        items: {
            container: [],
            loading: { is: false, description: "Reviews is Loading..." },
            errorMessage: null
        },
        maxShow: 3
    }
}

enum StartActions{
    FETCH_TRIPS = "FETCH_TRIPS",
    FETCH_TRIPS_SUCCESS = "FETCH_TRIPS_SUCCESS",
    FETCH_TRIPS_ERROR = "FETCH_TRIPS_ERROR",
    FETCH_REVIEWS = "FETCH_REVIEWS",
    FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS",
    FETCH_REVIEWS_ERROR = "FETCH_REVIEWS_ERROR"
}

interface FetchTripsAction{
    type : StartActions.FETCH_TRIPS
} 
interface FetchTripsErrorAction{
    type : StartActions.FETCH_TRIPS_ERROR,
    payload : string
}
interface FetchTripsSuccessAction{
    type : StartActions.FETCH_TRIPS_SUCCESS,
    payload : Trip[]
}
interface FetchReviewsAction{
    type : StartActions.FETCH_REVIEWS
} 
interface FetchReviewsErrorAction{
    type : StartActions.FETCH_REVIEWS_ERROR,
    payload : string
}
interface FetchReviewsSuccessAction{
    type : StartActions.FETCH_REVIEWS_SUCCESS,
    payload : Review[]
}

type FetchAction = 
    FetchTripsAction | FetchTripsErrorAction | FetchTripsSuccessAction | 
    FetchReviewsAction | FetchReviewsErrorAction | FetchReviewsSuccessAction
;

export const startReducer = (store : Start = defaultStore, action : FetchAction) : Start => {
    switch(action.type){
        case StartActions.FETCH_REVIEWS:
            return { 
                ...store, 
                reviews: { 
                    ...store.reviews, 
                    items: { ...store.reviews.items, loading: { ...store.reviews.items.loading, is: true } } 
                }
            }
        case StartActions.FETCH_REVIEWS_SUCCESS:
            return { 
                ...store, 
                reviews: { 
                    ...store.reviews, 
                    items: { ...store.reviews.items, loading: { ...store.reviews.items.loading, is: false }, container: action.payload } 
                }
            }
        case StartActions.FETCH_REVIEWS_ERROR:
            return { 
                ...store, 
                reviews: { 
                    ...store.reviews, 
                    items: { ...store.reviews.items, loading: { ...store.reviews.items.loading, is: false }, errorMessage: action.payload } 
                }
            }
        case StartActions.FETCH_TRIPS:
            return { 
                ...store, 
                trips: { 
                    ...store.trips, 
                    items: { ...store.trips.items, loading: { ...store.trips.items.loading, is: true } } 
                }
            }
        case StartActions.FETCH_TRIPS_SUCCESS:
            return { 
                ...store, 
                trips: { 
                    ...store.trips, 
                    items: { ...store.trips.items, loading: { ...store.trips.items.loading, is: false }, container: action.payload } 
                }
            }
        case StartActions.FETCH_TRIPS_ERROR:
            return { 
                ...store, 
                trips: { 
                    ...store.trips, 
                    items: { ...store.trips.items, loading: { ...store.trips.items.loading, is: false }, errorMessage: action.payload } 
                }
            }
        default:
            return store;
    }
};

export const fetchReviews = () => {
    return async (dispatch : Dispatch<FetchReviewsAction | FetchReviewsSuccessAction | FetchReviewsErrorAction>) => {
        try{
            dispatch({type: StartActions.FETCH_REVIEWS});
            const response = await axios.get("http://localhost:3001/reviews");
            dispatch({type: StartActions.FETCH_REVIEWS_SUCCESS, payload: response.data});
        } catch {
            dispatch({type: StartActions.FETCH_REVIEWS_ERROR, payload: "Error"});
        }
    }
}

export const fetchTrips = () => {
    return async (dispatch : Dispatch<FetchTripsAction | FetchTripsSuccessAction | FetchTripsErrorAction>) => {
        try{
            dispatch({type: StartActions.FETCH_TRIPS});
            const response = await axios.get("http://localhost:3001/trips");
            dispatch({type: StartActions.FETCH_TRIPS_SUCCESS, payload: response.data});
        } catch {
            dispatch({type: StartActions.FETCH_TRIPS_ERROR, payload: "Error"});
        }
    }
}