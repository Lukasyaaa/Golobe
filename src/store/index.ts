import { legacy_createStore as createStore } from "redux";
import { optionsItem, optionsItemType } from "../types/types";

interface store{
    options : optionsItem[]
}

const defaultStore : store  = {
    options:[
        {
            title: "From - To", iconValue: "_icon-from-to", 
            value: "Lahore - Karachi"
        },
        {
            title: "Trip", iconValue: "_icon-arrow-bottom", 
            value:[{value: "Depart", isDisabled: true}, {value: "Return", isDisabled: false}]
        },
        {
            title: "Depart - Return", iconValue: null, 
            value: "07 Nov 22 - 13 Nov 22"
        },
        {
            title: "Passenger - Class", iconValue: null, 
            value: "1 Passenger, Economy"
        },
    ]
}

export const store = createStore((store = defaultStore) => store);

export type storeType = store;