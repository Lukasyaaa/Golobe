import { airlines, amenities, meridiem, navbar, navbarItemType, navbarTitles, tripsType } from "../types"; 
 
const defaultStore : navbar = { 
    flights:{ 
        heading: "Filters", 
        items:[ 
            { 
                type: navbarItemType.FromToNumbers, title: navbarTitles.Price,  
                isActive: true, value: {from: 50, to: 1200, min: 50, max: 1200} 
            }, 
            { 
                type: navbarItemType.FromToTime, title: navbarTitles.DepartureTime,  
                isActive: true, value: {from: {minute: 0, hour: 12, meridiem: meridiem.AM}, to: {minute: 0, hour: 12, meridiem: meridiem.AM}} 
            }, 
            { 
                type: navbarItemType.Radios, title: navbarTitles.Rating,  
                isActive: true, value: {items: ["+0", "+1", "+2", "+3", "+4"], currentActive: -1} 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Airlines,  
                isActive: true, 
                value: {
                    items: [airlines.Emirated, airlines.FlyDubai, airlines.Qatar, airlines.Etihad], 
                    currentActive: [], maxShow: 4, isShowAll: false
                } 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Trips,  
                isActive: true, 
                value: {
                    items: [tripsType.RoundTrip, tripsType.OnWay, tripsType.MultiCity, tripsType.MyDatesAreFlexible], 
                    currentActive: [], maxShow: 4, isShowAll: false
                } 
            } 
        ] 
    }, 
    hotels:{ 
        heading: "Filters", 
        items:[ 
            { 
                type: navbarItemType.FromToNumbers, title: navbarTitles.Price,  
                isActive: true, value: {from: 50, to: 1200, min: 50, max: 1200} 
            }, 
            { 
                type: navbarItemType.Radios, title: navbarTitles.Rating,  
                isActive: true, value: {items: ["+0", "+1", "+2", "+3", "+4"], currentActive: -1} 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Freebies,  
                isActive: true, value: {items: [amenities.FreeBreakfast, amenities.FreeParking, amenities.FreeInternet, amenities.FreeAirportShuttle, amenities 
                    .FreeAirportShuttle 
                ], currentActive: [], maxShow: 5, isShowAll: false} 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Amenities,  
                isActive: true, value: {items: [amenities.FrontDeskAroundTheClock, amenities.AirConditioned, amenities.Fitness, amenities.InsidePool, amenities.OutsidePool], currentActive: [], maxShow: 4, isShowAll: false} 
            } 
        ] 
    } 
}

export const navbarReducer = (store : navbar = defaultStore) : navbar => store;