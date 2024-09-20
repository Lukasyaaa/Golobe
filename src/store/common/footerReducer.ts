import { footer, socialType } from "../../types";
import footerLogo from "../../assets/img/logos/blackWhite.svg"
import footerPost from "../../assets/img/footer/post.svg"

const defaultState : footer = {
    post:{
        heading: "Subscribe Newsletter",
        title: "The Travel",
        subtitle: "Get inspired! Receive travel discounts, tips and behind the scenes stories.",
        form:{
            inputPlaceholder: "Your email address",
            buttonSumbit: "Subscribe",
        },
        image: {src: footerPost, alt: "Post"}
    },
    main:{
        info:{
            logo: {src: footerLogo, alt: "Golobe Logo"},
            socials: [
                {path: "#", type: socialType.Facebook},
                {path: "#", type: socialType.Twitter},
                {path: "#", type: socialType.YouTube},
                {path: "#", type: socialType.Instagram},
            ]
        },
        groups:[
            {
                title: "Our Destinations", links: [
                    {description: "Canada", path: "#"},
                    {description: "Alaksa", path: "#"},
                    {description: "France", path: "#"},
                    {description: "Iceland", path: "#"}
                ]
            },
            {
                title: "Our Activities", links: [
                    {description: "Northern Lights", path: "#"},
                    {description: "Cruising & sailing", path: "#"},
                    {description: "Multi-activities", path: "#"},
                    {description: "Kayaing", path: "#"}
                ]
            },
            {
                title: "Travel Blogs", links: [
                    {description: "Bali Travel Guide", path: "#"},
                    {description: "Sri Lanks Travel Guide", path: "#"},
                    {description: "Peru Travel Guide", path: "#"},
                    {description: "Bali Travel Guide", path: "#"}
                ]
            },
            {
                title: "About Us", links: [
                    {description: "Our Story", path: "#"},
                    {description: "Work with us", path: "#"}
                ]
            },
            {
                title: "Contact Us", links: [
                    {description: "Our Story", path: "#"},
                    {description: "Work with us", path: "#"}
                ]
            }
        ]
    }
}

export const footerReducer = (state = defaultState) => state;