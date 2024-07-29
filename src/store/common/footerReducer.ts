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
            socials: [
                {icon: "_icon-facebook", href: "#"}, 
                {icon: "_icon-twitter", href: "#"}, 
                {icon: "_icon-youtube", href: "#"}, 
                {icon: "_icon-facebook", href: "#"}]
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
    HIDE_ACTIVE = "FOOTER_HIDE_ACTIVE"
}
type footerSwapActive = {
    type: footerAction.SWAP_IS_ACTIVE,
    payload: number
}

type footerHideActive = {
    type: footerAction.HIDE_ACTIVE
}

type footerActionType = footerSwapActive | footerHideActive;

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
        case footerAction.HIDE_ACTIVE:
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

export const footerSwapActiveAction = (id : number) : footerSwapActive => ({
    type: footerAction.SWAP_IS_ACTIVE, payload: id
})
export const footerHideActiveAction = () : footerHideActive => ({
    type: footerAction.HIDE_ACTIVE
})