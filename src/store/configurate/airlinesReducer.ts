import { airlinePolicie, airlines } from "../../types";

const defaultStore : airlinePolicie[] = [
    {
        type: airlines.Emirated, elements: [
            "Pre-flight cleaning, installation of cabin HEPA filters.",
            "Pre-flight health screening questions."
        ]
    },
    {
        type: airlines.Etihad, elements: [
            "Pre-flight cleaning, installation of cabin HEPA filters.",
            "Pre-flight health screening questions."
        ]
    },
    {
        type: airlines.FlyDubai, elements: [
            "Pre-flight cleaning, installation of cabin HEPA filters.",
            "Pre-flight health screening questions."
        ]
    },
    {
        type: airlines.Qatar, elements: [
            "Pre-flight cleaning, installation of cabin HEPA filters.",
            "Pre-flight health screening questions."
        ]
    }
]

export const airlinesReducer = (store = defaultStore) => store;