import { intToTime } from "../../helperFunctions";
import { airlines, hotelsAmenities, contentPart, meridiem, navbar, navbarItemType, navbarTitles, tripsType } from "../../types"; 
 
const defaultStore : navbar = { 
    flights:{ 
        heading: "Filters", 
        items:[ 
            { 
                type: navbarItemType.FromToNumbers, title: navbarTitles.Price,  
                value: {from: 50, to: 1200, min: 50, max: 1200} 
            }, 
            { 
                type: navbarItemType.FromToTime, title: navbarTitles.DepartureTime, 
                value: {
                    from: {minute: 0, hour: 12, meridiem: meridiem.AM}, 
                    to: {minute: 0, hour: 12, meridiem: meridiem.AM}
                } 
            }, 
            { 
                type: navbarItemType.Radios, title: navbarTitles.Rating,  
                value: {items: ["0+", "1+", "2+", "3+", "4+"], currentActive: 0} 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Airlines,  
                value: {
                    items: [airlines.Emirated, airlines.FlyDubai, airlines.Qatar, airlines.Etihad], 
                    currentActive: [0, 1, 2, 3], maxShow: 4, isShowAll: false
                } 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Trips,  
                value: {
                    items: [tripsType.RoundTrip, tripsType.OnWay, tripsType.MultiCity, tripsType.MyDatesAreFlexible], 
                    currentActive: [0, 1, 2, 3], maxShow: 4, isShowAll: false
                } 
            } 
        ] 
    }, 
    hotels:{ 
        heading: "Filters", 
        items:[ 
            { 
                type: navbarItemType.FromToNumbers, title: navbarTitles.Price,  
                value: {from: 50, to: 1200, min: 50, max: 1200} 
            }, 
            { 
                type: navbarItemType.Radios, title: navbarTitles.Rating,  
                value: {items: ["+0", "+1", "+2", "+3", "+4"], currentActive: 0} 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Freebies,  
                value: {
                    items: [hotelsAmenities.FreeBreakfast, hotelsAmenities.FreeParking, hotelsAmenities.FreeInternet, hotelsAmenities.FreeAirportShuttle, hotelsAmenities.FreeAirportShuttle], 
                    currentActive: [0, 1, 2, 3, 4], 
                    maxShow: 5, 
                    isShowAll: false
                } 
            }, 
            { 
                type: navbarItemType.Checkboxes, title: navbarTitles.Amenities,  
                value: {
                    items: [hotelsAmenities.FrontDeskAroundTheClock, hotelsAmenities.AirConditioned, hotelsAmenities.Fitness, hotelsAmenities.InsidePool, hotelsAmenities.OutsidePool], 
                    currentActive: [0, 1, 2, 3, 4], 
                    maxShow: 4, 
                    isShowAll: false
                } 
            } 
        ] 
    } 
}

enum navbarActionsType{
    NAVBAR_SET_FROM = "NAVBAR_SET_FROM",
    NAVBAR_SET_TO = "NAVBAR_SET_TO",
    NAVBAR_ADD_ACTIVE = "NAVBAR_ADD_ACTIVE",
    NAVBAR_REMOVE_ACTIVE = "NAVBAR_REMOVE_ACTIVE",
    NAVBAR_SET_ACTIVE = "NAVBAR_SET_ACTIVE"
}

interface navbarChangeValue{
    contentType : contentPart,
    value : number,
    groupId : number
}


type navbarSetActive = {
    payload : navbarChangeValue,
    type : navbarActionsType.NAVBAR_SET_ACTIVE
}

type navbarAddActive = {
    payload : navbarChangeValue,
    type : navbarActionsType.NAVBAR_ADD_ACTIVE
}
type navbarRemoveActive = {
    payload : navbarChangeValue,
    type : navbarActionsType.NAVBAR_REMOVE_ACTIVE
}

type navbarSetFrom = {
    payload : navbarChangeValue,
    type : navbarActionsType.NAVBAR_SET_FROM
}
type navbarSetTo = {
    payload : navbarChangeValue,
    type : navbarActionsType.NAVBAR_SET_TO
}

type navbarAction = navbarSetActive | navbarAddActive | navbarRemoveActive | navbarSetFrom | navbarSetTo;

export const navbarReducer = (store : navbar = defaultStore, action : navbarAction) : navbar => {
    let idGroup = 0;
    switch(action.type){
        case navbarActionsType.NAVBAR_SET_ACTIVE:
            if(action.payload.contentType === contentPart.Flights){
                return{
                    ...store,
                    flights: {
                        ...store.flights,
                        items: store.flights.items.map(navbarGroup => {
                            if(navbarGroup.type === navbarItemType.Radios){
                                if(idGroup++ === action.payload.groupId){
                                    return{
                                        ...navbarGroup,
                                        value: {
                                            ...navbarGroup.value,
                                            currentActive: action.payload.value
                                        }
                                    }
                                }
                            }
                            return navbarGroup;
                        })
                    }
                }
            }
            return{
                ...store,
                hotels: {
                    ...store.hotels,
                    items: store.hotels.items.map(navbarGroup => {
                        if(navbarGroup.type === navbarItemType.Radios){
                            if(idGroup++ === action.payload.groupId){
                                return{
                                    ...navbarGroup,
                                    value: {
                                        ...navbarGroup.value,
                                        currentActive: action.payload.value
                                    }
                                }
                            }
                        }
                        return navbarGroup;
                    })
                }
            }
        case navbarActionsType.NAVBAR_ADD_ACTIVE:
            if(action.payload.contentType === contentPart.Flights){
                return{
                    ...store,
                    flights:{
                        ...store.flights,
                        items: store.flights.items.map(navbarGroup => {
                            if(navbarGroup.type === navbarItemType.Checkboxes){
                                if(idGroup++ === action.payload.groupId){
                                    return{
                                        ...navbarGroup,
                                        value:{
                                            ...navbarGroup.value,
                                            currentActive: [action.payload.value, ...navbarGroup.value.currentActive]
                                        }
                                    }
                                }
                            }
                            return navbarGroup;
                        })
                    }
                }
            }
            return{
                ...store,
                hotels:{
                    ...store.hotels,
                    items: store.hotels.items.map(navbarGroup => {
                        if(navbarGroup.type === navbarItemType.Checkboxes){
                            if(idGroup++ === action.payload.groupId){
                                return{
                                    ...navbarGroup,
                                    value:{
                                        ...navbarGroup.value,
                                        currentActive: [action.payload.value, ...navbarGroup.value.currentActive]
                                    }
                                }
                            }
                        }
                        return navbarGroup;
                    })
                }
            }
        case navbarActionsType.NAVBAR_REMOVE_ACTIVE:
            if(action.payload.contentType === contentPart.Flights){
                return{
                    ...store,
                    flights:{
                        ...store.flights,
                        items: store.flights.items.map(navbarGroup => {
                            if(navbarGroup.type === navbarItemType.Checkboxes){
                                if(idGroup++ === action.payload.groupId){
                                    return{
                                        ...navbarGroup,
                                        value:{
                                            ...navbarGroup.value,
                                            currentActive: navbarGroup.value.currentActive.filter(id => id !== action.payload.value)
                                        }
                                    }
                                }
                            }
                            return navbarGroup;
                        })
                    }
                }
            }
            return{
                ...store,
                hotels:{
                    ...store.hotels,
                    items: store.hotels.items.map(navbarGroup => {
                        if(navbarGroup.type === navbarItemType.Checkboxes){
                            if(idGroup++ === action.payload.groupId){
                                return{
                                    ...navbarGroup,
                                    value:{
                                        ...navbarGroup.value,
                                        currentActive: navbarGroup.value.currentActive.filter(id => id !== action.payload.value)
                                    }
                                }
                            }
                        }
                        return navbarGroup;
                    })
                }
            }
        case navbarActionsType.NAVBAR_SET_FROM:
            if(action.payload.contentType === contentPart.Flights){
                return{
                    ...store,
                    flights: {
                        ...store.flights,
                        items: store.flights.items.map(navbarGroup => {
                            if(navbarGroup.type === navbarItemType.FromToNumbers || navbarGroup.type === navbarItemType.FromToTime){
                                if(idGroup++ === action.payload.groupId){
                                    if(navbarGroup.type === navbarItemType.FromToNumbers){
                                        return {
                                            ...navbarGroup,
                                            value:{
                                                ...navbarGroup.value,
                                                from: action.payload.value
                                            }
                                        }
                                    }
                                    return {
                                        ...navbarGroup,
                                        value:{
                                            ...navbarGroup.value,
                                            from: intToTime(action.payload.value)
                                        }
                                    }
                                }
                            }
                            return navbarGroup;
                        })
                    }
                }
            }
            return{
                ...store,
                hotels: {
                    ...store.hotels,
                    items: store.hotels.items.map(navbarGroup => {
                        if(navbarGroup.type === navbarItemType.FromToNumbers || navbarGroup.type === navbarItemType.FromToTime){
                            if(idGroup++ === action.payload.groupId){
                                if(navbarGroup.type === navbarItemType.FromToNumbers){
                                    return {
                                        ...navbarGroup,
                                        value:{
                                            ...navbarGroup.value,
                                            from: action.payload.value
                                        }
                                    }
                                }
                                return {
                                    ...navbarGroup,
                                    value:{
                                        ...navbarGroup.value,
                                        from: intToTime(action.payload.value)
                                    }
                                }
                            }
                        }
                        return navbarGroup;
                    })
                }
            }
        case navbarActionsType.NAVBAR_SET_TO:
            if(action.payload.contentType === contentPart.Flights){
                return{
                    ...store,
                    flights: {
                        ...store.flights,
                        items: store.flights.items.map(navbarGroup => {
                            if(navbarGroup.type === navbarItemType.FromToNumbers || navbarGroup.type === navbarItemType.FromToTime){
                                if(idGroup++ === action.payload.groupId){
                                    if(navbarGroup.type === navbarItemType.FromToNumbers){
                                        return {
                                            ...navbarGroup,
                                            value:{
                                                ...navbarGroup.value,
                                                to: action.payload.value
                                            }
                                        }
                                    }
                                    return {
                                        ...navbarGroup,
                                        value:{
                                            ...navbarGroup.value,
                                            to: intToTime(action.payload.value)
                                        }
                                    }
                                }
                            }
                            return navbarGroup;
                        })
                    }
                }
            }
            return{
                ...store,
                hotels: {
                    ...store.hotels,
                    items: store.hotels.items.map(navbarGroup => {
                        if(navbarGroup.type === navbarItemType.FromToNumbers || navbarGroup.type === navbarItemType.FromToTime){
                            if(idGroup++ === action.payload.groupId){
                                if(navbarGroup.type === navbarItemType.FromToNumbers){
                                    return {
                                        ...navbarGroup,
                                        value:{
                                            ...navbarGroup.value,
                                            to: action.payload.value
                                        }
                                    }
                                }
                                return {
                                    ...navbarGroup,
                                    value:{
                                        ...navbarGroup.value,
                                        to: intToTime(action.payload.value)
                                    }
                                }
                            }
                        }
                        return navbarGroup;
                    })
                }
            }
        default:
            return store;
    }
};

export const navbarSetActiveAction = (contentType : contentPart, groupId : number, value : number) : navbarSetActive => ({
    type: navbarActionsType.NAVBAR_SET_ACTIVE,
    payload: {contentType, groupId, value}
})
export const navbarAddActiveAction = (contentType : contentPart, groupId : number, value : number) : navbarAddActive => ({
    type: navbarActionsType.NAVBAR_ADD_ACTIVE,
    payload: {contentType, groupId, value}
})
export const navbarRemoveActiveAction = (contentType : contentPart, groupId : number, value : number) : navbarRemoveActive => ({
    type: navbarActionsType.NAVBAR_REMOVE_ACTIVE,
    payload: {contentType, groupId, value}
})
export const navbarSetFromAction = (contentType : contentPart, groupId : number, value : number) : navbarSetFrom => ({
    type: navbarActionsType.NAVBAR_SET_FROM,
    payload: {contentType, groupId, value}
})
export const navbarSetToAction = (contentType : contentPart, groupId : number, value : number) : navbarSetTo => ({
    type: navbarActionsType.NAVBAR_SET_TO,
    payload: {contentType, groupId, value}
})