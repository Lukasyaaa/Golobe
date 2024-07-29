import { header } from "../../types";
//--------------Header--------------
import startHeaderLogo from "../../assets/img/header/start.svg"
import anotherHeaderLogo from "../../assets/img/header/black-white.svg"

const defaultStore : header = {
    image: {start: startHeaderLogo, another: anotherHeaderLogo},
    links:{
        items:[
            {href: "/Flights", value: "Find Flight", iconValue: "_icon-plane"},
            {href: "/Hotels", value: "Find Hotels", iconValue: "_icon-bed"}
        ],
        activeItem: 0
    },
    buttons:[
        {href: "#", value: "Login"},
        {href: "#", value: "Sign up"}
    ]
}

enum headerAction{
    MAKE_ALL_NOT_ACTIVE = "HEADER_MAKE_ALL_NOT_ACTIVE",
    MAKE_FLIGHTS_ACTIVE = "HEADER_MAKE_FLIGHTS_ACTIVE",
    MAKE_HOTELS_ACTIVE = "HEADER_MAKE_HOTELS_ACTIVE"
}

type headerMakeAllNotActive = {
    type : headerAction.MAKE_ALL_NOT_ACTIVE
}
type headerMakeFlightsActive = {
    type : headerAction.MAKE_FLIGHTS_ACTIVE
}
type headerMakeHotelsActive = {
    type : headerAction.MAKE_HOTELS_ACTIVE
}

export type headerActionType = headerMakeAllNotActive | headerMakeFlightsActive | headerMakeHotelsActive;

export const headerReducer = (state : header = defaultStore, action : headerActionType) : header =>{
    switch(action.type){
        case headerAction.MAKE_ALL_NOT_ACTIVE:
            return{
                ...state, links: {...state.links, activeItem : 0}
            }
        case headerAction.MAKE_FLIGHTS_ACTIVE:
            return{
                ...state, links: {...state.links, activeItem : 1}
            }
        case headerAction.MAKE_HOTELS_ACTIVE:
            return{
                ...state, links: {...state.links, activeItem : 2}
            }
        default:
            return state;
    }
}

export const headerMakeAllNotActiveAction = () : headerMakeAllNotActive => ({type : headerAction.MAKE_ALL_NOT_ACTIVE});
export const headerMakeFlightsActiveAction = () : headerMakeFlightsActive => ({type : headerAction.MAKE_FLIGHTS_ACTIVE});
export const headerMakeHotelsctiveAction = () : headerMakeHotelsActive => ({type : headerAction.MAKE_HOTELS_ACTIVE});