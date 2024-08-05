import { recent, recentItem } from "../../types"
//--------------------------WEBP--------------
import tripVariantWebp_1 from "../../assets/img/main/trip-variants/1/1.webp"
import tripVariantWebp_2 from "../../assets/img/main/trip-variants/2/2.webp"
import tripVariantWebp_3 from "../../assets/img/main/trip-variants/3/3.webp"
import tripVariantWebp_4 from "../../assets/img/main/trip-variants/4/4.webp"
//--------------------------JPEG--------------
import tripVariantJpeg_1 from "../../assets/img/main/trip-variants/1/1.jpeg"
import tripVariantJpeg_2 from "../../assets/img/main/trip-variants/2/2.jpeg"
import tripVariantJpeg_3 from "../../assets/img/main/trip-variants/3/3.jpeg"
import tripVariantJpeg_4 from "../../assets/img/main/trip-variants/4/4.jpeg"

const defaultStore : recent  = {
    heading: "Your recent searches",
    items:[
        {
            image: {srcs: {webp: tripVariantWebp_1, jpeg: tripVariantJpeg_1}, alt: "Istanbul, Turkey"}, 
            title: "Istanbul, Turkey", countHotels: 325
        },
        {
            image: {srcs: {webp: tripVariantWebp_2, jpeg: tripVariantJpeg_2}, alt: "Sydney, Australia"}, 
            title: "Sydney, Australia", countHotels: 325
        },
        {
            image: {srcs: {webp: tripVariantWebp_3, jpeg: tripVariantJpeg_3}, alt: "Baku, Azerbaijan"}, 
            title: "Baku, Azerbaijan", countHotels: 325
        },
        {
            image: {srcs: {webp: tripVariantWebp_4, jpeg: tripVariantJpeg_4}, alt: "Malé, Maldives"}, 
            title: "Malé, Maldives", countHotels: 325
        }
    ]
}
enum hotelsRecentAction{
    ADD_ITEM = "RECENT_ADD_ITEM",
    REMOVE_ITEM = "RECENT_REMOVE_ITEM"
}

type hotelsRecentAddItem = {
    type : hotelsRecentAction.ADD_ITEM,
    payload : recentItem
}

type hotelsRecentRemoveItem = {
    type : hotelsRecentAction.REMOVE_ITEM,
    payload : number
}

type hotelsRecentActionType = hotelsRecentAddItem | hotelsRecentRemoveItem;

export const hotelsRecentReducer = (state : recent = defaultStore, action : hotelsRecentActionType) : recent => {
    switch (action.type){
        case hotelsRecentAction.ADD_ITEM:
            return {...state, items: [...state.items, action.payload]};
        case hotelsRecentAction.REMOVE_ITEM:
            return {...state, items: state.items.filter((_, i) => i !== action.payload)};
        default:
            return state;
    }
};

export const hotelsRecentAddItemAction = (newItem : recentItem) : hotelsRecentAddItem => ({
    type: hotelsRecentAction.ADD_ITEM, payload: newItem
})
export const hotelsRecentRemoveItemAction = (id : number) : hotelsRecentRemoveItem => ({
    type: hotelsRecentAction.REMOVE_ITEM, payload: id
})