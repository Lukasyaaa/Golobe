import { start } from "../types";

const defaultState : start = {
    intro:{
        background: {webp: "", jpeg: ""},
        supheading: "Helping Others",
        heading: "Live & Travel",
        subheading: "Special offers to suit your plan"
    }
}

export const startReducer = (state : start = defaultState) : start => state;