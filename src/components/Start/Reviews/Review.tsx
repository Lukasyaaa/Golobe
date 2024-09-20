import React, { FC, Fragment, useRef, useState } from "react";
import { reviewItem, reviewsLinkToLocation } from "../../../types";

interface reviewProps{
    about : reviewItem,
    linkToLocation : reviewsLinkToLocation,
    viewAll : string
}

export const Review : FC<reviewProps> = ({about, linkToLocation, viewAll}) => {
    let infoInnner = useRef<HTMLDivElement>(null);
    let [isActive, setIsActive] = useState<boolean>(false);

    const toggleSpoiler = () =>{
        setIsActive(prev => !prev);
    }

    return(
        <div className="reviews__item item-reviews">
            <div className="item-reviews__inner">
                <h3 className="item-reviews__title">{"“" + about.title + "”"}</h3>
                <div 
                    className="item-reviews__info"
                    style={{height: (isActive) ? ((infoInnner.current) ? infoInnner.current.offsetHeight : "auto") : "37px"}}
                >
                    <div ref={infoInnner}>{about.info}</div>
                </div>
                <button className="item-reviews__more" type="button" onClick={toggleSpoiler}>{viewAll}</button>
                <ul className="item-reviews__stars">
                    {new Array(5).fill(0).map((star, i) => {
                        if(i < about.countStars - 1){
                            return <li className="item-reviews__star filled icon-star"></li>
                        }
                        return <li className="item-reviews__star icon-star"></li>
                    })}
                </ul>
                <div className="item-reviews__author">{about.author}</div>
                <div className="item-reviews__place">{about.hotel.company + " – " + about.hotel.location}</div>
                {about.hotel.linkToLocation !== "" &&
                    <a className="item-reviews__link" href={about.hotel.linkToLocation}>
                        <img src={linkToLocation.googleLogo} alt="Google Logo" />
                        <span>{linkToLocation.subGoogleLogo}</span>
                    </a>
                }
                <picture className="item-reviews__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
            </div>
        </div>
    )
}