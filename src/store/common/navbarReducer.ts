import { airlines, meridiem, navbar, navbarFromToValueTypes, navbarItemType, navbarTitle, contentPart, amenities, freeOptions, flightType } from "../../types";

export const defaultStore : navbar = {
    flights:{
        heading: "Filters",
        items:[
            {
                title: navbarTitle.Price, value: {from: 50, to: 1200, min: 50, max: 1200}, 
                valueType: navbarFromToValueTypes.Number,
                type: navbarItemType.FromTo, isActive: true
            },
            {
                title: navbarTitle.DepartureTime, value: {
                    from: {hour: 12, minute: 0, meridiem: meridiem.AM}, 
                    to: {hour: 12, minute: 0, meridiem: meridiem.AM},
                }, valueType: navbarFromToValueTypes.Time,
                type: navbarItemType.FromTo, isActive: true
            },
            {
                title: navbarTitle.Rating, value: {items: ["0+", "1+", "2+", "3+", "4+"], activeItem: 0}, 
                type: navbarItemType.Radio, isActive: true

            },
            {
                title: navbarTitle.Airlines, value: {items: [
                    airlines.Emirates, airlines.FlyDubai, airlines.Qatar, airlines.Etihad
                ], activeItem: [0, 1, 2, 3], itemsToShow: 4, isActive: false}, 
                type: navbarItemType.Checkbox, isActive: true

            },
            {
                title: navbarTitle.Trips, value: {items: [
                    flightType.RoundTrip, flightType.OnWay, flightType.MultiCity, flightType.MyDatesAreFlexible
                ], activeItem: [0, 1, 2, 3], itemsToShow: 4, isActive: false}, 
                type: navbarItemType.Checkbox, isActive: true
            }
        ]
    },
    hotels:{
        heading: "Filters",
        items:[
            {
                title: navbarTitle.Price, value: {from: 50, to: 1200, min: 50, max: 1200}, 
                valueType: navbarFromToValueTypes.Number,
                type: navbarItemType.FromTo, isActive: true
            },
            {
                title: navbarTitle.Rating, value: {items: ["0+", "1+", "2+", "3+", "4+"], activeItem: 0}, 
                type: navbarItemType.Radio, isActive: true

            },
            {
                title: navbarTitle.Freebies, value: {items: [
                    freeOptions.Breakfast, freeOptions.Parking, freeOptions.Internet, freeOptions.AirportShuttle, freeOptions.Cancellation
                ], activeItem: [], itemsToShow: 5, isActive: false}, 
                type: navbarItemType.Checkbox, isActive: true

            },
            {
                title: navbarTitle.Amenities, value: {items: [
                    amenities.AroundTheClockFrontDesk, 
                    amenities.AirConditioned, 
                    amenities.Fitness,
                    amenities.IndoorPool,
                    amenities.OutdoorPool,
                    amenities.Gym,
                    amenities.BarLounge,
                    amenities.FreeWiFi,
                    amenities.TeaCoffeeMachine,
                    amenities.RoomService,
                    amenities.Restaurant
                ], activeItem: [], itemsToShow: 4, isActive: false}, 
                type: navbarItemType.Checkbox, isActive: true
            }
        ]
    }
}

enum navbarAction{
    SWAP_ACTIVE = "NAVBAR_SWAP_ACTIVE",
    HIDE_ACTIVE = "NAVBAR_HIDE_ACTIVE",
    SET_FROM_VALUE = "SET_FROM_VALUE",
    SET_TO_VALUE = "SET_TO_VALUE",
    SET_ACTIVE_ITEM = "SET_RADIOS_ACTIVE_ITEM",
    ADD_ACTIVE_ITEM = "ADD_CHECKBOXES_ACTIVE_ITEM",
    REMOVE_ACTIVE_ITEM = "REMOVE_CHECKBOXES_ACTIVE_ITEM",
    SWAP_CHECKBOXES_ACTIVE = "SWAP_CHECKBOXES_ACTIVE"
}

export enum FromOrTo{
    From = 0,
    To = 1
}

interface navbarSwapActivePayload{
    idToggle : number,
    parent : contentPart
}
type navbarSwapActive = {
    type : navbarAction.SWAP_ACTIVE,
    payload : navbarSwapActivePayload
}

type navbarHideActive = {
    type : navbarAction.HIDE_ACTIVE,
    payload : contentPart
}

interface navbarSetFromToValuePayload {
    newValue : number,
    valueType : navbarFromToValueTypes,
    idItem : number,
    parent : contentPart
}
type navbarSetFromValue = {
    type : navbarAction.SET_FROM_VALUE,
    payload : navbarSetFromToValuePayload
}
type navbarSetToValue = {
    type : navbarAction.SET_TO_VALUE,
    payload : navbarSetFromToValuePayload
}

interface navbarSetActiveItemPayload{
    idItem : number,
    idGroup : number,
    parent : contentPart
}
type navbarSetActiveItem = {
    type : navbarAction.SET_ACTIVE_ITEM,
    payload : navbarSetActiveItemPayload
}

interface navbarAddActiveItemPayload{
    idItem : number,
    idGroup : number,
    parent : contentPart
}
type navbarAddActiveItem = {
    type : navbarAction.ADD_ACTIVE_ITEM,
    payload : navbarAddActiveItemPayload
}

interface navbarRemoveActiveItemPayload{
    idItem : number,
    idGroup : number,
    parent : contentPart
}
type navbarRemoveActiveItem = {
    type : navbarAction.REMOVE_ACTIVE_ITEM,
    payload : navbarRemoveActiveItemPayload
}   

interface navbarSwapCheckboxesActivePayload{
    id : number,
    parent : contentPart
}
type navbarSwapCheckboxesActive = {
    type: navbarAction.SWAP_CHECKBOXES_ACTIVE,
    payload : navbarSwapCheckboxesActivePayload,
}

type navbarActionType = 
    navbarSwapActive | 
    navbarHideActive | 
    navbarSetFromValue | navbarSetToValue | 
    navbarSetActiveItem |
    navbarAddActiveItem | navbarRemoveActiveItem |
    navbarSwapCheckboxesActive
;

export const navbarReducer = ((state = defaultStore, action : navbarActionType) : navbar => {
    switch(action.type){
        case navbarAction.SWAP_ACTIVE:
            if(action.payload.parent === contentPart.Flights){
                return{
                    ...state,
                    flights: {...state.flights, items: state.flights.items.map((navbarGroup, i) => {
                        return{
                            ...navbarGroup,
                            isActive: (i === action.payload.idToggle) ? !(navbarGroup.isActive) : navbarGroup.isActive
                        }
                    })}
                };
            }
            return{
                ...state,
                hotels: {...state.hotels, items: state.hotels.items.map((navbarGroup, i) => {
                    return{
                        ...navbarGroup,
                        isActive: (i === action.payload.idToggle) ? !(navbarGroup.isActive) : navbarGroup.isActive
                    }
                })}
            };

        case navbarAction.HIDE_ACTIVE:
            if(action.payload === contentPart.Flights){
                return {...state, flights:{...state.flights, items: state.flights.items.map(navbarGroup => ({...navbarGroup, isActive: false}))}};
            }
            return{...state, hotels:{...state.hotels, items: state.hotels.items.map(navbarGroup => ({...navbarGroup, isActive: false}))}};

        case navbarAction.SET_FROM_VALUE:   
            if(action.payload.valueType === navbarFromToValueTypes.Time){
                let hourValue : number = (action.payload.newValue === 0) ? 12 : Math.floor(action.payload.newValue / 60);
                const minuteValue : number = action.payload.newValue % 60;
                const meridiemValue : meridiem = (action.payload.newValue === 0) ? 
                    meridiem.AM : 
                    (hourValue >= 12) ? meridiem.PM : meridiem.AM;
                if(hourValue > 12 && meridiemValue === meridiem.PM){
                    hourValue = hourValue % 12;
                }
            
                if(action.payload.parent === contentPart.Flights){
                    return {...state, flights: {...state.flights, items: state.flights.items.map((navbarGroup, i) => {
                        if(i === action.payload.idItem && 
                            navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Time){
                            return {
                                ...navbarGroup, 
                                value: {...navbarGroup.value, from: {hour: hourValue, minute: minuteValue, meridiem: meridiemValue}},
                            };
                        };
                        return navbarGroup;
                    })}};
                }
                return {...state, hotels: {...state.hotels, items: state.hotels.items.map((navbarGroup, i) => {
                    if(i === action.payload.idItem && 
                        navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Time){
                        return {
                            ...navbarGroup, 
                            value: {...navbarGroup.value, from: {hour: hourValue, minute: minuteValue, meridiem: meridiemValue}},
                        };
                    };
                    return navbarGroup;
                })}};
            }
            if(action.payload.parent === contentPart.Flights){
                return{...state, flights: {...state.flights, items: state.flights.items.map((navbarGroup, i) => {
                    if(i === action.payload.idItem &&
                        navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Number){
                        return{...navbarGroup, value: {...navbarGroup.value, from: action.payload.newValue}}
                    }
                    return navbarGroup;
                })}}
            }
            return{...state, hotels: {...state.hotels, items: state.hotels.items.map((navbarGroup, i) => {
                if(i === action.payload.idItem &&
                    navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Number){
                    return{...navbarGroup, value: {...navbarGroup.value, from: action.payload.newValue}}
                }
                return navbarGroup;
            })}}

        case navbarAction.SET_TO_VALUE:
            if(action.payload.valueType === navbarFromToValueTypes.Time){
                let hourValue : number = (action.payload.newValue === 1440) ? 12 : Math.floor(action.payload.newValue / 60);
                const minuteValue : number = action.payload.newValue % 60;
                const meridiemValue : meridiem = (action.payload.newValue === 1440) ? 
                    meridiem.AM : 
                    (hourValue >= 12) ? meridiem.PM : meridiem.AM;
                if(hourValue > 12 && meridiemValue === meridiem.PM){
                    hourValue = hourValue % 12;
                }
        
                if(action.payload.parent === contentPart.Flights){
                    return {...state, flights:{...state.flights, items: state.flights.items.map((navbarGroup, i) => {
                        if(i === action.payload.idItem && 
                            navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Time){
                            return {
                                ...navbarGroup, 
                                value: {...navbarGroup.value, to: {hour: hourValue, minute: minuteValue, meridiem: meridiemValue}},
                            };
                        };
                        return navbarGroup;
                    })}};
                }
                return {...state, hotels:{...state.hotels, items: state.hotels.items.map((navbarGroup, i) => {
                    if(i === action.payload.idItem && 
                        navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Time){
                        return {
                            ...navbarGroup, 
                            value: {...navbarGroup.value, to: {hour: hourValue, minute: minuteValue, meridiem: meridiemValue}},
                        };
                    };
                    return navbarGroup;
                })}};
            }
            if(action.payload.parent === contentPart.Flights){
                return{...state, flights: {...state.flights, items: state.flights.items.map((navbarGroup, i) => {
                    if(i === action.payload.idItem &&
                    navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Number){
                        return{...navbarGroup, value: {...navbarGroup.value, to: action.payload.newValue}};
                    }
                    return navbarGroup;
                })}};
            }
            return{...state, hotels: {...state.hotels, items: state.hotels.items.map((navbarGroup, i) => {
                if(i === action.payload.idItem &&
                    navbarGroup.type === navbarItemType.FromTo && navbarGroup.valueType === navbarFromToValueTypes.Number){
                    return{...navbarGroup, value: {...navbarGroup.value, to: action.payload.newValue}}
                }
                return navbarGroup;
            })}};

        case navbarAction.SET_ACTIVE_ITEM:
            let radiosGroup : number = 0;
            if(action.payload.parent === contentPart.Flights){
                return {...state, flights: {...state.flights, items: state.flights.items.map(navbarGroup =>{
                    if(navbarGroup.type === navbarItemType.Radio){
                        radiosGroup++;
                        if(radiosGroup === action.payload.idGroup){
                            return{...navbarGroup, value: {...navbarGroup.value, activeItem: action.payload.idItem}};
                        }
                    }
                    return navbarGroup;
                })}};
            }
            return {...state, hotels: {...state.hotels, items: state.hotels.items.map(navbarGroup =>{
                if(navbarGroup.type === navbarItemType.Radio){
                    radiosGroup++;
                    if(radiosGroup === action.payload.idGroup){
                        return{...navbarGroup, value: {...navbarGroup.value, activeItem: action.payload.idItem}};
                    }
                }
                return navbarGroup;
            })}};
        
        case navbarAction.ADD_ACTIVE_ITEM:{
            let checkboxesCount : number = 0;
            if(action.payload.parent === contentPart.Flights){
                return {...state, flights: {...state.flights, items: state.flights.items.map(navbarGroup =>{
                    if(navbarGroup.type === navbarItemType.Checkbox){
                        checkboxesCount++;
                        if(checkboxesCount === action.payload.idGroup){
                            return{
                                ...navbarGroup, 
                                value: {...navbarGroup.value, activeItem: [...navbarGroup.value.activeItem, action.payload.idItem]}
                            }
                        }
                    }
                    return navbarGroup;
                })}};
            }
            return {...state, hotels: {...state.hotels, items: state.hotels.items.map(navbarGroup =>{
                if(navbarGroup.type === navbarItemType.Checkbox){
                    checkboxesCount++;
                    if(checkboxesCount === action.payload.idGroup){
                        return{
                            ...navbarGroup, 
                            value: {...navbarGroup.value, activeItem: [...navbarGroup.value.activeItem, action.payload.idItem]}
                        }
                    }
                }
                return navbarGroup;
            })}};
        }

        case navbarAction.REMOVE_ACTIVE_ITEM:
            let checkboxesCount : number = 0;
            if(action.payload.parent === contentPart.Flights){
                return {...state, flights: {...state.flights, items: state.flights.items.map(navbarGroup =>{
                    if(navbarGroup.type === navbarItemType.Checkbox){
                        checkboxesCount++;
                        if(checkboxesCount === action.payload.idGroup){
                            return{...navbarGroup, value: {
                                ...navbarGroup.value, 
                                activeItem: navbarGroup.value.activeItem.filter(idActive => (idActive !== action.payload.idItem))
                            }}
                        }
                    }
                    return navbarGroup;
                })}};
            }
            return {...state, hotels: {...state.hotels, items: state.hotels.items.map(navbarGroup =>{
                if(navbarGroup.type === navbarItemType.Checkbox){
                    checkboxesCount++;
                    if(checkboxesCount === action.payload.idGroup){
                        return{...navbarGroup, value: {
                            ...navbarGroup.value, 
                            activeItem: navbarGroup.value.activeItem.filter(idActive => (idActive !== action.payload.idItem))
                        }}
                    }
                }
                return navbarGroup;
            })}};

        case navbarAction.SWAP_CHECKBOXES_ACTIVE:
            if(action.payload.parent === contentPart.Flights){
                return{
                    ...state,
                    flights: {...state.hotels, items: state.flights.items.map((navbarGroup, i) => {
                        if(i === action.payload.id && navbarGroup.type === navbarItemType.Checkbox){
                            return {...navbarGroup, value: {...navbarGroup.value, isActive: !(navbarGroup.value.isActive)}};
                        }
                        return navbarGroup;
                    })}
                }
            }
            return{
                ...state,
                hotels: {...state.hotels, items: state.hotels.items.map((navbarGroup, i) => {
                    if(i === action.payload.id && navbarGroup.type === navbarItemType.Checkbox){
                        return {...navbarGroup, value: {...navbarGroup.value, isActive: !(navbarGroup.value.isActive)}}
                    }
                    return navbarGroup
                })}
            }

        default:
            return state;
    }
});

export const navbarSwapActiveAction = (idToggle : number, parent : contentPart) : navbarSwapActive => ({
    type: navbarAction.SWAP_ACTIVE, payload: {idToggle, parent}
})
export const navbarHideActiveAction = (parent : contentPart) : navbarHideActive => ({
    type: navbarAction.HIDE_ACTIVE, payload: parent
})
export const navbarSetFromValueAction = (
    newValue : number, 
    valueType : navbarFromToValueTypes, 
    idItem : number,
    parent : contentPart
) : navbarSetFromValue => ({
    type: navbarAction.SET_FROM_VALUE, payload: {newValue, valueType, idItem, parent}
})
export const navbarSetToValueAction = (
    newValue : number, 
    valueType : navbarFromToValueTypes, 
    idItem : number,
    parent : contentPart
) : navbarSetToValue => ({
    type: navbarAction.SET_TO_VALUE, payload: {newValue, valueType, idItem, parent}
})
export const navbarSetActiveItemAction = (idItem : number, idGroup : number, parent : contentPart) : navbarSetActiveItem => ({
    type: navbarAction.SET_ACTIVE_ITEM, payload: {idItem, idGroup, parent}
})
export const navbarAddActiveItemAction = (idItem : number, idGroup : number, parent : contentPart) : navbarAddActiveItem => ({
    type: navbarAction.ADD_ACTIVE_ITEM, payload: {idItem, idGroup, parent}
})
export const navbarRemoveActiveItemAction = (idItem : number, idGroup : number, parent : contentPart) : navbarRemoveActiveItem => ({
    type: navbarAction.REMOVE_ACTIVE_ITEM, payload: {idItem, idGroup, parent}
})
export const navbarSwapCheckboxesActiveAction = (idCheckboxes : number, parent : contentPart) : navbarSwapCheckboxesActive => ({
    type: navbarAction.SWAP_CHECKBOXES_ACTIVE, payload: {id: idCheckboxes, parent}
})