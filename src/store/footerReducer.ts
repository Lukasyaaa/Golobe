import logoSvg from "../assets/img/footer/logo.svg"
import { footer, footerItem } from "../types"

const defaultStore : footer = {
    post:{
        heading: "Subscribe Newsletter",
        subheading: "The Travel",
        info: "Get inspired! Receive travel discounts, tips and behind the scenes stories.",
        input: "Your email address",
        button: "Subscribe",
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
                isActive : false,
            },
            {
                title: "Our Activities", 
                list:[
                    {value: "Northern Lights", href: "#"}, {value: "Cruising & sailing", href:"#"}, 
                    {value: "Multi-activities", href: "#"}, {value: "Kayaing", href: "#"}
                ], 
                isActive : false,
            },
            {
                title: "Travel Blogs", list:[
                    {value: "Bali Travel Guide", href: "#"}, {value: "Sri Lanks Travel Guide", href: "#"}, 
                    {value: "Peru Travel Guide", href: "#"}, {value: "Bali Travel Guide", href: "#"}
                ], 
                isActive : false,
            },
            {
                title: "About Us", list:[
                    {value: "Our Story", href: "#"}, {value: "Work with us", href:"#"}
                ], 
                isActive : false,
            },
            {
                title: "Contact Us", list:[
                    {value: "Our Story", href: "#"}, {value: "Work with us", href:"#"}
                ], 
                isActive : false,
            },
        ]
    }
}

enum footerAction{
    CHANGE_IS_ACTIVE = "FOOTER_CHANGE_IS_ACTIVE",
}

type footerChangeIsActive ={
    type: footerAction.CHANGE_IS_ACTIVE,
    payload: number,
}

export const footerReducer = (state : footer = defaultStore, action : footerChangeIsActive) =>{
    switch(action.type){
        case footerAction.CHANGE_IS_ACTIVE:
            let newItems : footerItem[] = state.main.items;
            if(action.payload === -1){
                newItems.forEach(item =>{
                    item.isActive = false;
                })
            }else if(typeof action.payload === "number"){
                newItems[action.payload].isActive = !(newItems[action.payload].isActive)
            }
            return {...state, main:{...state.main, newItems}};
        default:
            return state;
    }
}

export const footerChangeIsActiveAction = (id : number = -1) : footerChangeIsActive => ({
    type: footerAction.CHANGE_IS_ACTIVE, payload: id
})