import { card } from "../types";

const defaultStore : card[] = [
    {
        number: 1234123412341234, 
        cvc: 304, 
        expDate:{
            month: 2,
            year: 2017
        },
        name: "",
        country: "United States",
        savedInfo: false
    }
];

enum cardActionsType{
    ADD_ELEMENT = "CARD_ADD_ELEMENT",
    DELETE_ELEMENT = "CARD_DELETE_ELEMENT"
}

type cardAddElement = {
    type : cardActionsType.ADD_ELEMENT,
    payload : card
}

type cardDeleteElement = {
    type : cardActionsType.DELETE_ELEMENT,
    payload : number
}

type cardAction = cardAddElement | cardDeleteElement;

export const cardsReducer = (store : card[] = defaultStore, action : cardAction) : card[] => {
    switch(action.type){
        case cardActionsType.ADD_ELEMENT:
            return [...store, action.payload];
        case cardActionsType.DELETE_ELEMENT:
            let editedMassive : card[] = new Array(store.length - 1);
            for(let i = 0; i < store.length; i++){
                if(i === action.payload) continue;
                editedMassive[i] = store[i];
            }
            return editedMassive;
        default:
            return store;
    }
}

export const cardAddElement = (cardNew : card) : cardAddElement => ({
    type: cardActionsType.ADD_ELEMENT, payload: cardNew
})
export const cardDeleteElement = (idNew : number) : cardDeleteElement => ({
    type: cardActionsType.DELETE_ELEMENT, payload: idNew
})