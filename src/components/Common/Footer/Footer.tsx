import React, { FC, Fragment } from "react";
import { useTypedSelector } from "../../../helperFunctions.ts";
import { Post } from "./Post.tsx";
import { FooterColumn } from "./FooterColumn.tsx";

export const Footer : FC = () => {
    const about = useTypedSelector(state => state.footer);

    return(
        <footer className="footer">
            <Post about={about.contact} />
            <div className="footer__main">
                <div className="container">
                    <div className="footer__info">
                        <img className="footer__image" src={about.logo} alt="Logo" />
                        <ul className="footer__socials">
                            {about.socials.map((social, i) => 
                                <li className="footer__social" key={i}>
                                    <a className={social.description} href={social.path} onClick={(e) => e.stopPropagation()}>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="footer__columns">
                        {about.columns.map((column, i) => 
                            <FooterColumn key={i} about={column} />
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}