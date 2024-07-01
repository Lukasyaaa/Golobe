import { reviewsItem, sectionHeaderItems } from "../types"
//--------------------------WEBP--------------
import reviewsWebp_1 from "../assets/img/main/reviews/items/1.webp"
import reviewsWebp_2 from "../assets/img/main/reviews/items/2.webp"
import reviewsWebp_3 from "../assets/img/main/reviews/items/3.webp"
//--------------------------JPEG--------------
import reviewsJpeg_1 from "../assets/img/main/reviews/items/1.jpeg"
import reviewsJpeg_2 from "../assets/img/main/reviews/items/2.jpeg"
import reviewsJpeg_3 from "../assets/img/main/reviews/items/3.jpeg"

let defaultStore : sectionHeaderItems<reviewsItem> = {
    items:[
        {
            image: {srcs: {webp: reviewsWebp_1, jpeg: reviewsJpeg_1}, alt: "Fuck"},
            text: {
                heading: "“A real sense of community, nurtured”", 
                info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                button: "View More",
                starsCount: 5,
                author: "Olga",
                hotel: "Weave Studios – Kai Tak",
            },
            hotelLink: "#",
            isActive: false,
        },
        {
            image: {srcs: {webp: reviewsWebp_2, jpeg: reviewsJpeg_2}, alt: "Fuck"},
            text: {
                heading: "“The facilities are superb. Clean, slick, bright.”", 
                info: "“A real sense of community, nurtured”Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
                button: "View More",
                starsCount: 5,
                author: "Thomas",
                hotel: "Weave Studios – Olympic",
            },
            hotelLink: "#",
            isActive: false,
        },
        {
            image: {srcs: {webp: reviewsWebp_3, jpeg: reviewsJpeg_3}, alt: "Fuck"}, 
            text: {
                heading: "“A real sense of community, nurtured”", 
                info: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
                button: "View More",
                starsCount: 5,
                author: "Eliot",
                hotel: "Weave Studios – Kai Tak",
            },
            hotelLink: "#",
            isActive: false,
        }
    ],
    header:{
        heading: "Reviews", 
        info: "What people says about Golobe facilities",
        button: "See All",
    }
}

enum reviewsAction{
    CHANGE_IS_ACTIVE = "REVIEWS_CHANGE_IS_ACTIVE",
}

type reviewsChangeIsActive = {
    type : reviewsAction.CHANGE_IS_ACTIVE,
    payload : number,
}

export const reviewsReducer = (
    state : sectionHeaderItems<reviewsItem> = defaultStore, 
    action : reviewsChangeIsActive
) : sectionHeaderItems<reviewsItem> =>{
    switch(action.type){
        case reviewsAction.CHANGE_IS_ACTIVE:
            if(action.payload === -1){
                return {
                    ...state, 
                    items: state.items.map(item => ({...item, isActive: false}))
                };
            }
            if(typeof action.payload === "number"){
                return{
                    ...state,
                    items: state.items.map((item, index) => {
                        if(index === action.payload){
                            return{...item, isActive: (!item.isActive)};
                        }else{
                            return{...item, isActive: item.isActive};
                        }
                    })
                }
            }
            return state;
        default:
            return state;
    }
}

export const reviewsChangeIsActiveAction = (id = -1) : reviewsChangeIsActive => ({type: reviewsAction.CHANGE_IS_ACTIVE, payload: id})