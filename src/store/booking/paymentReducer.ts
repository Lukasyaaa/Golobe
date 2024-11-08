import { payment, paymentTitles } from "../../types";

const defaultStore : payment = {
    methods: [
        {
            type: paymentTitles.payFull,
            description: "Pay the total and you are all set"
        },
        {
            type: paymentTitles.payParts,
            description: "Pay $207.43 now, and the rest ($207.43) will be automatically charged to the same payment method on Nov 14, 2022. No extra fees."
        }
    ],
    currentActive: 0,
    linkInfo: {
        description: "More Info",
        path: "#",
    }
}

enum paymentActionsType{
    SET_METHOD = "PAYMENT_SET_METHOD"
}

type paymentSetMethod = {
    type : paymentActionsType.SET_METHOD,
    payload : number
}

type paymentAction = paymentSetMethod;

export const paymentReducer = (store : payment = defaultStore, action : paymentAction) : payment => {
    switch(action.type){
        case paymentActionsType.SET_METHOD:
            return{
                ...store,
                currentActive: action.payload
            };
        default:
            return store;
    }
}; 

export const paymentSetMethod = (newId : number) : paymentSetMethod => ({
    type: paymentActionsType.SET_METHOD, payload: newId
})