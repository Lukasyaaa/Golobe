import React, { FC, useRef } from "react";
import { Review as ReviewInterface } from "../../../types";
import googleLogo from "../../../assets/img/start/reviews/google.svg";

interface ReviewProps{
    about : ReviewInterface
}

export const Review : FC<ReviewProps> = ({about}) => {
    let messageElement = useRef<HTMLDivElement>(null);
    let messageInnerElement = useRef<HTMLDivElement>(null);
    const toggleMessage = (e) => {
        e.stopPropagation();
        if(messageElement.current && messageInnerElement){
            console.log(parseInt(getComputedStyle(messageElement.current).height))
            if(parseInt(getComputedStyle(messageElement.current).height) !== messageInnerElement.current.offsetHeight){
                messageElement.current.style.height = messageInnerElement.current.offsetHeight + "px";
            } else {
                messageElement.current.style.height = "";
            }
        }
    }

    return(
        <article className="reviews__item item-reviews">
            <h3 className="item-reviews__title">{"“" + about.title + "”"}</h3>
            <div className="item-reviews__message" ref={messageElement}>
                <div ref={messageInnerElement}>{about.message}</div>
            </div>
            <button className="item-reviews__more" type="button" onClick={toggleMessage}>{about.showMore}</button>
            <ul className="item-reviews__stars">
                {Array.from({length: 5}).map((_, i) => {
                    const iconClass = (i < about.countStars) ? "icon-star" : "icon-star_empty";
                    return(
                        <li key={i} className={"item-reviews__star " + iconClass}></li>
                    )
                })}
            </ul>
            <div className="item-reviews__author">{about.author}</div>
            <div className="item-reviews__place">{about.place.text}</div>
            <a className="item-reviews__link" href={about.place.href}>
                <img src={googleLogo} alt="Google" />
                <span>Google</span>
            </a>
            <picture className="item-reviews__image">
                <source srcSet={about.image.srcs.webp} type="image/webp" />
                <img src={about.image.srcs.jpeg} alt={about.image.alt} />
            </picture>
        </article>
    )
}