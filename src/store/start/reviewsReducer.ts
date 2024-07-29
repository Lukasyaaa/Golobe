import { reviewsItem, sectionHeaderItems } from "../../types"
//--------------------------WEBP--------------
import reviewsWebp_1 from "../../assets/img/main/reviews/items/1.webp"
import reviewsWebp_2 from "../../assets/img/main/reviews/items/2.webp"
import reviewsWebp_3 from "../../assets/img/main/reviews/items/3.webp"
//--------------------------JPEG--------------
import reviewsJpeg_1 from "../../assets/img/main/reviews/items/1.jpeg"
import reviewsJpeg_2 from "../../assets/img/main/reviews/items/2.jpeg"
import reviewsJpeg_3 from "../../assets/img/main/reviews/items/3.jpeg"

let defaultStore : sectionHeaderItems<reviewsItem> = {
    items:[
        {
            image: {srcs: {webp: reviewsWebp_1, jpeg: reviewsJpeg_1}, alt: "Fuck"},
            heading: "“A real sense of community, nurtured”", 
            info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
            button: "View More",
            starsCount: 5,
            author: "Olga",
            hotel: "Weave Studios – Kai Tak",
            hotelLink: "#",
            isActive: false
        },
        {
            image: {srcs: {webp: reviewsWebp_2, jpeg: reviewsJpeg_2}, alt: "Fuck"},
            heading: "“The facilities are superb. Clean, slick, bright.”", 
            info: "“A real sense of community, nurtured”Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
            button: "View More",
            starsCount: 5,
            author: "Thomas",
            hotel: "Weave Studios – Olympic",
            hotelLink: "#",
            isActive: false
        },
        {
            image: {srcs: {webp: reviewsWebp_3, jpeg: reviewsJpeg_3}, alt: "Fuck"}, 
            heading: "“A real sense of community, nurtured”", 
            info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
            button: "View More",
            starsCount: 5,
            author: "Eliot",
            hotel: "Weave Studios – Kai Tak",
            hotelLink: "#",
            isActive: false
        }
    ],
    header:{
        heading: "Reviews", 
        info: "What people says about Golobe facilities",
        button: "See All"
    }
}

enum reviewsAction{
    SWAP_ACTIVE = "REVIEWS_SWAP_ACTIVE",
    HIDE_ACTIVE = "REVIEWS_HIDE_ACTIVE"
}

type reviewsSwapActive = {
    type : reviewsAction.SWAP_ACTIVE,
    payload : number,
}

type reviewsHideActive = {
    type: reviewsAction.HIDE_ACTIVE
}

export type reviewsActionType = reviewsSwapActive | reviewsHideActive;

export const reviewsReducer = (
    state : sectionHeaderItems<reviewsItem> = defaultStore, 
    action : reviewsActionType
) : sectionHeaderItems<reviewsItem> =>{
    switch(action.type){
        case reviewsAction.SWAP_ACTIVE:
            return {
                ...state, 
                items: state.items.map((item, i) => {
                    return{
                        ...item,
                        isActive: (i === action.payload) ? !item.isActive : item.isActive
                    }
                })
            };
        case reviewsAction.HIDE_ACTIVE:
            return{
                ...state,
                items: state.items.map(item => ({...item, isActive: false}))
            };
        default:
            return state;
    }
}

export const reviewsSwapActiveAction = (id = -1) : reviewsSwapActive => ({
    type: reviewsAction.SWAP_ACTIVE, payload: id
})
export const reviewsHideActiveAction = () : reviewsHideActive => ({
    type: reviewsAction.HIDE_ACTIVE
})