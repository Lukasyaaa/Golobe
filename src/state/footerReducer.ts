import post from "../assets/img/footer/post.svg";
import logo from "../assets/img/logos/black-white.svg";
import { Footer, Socials } from "../types.ts";

const defaultStore : Footer = {
    contact: {
        heading: "Subscribe Newsletter",
        supDescription: "The Travel",
        description: "Get inspired! Receive travel discounts, tips and behind the scenes stories.",
        inputPlaceholder: "Your email address",
        buttonSend: "Subscribe",
        image: "post"
    },
    logo: logo,
    socials: [
        { description: Socials.Facebook, path: "#" },
        { description: Socials.Instagram, path: "#" },
        { description: Socials.Youtube, path: "#" },
        { description: Socials.Twitter, path: "#" }   
    ],
    columns: [
        {
            title: "Our Destinations", 
            links: [
                { description: "Canada", path: "#" },
                { description: "Alaksa", path: "#" },
                { description: "France", path: "#" },
                { description: "Iceland", path: "#" }
            ]
        },
        {
            title: "Our Activities", 
            links: [
                { description: "Northern Lights", path: "#" },
                { description: "Cruising & sailing", path: "#" },
                { description: "Multi-activities", path: "#" },
                { description: "Kayaing", path: "#" }
            ]
        },
        {
            title: "Travel Blogs", 
            links: [
                { description: "Bali Travel Guide", path: "#" },
                { description: "Sri Lanks Travel Guide", path: "#" },
                { description: "Peru Travel Guide", path: "#" },
                { description: "Bali Travel Guide", path: "#" }
            ]
        },
        {
            title: "About Us", 
            links: [
                { description: "Our Story", path: "#" },
                { description: "Work with us", path: "#" }
            ]
        },
        {
            title: "Contact Us", 
            links: [
                { description: "Our Story", path: "#" },
                { description: "Work with us", path: "#" }
            ]
        },
    ]
}

export const footerReducer = (store = defaultStore) => store;