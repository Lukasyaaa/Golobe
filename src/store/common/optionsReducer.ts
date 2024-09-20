import { options, optionsIconPosition, optionsTitle, optionType } from "../../types";

const defaultState : options = {
    header:{
        flights: "Flights",
        hotels: "Stays",
        onlyFlights: "Where are you flying?",
        onlyHotels: "Where are you staying?"
    },
    inputs:{
        flights:[
            {
                title: optionsTitle.FromTo, value: "Lahore - Karachi", iconPosition: optionsIconPosition.Right, 
                type: optionType.Input
            },
            {
                title: optionsTitle.Trip, value: {startActive: 0, items: ["Return", "Depart"]}, 
                type: optionType.Select
            },
            {
                title: optionsTitle.DepartReturn, value: "07 Nov 22 - 13 Nov 22", iconPosition: optionsIconPosition.Null, 
                type: optionType.Input
            },
            {
                title: optionsTitle.PassengerAndClass, value: "1 Passenger, Economy", iconPosition: optionsIconPosition.Null, 
                type: optionType.Input
            }
        ],
        hotels:[
            {
                title: optionsTitle.Destination, value: "Istanbul, Turkey", isBigger: true, 
                iconPosition: optionsIconPosition.Left, type: optionType.Input
            },
            {
                title: optionsTitle.CheckIn, value: "Fri 12/2", isBigger: false, 
                iconPosition: optionsIconPosition.Right, type: optionType.Input
            },
            {
                title: optionsTitle.CheckOut, value: "Sun 12/4", isBigger: false, 
                iconPosition: optionsIconPosition.Right, type: optionType.Input
            },
            {
                title: optionsTitle.RoomsAndGuests, value: {startActive: 0, items: ["1 room, 2 guests", "2 room, 1 guests"]},
                isBigger: false, type: optionType.Select
            },
        ]
    },
    footer: {
        addPromoText: "Add Promo Code",
        showText:{
            flights: "Show Filghts",
            hotels: "Show Stays"
        }
    }
}

export const optionsReducer = (state : options = defaultState) : options => state;