import { OptionType, IconValue, IconPosition, OptionsContainer } from "../types.ts";


const defaultStore : OptionsContainer = {
    header:{
        flights: "Flights",
        hotels: "Hotels"
    },
    flights: [
        {
            type: OptionType.INPUT, label: "From - To", value: "Lahore - Karachi", icon: null
        },
        {
            type: OptionType.SELECT, label: "Trip", value: { links: ["Return", "Depart"], startActive: 0 }, icon: null
        },
        {
            type: OptionType.INPUT, label: "Depart - Return", value: "07 Nov 22 - 13 Nov 22", icon: null
        },
        {
            type: OptionType.INPUT, label: "Passenger - Clas", value: "1 Passenger, Economy", icon: null
        },
    ],
    hotels: [
        {
            type: OptionType.INPUT, label: "Enter Destination", value: "Istanbul, Turkey", isBigger: true,
            icon: {value: IconValue.BED, position: IconPosition.LEFT}
        },
        {
            type: OptionType.INPUT, label: "Check-in", value: "Fri 12/2", isBigger: false,
            icon: {value: IconValue.DATE, position: IconPosition.RIGHT}
        },
        {
            type: OptionType.INPUT, label: "Check Out", value: "Sun 12/4", isBigger: false,
            icon: {value: IconValue.DATE, position: IconPosition.RIGHT}
        },
        {
            type: OptionType.SELECT, label: "Rooms & Guests", 
            value: { links: ["1 room, 2 guests", "2 room, 2 guests"], startActive: 0 }, 
            icon: {value: IconValue.HUMAN, position: IconPosition.LEFT}, isBigger: false
        }
    ],
    addPromo: "Add Promo Code",
    link: {
        flights: "Show Flights",
        hotels: "Show Hotels"
    }
}

export const optionsReducer = (store : OptionsContainer = defaultStore) : OptionsContainer => store;