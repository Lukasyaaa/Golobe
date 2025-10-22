import { createSlice } from "@reduxjs/toolkit";
import type { Link, Newsletter, objType } from "../types";

export const SOCIALS = {
    facebook: "FACEBOOK",
    twitter: "TWITTER",
    youtube: "YOUTUBE",
    instagram: "INSTAGRAM"
} as const;

export interface Column{
    title: string,
    links: Link[]
}
interface FooterMain{
    socials: Link<objType<typeof SOCIALS>>[],
    columns: Column[]
}

interface Footer{
    newsletter : Newsletter,
    main: FooterMain
}

const initialState : Footer = {
    newsletter: {
        heading: "Subscribe Newsletter",
        supdescription: "The Travel",
        description: "Get inspired! Receive travel discounts, tips and behind the scenes stories.",
        inputPlaceholder: "Your email address",
        subscribe: "Subscribe"
    },
    main: {
        socials: [
            {description: SOCIALS.facebook, path: "#"},
            {description: SOCIALS.twitter, path: "#"},
            {description: SOCIALS.youtube, path: "#"},
            {description: SOCIALS.instagram, path: "#"},
        ],
        columns: [
            {
                title: "Our Destinations", 
                links: [
                    {description: "Canada", path: "#"}, 
                    {description: "Alaksa", path: "#"}, 
                    {description: "France", path: "#"},
                    {description: "Iceland", path: "#"}
                ]
            },
            {
                title: "Our Activities", 
                links: [
                    {description: "Northern Lights", path: "#"}, 
                    {description: "Cruising & sailing", path: "#"}, 
                    {description: "Multi-activities", path: "#"},
                    {description: "Kayaing", path: "#"}
                ]
            },
            {
                title: "Travel Blogs", 
                links: [
                    {description: "Bali Travel Guide", path: "#"}, 
                    {description: "Sri Lanks Travel Guide", path: "#"}, 
                    {description: "Peru Travel Guide", path: "#"},
                    {description: "Bali Travel Guide", path: "#"}
                ]
            },
            {
                title: "About Us", 
                links: [
                    {description: "Our Story", path: "#"}, 
                    {description: "Work with us", path: "#"}
                ]
            },
            {
                title: "Contact Us", 
                links: [
                    {description: "Our Story", path: "#"}, 
                    {description: "Work with us", path: "#"}
                ]
            }
        ]
    }
};

export const footerSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {}
});