import { header } from "../../types";
//--------------Header--------------
import startHeaderLogo from "../../assets/img/header/start.svg"
import anotherHeaderLogo from "../../assets/img/header/black-white.svg"

const defaultStore : header = {
    image: {start: startHeaderLogo, another: anotherHeaderLogo},
    links:[
        {href: "/Flights", value: "Find Flight", iconValue: "_icon-plane", isActive: false},
        {href: "/Hotels", value: "Find Hotels", iconValue: "_icon-bed", isActive: false}
    ],
    buttons:[
        {href: "#", value: "Login"},
        {href: "#", value: "Sign up"}
    ]
}

enum headerAction{
    REPLACE_ACTIVE = "REPLACE_ACTIVE",
    SET_IS_ACTIVE = "HEADER_SET_IS_ACTIVE",
    MAKE_ALL_NOT_ACTIVE = "HEADER_MAKE_ALL_NOT_ACTIVE",
    MAKE_FLIGHTS_ACTIVE = "HEADER_MAKE_FLIGHTS_ACTIVE",
    MAKE_HOTELS_ACTIVE = "HEADER_MAKE_HOTELS_ACTIVE"
}

type headerReplaceActivePayload = {
    oldActive : number,
    newActive : number
}
type headerReplaceActive = {
    type : headerAction.REPLACE_ACTIVE,
    payload : headerReplaceActivePayload
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

type headerActionType = headerReplaceActive | headerMakeAllNotActive | headerMakeFlightsActive | headerMakeHotelsActive;

const setIsActive = (state : header, id : number) : header =>{
    return{
        ...state,
        links: state.links.map((menuLink, index) => {
            if(index === id){
                return{...menuLink, isActive: true};
            };
            return{...menuLink, isActive: false};
        })
    }
}

export const headerReducer = (state : header = defaultStore, action : headerActionType) =>{
    switch(action.type){
        case headerAction.REPLACE_ACTIVE:
            return {
                ...state, 
                links: state.links.map((menuLink, index) => {
                    if(index === action.payload.oldActive){
                        return{...menuLink, isActive: false};
                    }
                    if(index === action.payload.newActive){
                        return{...menuLink, isActive: true};
                    }
                    return{...menuLink};
                })
            };
        case headerAction.MAKE_ALL_NOT_ACTIVE:
            return{
                ...state,
                links: state.links.map((menuLink, index) => ({
                   ...menuLink, isActive: false
                }))
            }
        case headerAction.MAKE_FLIGHTS_ACTIVE:
            return setIsActive(state, 0);
        case headerAction.MAKE_HOTELS_ACTIVE:
            return setIsActive(state, 1);
        default:
            return state;
    }
}

export const headerReplaceActiveLinkAction = (oldActive : number, newActive : number) : headerReplaceActive => ({
    type : headerAction.REPLACE_ACTIVE, payload : {oldActive, newActive}
});
export const headerMakeAllNotActiveAction = () : headerMakeAllNotActive => ({type : headerAction.MAKE_ALL_NOT_ACTIVE});
export const headerMakeFlightsActiveAction = () : headerMakeFlightsActive => ({type : headerAction.MAKE_FLIGHTS_ACTIVE});
export const headerMakeHotelsctiveAction = () : headerMakeHotelsActive => ({type : headerAction.MAKE_HOTELS_ACTIVE});