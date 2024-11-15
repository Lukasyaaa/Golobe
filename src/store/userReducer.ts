import { userInfo, card, shortUserInfo, meridiem, contentPart } from "../types"

const defaultStore : userInfo = {
    banner: {src: "", alt: "Your Banner"},
    ava: {src: "", alt: "Your Avatar"},
    firstName: "", 
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    isLogOut: false,
    address: {
        street: "",
        postalCode: ""
    },
    dataBirth: {
        year: 0,
        month: 0,
        day: 0
    },
    cards: [],
    flightsTickets: [],
    hotelsTickets: [],
    favourites: {
        flights: [],
        hotels: []
    }
}

enum userActionsType{
    ADD_CARD = "USER_ADD_CARD",
    DELETE_CARD = "USER_DELETE_CARD",
    SET_INFO = "USER_SET_INFO",
    CHANGE_IS_LOG_OUT = "USER_CHANGE_IS_LOG_OUT",
    ADD_FAVOURITE = "USER_ADD_FAVOURITE",
    DELETE_FAVOURITE = "USER_DELETE_FAVOURITE"
}

type userAddCard = {
    type : userActionsType.ADD_CARD,
    payload : card
}
type userDeleteCard = {
    type : userActionsType.DELETE_CARD,
    payload : number
}

type userSetInfo = {
    type : userActionsType.SET_INFO,
    payload : shortUserInfo
}

type userChangeIsLogOut = {
    type : userActionsType.CHANGE_IS_LOG_OUT,
    payload : boolean
}

interface userAddFavouritePayload{
    contentType : contentPart,
    newFavourite : number
}
type userAddFavourite = {
    type : userActionsType.ADD_FAVOURITE,
    payload : userAddFavouritePayload 
}

interface userDeleteFavouritePayload{
    contentType : contentPart,
    deletedFavourite : number
}
type userDeleteFavourite = {
    type : userActionsType.DELETE_FAVOURITE,
    payload : userDeleteFavouritePayload 
}

type cardAction = userAddCard | userDeleteCard | userSetInfo | userChangeIsLogOut | userAddFavourite | userDeleteFavourite;

export const userReducer = (store : userInfo = defaultStore, action : cardAction) : userInfo => {
    switch(action.type){
        case userActionsType.ADD_CARD:
            return {...store, cards: [action.payload, ...store.cards]}
        case userActionsType.DELETE_CARD:
            let editedMassive : card[] = new Array(store.cards.length - 1);
            for(let i = 0; i < store.cards.length; i++){
                if(i === action.payload) continue;
                editedMassive[i] = store.cards[i];
            }
            return {...store, cards: editedMassive};
        case userActionsType.SET_INFO:
            return{
                ...store,
                firstName: action.payload.fisrtName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                password: action.payload.password,
                phoneNumber: action.payload.phoneNumber
            }
        case userActionsType.CHANGE_IS_LOG_OUT:
            return{
                ...store,
                isLogOut: action.payload
            }
        case userActionsType.ADD_FAVOURITE:
            if(action.payload.contentType === contentPart.Flights){
                return{
                    ...store,
                    favourites: {...store.favourites, flights: [...store.favourites.flights, action.payload.newFavourite]}
                }
            }
            return{
                ...store,
                favourites: {...store.favourites, hotels: [...store.favourites.hotels, action.payload.newFavourite]}
            }
        case userActionsType.DELETE_FAVOURITE:
            if(action.payload.contentType === contentPart.Flights){
                let copyFavourites = new Array(store.favourites.flights.length - 1);
                for(let i = 0, k = 0; i < store.favourites.flights.length; i++){
                    if(i === action.payload.deletedFavourite) continue;
                    copyFavourites[k++] = store.favourites.flights[i];
                }

                return{
                    ...store,
                    favourites: {...store.favourites, flights: copyFavourites}
                }
            }
            let copyFavourites = new Array(store.favourites.hotels.length - 1);
            for(let i = 0, k = 0; i < store.favourites.hotels.length; i++){
                if(i === action.payload.deletedFavourite) continue;
                copyFavourites[k++] = store.favourites.hotels[i];
            }

            return{
                ...store,
                favourites: {...store.favourites, hotels: copyFavourites}
            }
        default:
            return store;
    }
}

export const userAddCardAction = (cardNew : card) : userAddCard => ({
    type: userActionsType.ADD_CARD, payload: cardNew
});
export const userDeleteCardAction = (idDeleted : number) : userDeleteCard => ({
    type: userActionsType.DELETE_CARD, payload: idDeleted
});
export const userSetInfoAction = (user : shortUserInfo) : userSetInfo => ({
    type: userActionsType.SET_INFO, payload: user
});
export const userChangeIsLogOutAction = (isLogOutNew : boolean) : userChangeIsLogOut => ({
    type: userActionsType.CHANGE_IS_LOG_OUT, payload: isLogOutNew
})
export const userAddFavouriteAction = (contentType : contentPart, newFavourite : number) : userAddFavourite => ({
    type: userActionsType.ADD_FAVOURITE, payload: {contentType, newFavourite}
})
export const userDeleteFavouriteAction = (contentType : contentPart, deletedFavourite : number) : userDeleteFavourite => ({
    type: userActionsType.DELETE_FAVOURITE, payload: {contentType, deletedFavourite}
})