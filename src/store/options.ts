import { createSlice } from "@reduxjs/toolkit";
import { ICON_POSITION, ICON_VALUE, type IconValue, type objType, type SiteSeparation } from "../types";

export const OPTION_TYPE = {
    input: "INPUT",
    select: "SELECT"
} as const;

interface OptionsHeader{
    onlyFlights: string,
    onlyHotels: string,
    double: SiteSeparation<string>
}

interface OptionInput{
    description: string, iconValue: IconValue | null, type: typeof OPTION_TYPE.input,
    id : string, placeholder : string, isBigger : boolean
}
interface OptionSelect{
    description: string, iconValue: objType<typeof ICON_VALUE> | null, type: typeof OPTION_TYPE.select,
    links : string[]
}
interface OptionsFooter{
    addPromo: string,
    link: SiteSeparation<string>
}
    
interface Options{
    header: OptionsHeader,
    container: SiteSeparation<(OptionInput | OptionSelect)[]>,
    footer: OptionsFooter
}
const initialState : Options = {
    header: {
        onlyFlights: "Where are you flying?",
        onlyHotels: "Where are you staying?",
        double: {
            flightsPart: "Flights",
            hotelsPart: "Stays"
        }
    },
    container: {
        flightsPart: [
            { 
                description: "From - To", iconValue: {pos: ICON_POSITION.left, value: ICON_VALUE.fromTo}, 
                type: OPTION_TYPE.input, id: "from-to", placeholder: "Lahore - Karachi", isBigger: false
            },
            { 
                description: "Trip", iconValue: null, type: OPTION_TYPE.select, 
                links: ["Return", "Depart"],
            },
            { 
                description: "Depart - Return", iconValue: null, type: OPTION_TYPE.input, 
                id: "dep-ret", placeholder: "07 Nov 22 - 13 Nov 22", isBigger: false
            },
            { 
                description: "Passenger - Class", iconValue: null, type: OPTION_TYPE.input, 
                id: "pas-cl", placeholder: "1 Passenger, Economy", isBigger: false
            }
        ],
        hotelsPart : [
            { 
                description: "Enter Destination", iconValue: {pos: ICON_POSITION.left, value: ICON_VALUE.hotelPlace}, 
                type: OPTION_TYPE.input, id: "from-to", placeholder: "Istanbul, Turkey", isBigger: true
            },
            { 
                description: "Check In", iconValue: {pos: ICON_POSITION.right, value: ICON_VALUE.date}, 
                type: OPTION_TYPE.input, id: "check-in", placeholder: "Fri 12/2", isBigger: false
            },
            { 
                description: "Check Out", iconValue: {pos: ICON_POSITION.right, value: ICON_VALUE.date}, 
                type: OPTION_TYPE.input, id: "check-out", placeholder: "Sun 12/4", isBigger: false
            },
            { 
                description: "Rooms & Guests", iconValue: ICON_VALUE.people, 
                type: OPTION_TYPE.select, links: ["1 room, 2 guests", "2 room, 2 guests"],
            }
        ]
    },
    footer:{
        addPromo: "Add Promo Code",
        link: {
            flightsPart: "Show Flights",
            hotelsPart: "Show Stays"
        }
    }
};

export const optionsSlice = createSlice({
    name: "options",
    initialState,
    reducers: {}
});