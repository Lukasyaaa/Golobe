import { addCard, addCardInputTitles, typeAddCardInput } from "../../types";

const defaultStore : addCard = {
    header: {
        firstAppear: {
            title: "Add a new Card",
            description: "Let’s get you all st up so you can access your personal account."
        },
        nextAppear: "Add a payment method"
    },
    inputs: [
        {
            isMassive: false, 
            value: {type: typeAddCardInput.Entry, description: addCardInputTitles.Card, placeholder: "4321 4321 4321 4321"}
        },
        {
            isMassive: true,
            value: [
                {type: typeAddCardInput.Entry, description: addCardInputTitles.ExpDate, placeholder: "02/27"},
                {type: typeAddCardInput.Entry, description: addCardInputTitles.CVC, placeholder: "123"}
            ]
        },
        {
            isMassive: false, 
            value: {type: typeAddCardInput.Entry, description: addCardInputTitles.Name, placeholder: "John Doe"}
        },
        {
            isMassive: false, 
            value: {type: typeAddCardInput.Select, description: addCardInputTitles.CountryOrRegion, links: [
                "USA",
                "Ukraine",
                "England",
                "Germany",
                "France",
                "Italy"
            ]}
        }
    ],
    saveText: "Securely save my information for 1-click checkout",
    buttonAdd: {
        firstAppear: "Add payment method",
        nextAppear: "Add Card"
    },
    privacyPolicy: "By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription."
}

export const addCardReducer = (store : addCard = defaultStore) : addCard => store;