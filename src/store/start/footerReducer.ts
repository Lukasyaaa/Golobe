import logoSvg from "../../assets/img/footer/logo.svg"
import postSvg from "../../assets/img/footer/post.svg"
import { footer } from "../../types"

const defaultStore : footer = {
    post:{
        heading: "Subscribe Newsletter",
        subheading: "The Travel",
        info: "Get inspired! Receive travel discounts, tips and behind the scenes stories.",
        input: "Your email address",
        button: "Subscribe",
        image: postSvg
    },
    main:{
        info:{
            image: {src: logoSvg, alt: "Logo"},
            socials: ["_icon-facebook", "_icon-twitter", "_icon-youtube", "_icon-inst"]
        },
        items:[
            {
                title: "Our Destinations", 
                list:[
                    {value: "Canada", href: "#"}, {value: "Alaska", href: "#"},
                    {value: "France", href: "#"}, {value: "Iceland", href: "#"}
                ], 
                isActive : false
            },
            {
                title: "Our Activities", 
                list:[
                    {value: "Northern Lights", href: "#"}, {value: "Cruising & sailing", href:"#"}, 
                    {value: "Multi-activities", href: "#"}, {value: "Kayaing", href: "#"}
                ], 
                isActive : false
            },
            {
                title: "Travel Blogs", list:[
                    {value: "Bali Travel Guide", href: "#"}, {value: "Sri Lanks Travel Guide", href: "#"}, 
                    {value: "Peru Travel Guide", href: "#"}, {value: "Bali Travel Guide", href: "#"}
                ], 
                isActive : false
            },
            {
                title: "About Us", list:[
                    {value: "Our Story", href: "#"}, {value: "Work with us", href:"#"}
                ], 
                isActive : false
            },
            {
                title: "Contact Us", list:[
                    {value: "Our Story", href: "#"}, {value: "Work with us", href:"#"}
                ], 
                isActive : false
            }
        ]
    }
}

enum footerAction{
    SWAP_IS_ACTIVE = "FOOTER_SWAP_IS_ACTIVE",
    MAKE_ALL_NOT_ACTIVE = "FOOTER_MAKE_ALL_NOT_ACTIVE"
}
type footerSwapIsActive = {
    type: footerAction.SWAP_IS_ACTIVE,
    payload: number
}

type footerMakeAllNotActive = {
    type: footerAction.MAKE_ALL_NOT_ACTIVE
}

type footerActionType = footerSwapIsActive | footerMakeAllNotActive;

export const footerReducer = (state : footer = defaultStore, action : footerActionType) =>{
    switch(action.type){
        case footerAction.SWAP_IS_ACTIVE:
            return {
                ...state, 
                main:{...state.main, items: state.main.items.map((item, index) => {
                    if(index === action.payload){
                        return{...item, isActive: !(item.isActive)}
                    }
                    return{...item}
                })}
            };
        case footerAction.MAKE_ALL_NOT_ACTIVE:
            return{
                ...state,
                main:{...state.main, items: state.main.items.map(item => ({
                    ...item,
                    isActive: false
                }))}
            }
        default:
            return state;
    }
}

export const footerSwapIsActiveAction = (id : number) : footerSwapIsActive => ({
    type: footerAction.SWAP_IS_ACTIVE, payload: id
})
export const footerMakeAllNotActiveAction = () : footerMakeAllNotActive => ({
    type: footerAction.MAKE_ALL_NOT_ACTIVE
})