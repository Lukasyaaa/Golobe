import React, { FC } from "react";
import {FooterContact} from "../../../types.ts";

interface PostProps{
    about : FooterContact,
}

export const Post : FC<PostProps> = ({about}) => {
    return(
        <article className="container footer__post post-footer">
            <div className="post-footer__inner">
                <h2 className="post-footer__title">{about.heading}</h2>
                <div className="post-footer__supinfo">{about.supDescription}</div>
                <div className="post-footer__info">{about.description}</div>
                <form className="post-footer__row" action="#">
                    <input 
                        className="post-footer__input" onClick={(e) => e.stopPropagation()}
                        type="email" placeholder={about.inputPlaceholder} 
                    />
                    <button className="post-footer__button" type="button" onClick={(e) => e.stopPropagation()}>
                        <span>{about.buttonSend}</span>
                    </button>
                </form>
            </div>
        </article>
    )
}