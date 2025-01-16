import React, { FC } from "react";
import { Post } from "./Post.tsx";
import { FooterColumn } from "./FooterColumn.tsx";
import logo from "../../../assets/img/logos/black-white.svg";
import { FooterColumn as FooterColumnInterface } from "../../../types";

export const Footer : FC = () => {
    const about : FooterColumnInterface[] = [
        { 
            title: "Our Destinations", links: [
                {href: "#", text: "Canada"}, {href: "#", text: "Alaksa"}, 
                {href: "#", text: "France"}, {href: "#", text: "Iceland"}
            ] 
        },
        { 
            title: "Our Activities", links: [
                {href: "#", text: "Northern Lights"}, {href: "#", text: "Cruising & sailing"}, 
                {href: "#", text: "Multi-activities"}, {href: "#", text: "Kayaing"}
            ] 
        },
        { 
            title: "Travel Blogs", links: [
                {href: "#", text: "Bali Travel Guide"}, {href: "#", text: "Sri Lanks Travel Guide"}, 
                {href: "#", text: "Peru Travel Guide"}, {href: "#", text: "Bali Travel Guide"}
            ] 
        },
        { 
            title: "About Us", links: [
                {href: "#", text: "Our Story"}, {href: "#", text: "Work with us"}
            ] 
        },
        { 
            title: "Contact Us", links: [
                {href: "#", text: "Our Story"}, {href: "#", text: "Work with us"}
            ] 
        }
    ]

    return(
        <footer className="footer">
            <Post />
            <div className="footer__main">
                <div className="container">
                    <div className="footer__info">
                        <img className="footer__image" src={logo} alt="Logo" />
                        <ul className="footer__socials">
                            <li className="footer__social">
                                <a className="icon-facebook" href="#"></a>
                            </li>
                            <li className="footer__social">
                                <a className="icon-twitter" href="#"></a>
                            </li>
                            <li className="footer__social">
                                <a className="icon-youtube" href="#"></a>
                            </li>
                            <li className="footer__social">
                                <a className="icon-inst" href="#"></a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__columns">
                        {about.map((column, i) => 
                            <FooterColumn key={i} about={column} />
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}