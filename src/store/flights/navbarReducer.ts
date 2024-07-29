import { airlines, meridiem, navbar, navbarFromToValueTypes, navbarItemType, navbarTitle } from "../../types";

export const defaultStore : navbar = {
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
            title: navbarTitle.Airlines, value: {items: [airlines.Emirates, airlines.FlyDubai, airlines.Qatar, airlines.Etihad], activeItem: [0, 1, 2, 3]}, 
            type: navbarItemType.Checkbox, isActive: true

        },
        {
            title: navbarTitle.Trips, value: {items: ["Round trip", "On Way", "Multi-City", "My Dates Are Flexible"], activeItem: [0, 1, 2, 3]}, 
            type: navbarItemType.Checkbox, isActive: true
        }
    ]
}

enum navbarAction{
    SWAP_ACTIVE = "NAVBAR_SWAP_ACTIVE",
    HIDE_ACTIVE = "NAVBAR_HIDE_ACTIVE",
    SET_FROM_VALUE = "SET_FROM_VALUE",
    SET_TO_VALUE = "SET_TO_VALUE",
    SET_ACTIVE_ITEM = "SET_RADIOS_ACTIVE_ITEM",
    ADD_ACTIVE_ITEM = "ADD_CHECKBOXES_ACTIVE_ITEM",
    REMOVE_ACTIVE_ITEM = "REMOVE_CHECKBOXES_ACTIVE_ITEM"
}

export enum FromOrTo{
    From = 0,
    To = 1
}

type navbarSwapActive = {
    type : navbarAction.SWAP_ACTIVE,
    payload : number
}
type navbarHideActive = {
    type : navbarAction.HIDE_ACTIVE
}

interface navbarSetFromToValuePayload {
    newValue : number,
    valueType : navbarFromToValueTypes,
    idItem : number,
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
    idGroup : number
}
type navbarSetActiveItem = {
    type : navbarAction.SET_ACTIVE_ITEM,
    payload : navbarSetActiveItemPayload
}

interface navbarAddActiveItemPayload{
    idItem : number,
    idGroup : number
}
type navbarAddActiveItem = {
    type : navbarAction.ADD_ACTIVE_ITEM,
    payload : navbarAddActiveItemPayload
}

interface navbarRemoveActiveItemPayload{
    idItem : number,
    idGroup : number
}
type navbarRemoveActiveItem = {
    type : navbarAction.REMOVE_ACTIVE_ITEM,
    payload : navbarRemoveActiveItemPayload
}

type navbarActionType = 
    navbarSwapActive | 
    navbarHideActive | 
    navbarSetFromValue | navbarSetToValue | 
    navbarSetActiveItem |
    navbarAddActiveItem | navbarRemoveActiveItem
;

export const navbarReducer = ((state = defaultStore, action : navbarActionType) : navbar => {
    switch(action.type){
        case navbarAction.SWAP_ACTIVE:
            return {
                ...state, 
                items: state.items.map((group, i) => {
                    return{
                        ...group,
                        isActive: (i === action.payload) ? !(group.isActive) : group.isActive
                    }
                })
            };

        case navbarAction.HIDE_ACTIVE:
            return {...state, items: state.items.map(group => ({...group, isActive: false}))};

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
            
                return {...state, items: state.items.map((item, i) => {
                    if(i === action.payload.idItem && 
                        item.type === navbarItemType.FromTo && item.valueType === navbarFromToValueTypes.Time){
                        return {
                            ...item, 
                            value: {...item.value, from: {hour: hourValue, minute: minuteValue, meridiem: meridiemValue}},
                        };
                    };
                    return {...item};
                })};
            }
            return{...state, items: state.items.map((item, i) => {
                if(i === action.payload.idItem &&
                    item.type === navbarItemType.FromTo && item.valueType === navbarFromToValueTypes.Number){
                    return{...item, value: {...item.value, from: action.payload.newValue}}
                }
                return {...item};
            })}

        case navbarAction.SET_TO_VALUE:
            if(action.payload.newValue === 1440){
            }
            if(action.payload.valueType === navbarFromToValueTypes.Time){
                let hourValue : number = (action.payload.newValue === 1440) ? 12 : Math.floor(action.payload.newValue / 60);
                const minuteValue : number = action.payload.newValue % 60;
                const meridiemValue : meridiem = (action.payload.newValue === 1440) ? 
                    meridiem.AM : 
                    (hourValue >= 12) ? meridiem.PM : meridiem.AM;
                if(hourValue > 12 && meridiemValue === meridiem.PM){
                    hourValue = hourValue % 12;
                }
        
                return {...state, items: state.items.map((item, i) => {
                    if(i === action.payload.idItem && 
                        item.type === navbarItemType.FromTo && item.valueType === navbarFromToValueTypes.Time){
                        return {
                            ...item, 
                            value: {...item.value, to: {hour: hourValue, minute: minuteValue, meridiem: meridiemValue}},
                        };
                    };
                    return {...item};
                })};
            }
            return{...state, items: state.items.map((item, i) => {
                if(i === action.payload.idItem &&
                    item.type === navbarItemType.FromTo && item.valueType === navbarFromToValueTypes.Number){
                    return{...item, value: {...item.value, to: action.payload.newValue}}
                }
                return {...item};
            })}

        case navbarAction.SET_ACTIVE_ITEM:
            let radiosGroup : number = 0;
            return {...state, items: state.items.map(item =>{
                if(item.type === navbarItemType.Radio){
                    radiosGroup++;
                    if(radiosGroup === action.payload.idGroup){
                        return{...item, value: {...item.value, activeItem: action.payload.idItem}};
                    }
                }
                return{...item};
            })}
        
        case navbarAction.ADD_ACTIVE_ITEM:{
            let checkboxesCount : number = 0;
            return {...state, items: state.items.map(item =>{
                if(item.type === navbarItemType.Checkbox){
                    checkboxesCount++;
                    if(checkboxesCount === action.payload.idGroup){
                        return{...item, value: {...item.value, activeItem: [...item.value.activeItem, action.payload.idItem]}}
                    }
                }
                return{...item}
            })};
        }

        case navbarAction.REMOVE_ACTIVE_ITEM:
            let checkboxesCount : number = 0;
            return {...state, items: state.items.map(item =>{
                if(item.type === navbarItemType.Checkbox){
                    checkboxesCount++;
                    if(checkboxesCount === action.payload.idGroup){
                        return{...item, value: {
                            ...item.value, 
                            activeItem: item.value.activeItem.filter(idActive => (idActive !== action.payload.idItem))
                        }}
                    }
                }
                return{...item};
            })};

        default:
            return state;
    }
});

export const navbarSwapActiveAction = (id : number) : navbarSwapActive => ({
    type: navbarAction.SWAP_ACTIVE, payload: id
})
export const navbarHideActiveAction = () : navbarHideActive => ({
    type: navbarAction.HIDE_ACTIVE
})
export const navbarSetFromValueAction = (
    newValue : number, 
    valueType : navbarFromToValueTypes, 
    idItem : number,
) : navbarSetFromValue => ({
    type: navbarAction.SET_FROM_VALUE, payload: {newValue, valueType, idItem}
})
export const navbarSetToValueAction = (
    newValue : number, 
    valueType : navbarFromToValueTypes, 
    idItem : number,
) : navbarSetToValue => ({
    type: navbarAction.SET_TO_VALUE, payload: {newValue, valueType, idItem}
})
export const navbarSetActiveItemAction = (idItem : number, idGroup : number) : navbarSetActiveItem => ({
    type: navbarAction.SET_ACTIVE_ITEM, payload: {idItem, idGroup}
})
export const navbarAddActiveItemAction = (idItem : number, idGroup : number) : navbarAddActiveItem => ({
    type: navbarAction.ADD_ACTIVE_ITEM, payload: {idItem, idGroup}
})
export const navbarRemoveActiveItemAction = (idItem : number, idGroup : number) : navbarRemoveActiveItem => ({
    type: navbarAction.REMOVE_ACTIVE_ITEM, payload: {idItem, idGroup}
})