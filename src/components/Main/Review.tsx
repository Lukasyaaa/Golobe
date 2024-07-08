import React, { FC, useRef, MouseEvent, useEffect } from "react";
import { reviewsItem, } from "../../types";
import googleLogo from "../../assets/img/main/reviews/google.svg"
import { useDispatch } from "react-redux";
import { reviewsSwapIsActiveAction } from "../../store/start/reviewsReducer";

interface ReviewProps{
    id : number,
    about : reviewsItem
}

export const Review : FC<ReviewProps> = ({id, about}) =>{
    const dispatch = useDispatch();
    let infoInner = useRef<HTMLDivElement>(null);

    const showText = (e : MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        dispatch(reviewsSwapIsActiveAction(id));
    }

    return(
        <div className="reviews__item item-reviews">
            <div className="item-reviews__inner">
                <h4 className="item-reviews__title">{about.heading}</h4>
                <div 
                    className="item-reviews__info" 
                    style={{height : (infoInner.current && about.isActive) ? infoInner.current.offsetHeight : 37}}
                >
                    <div ref={infoInner}>
                        {about.info}
                    </div>
                </div>
                <button className="item-reviews__more" type="button" onClick={(e) => showText(e)}>{about.button}</button>
                <div className="item-reviews__stars">
                    {Array.from({ length: about.starsCount }, (_, index) => (
                        <span className="item-reviews__star _icon-star" key={index}></span>
                    ))}
                </div>
                <div className="item-reviews__author">{about.author}</div>
                <div className="item-reviews__hotel">{about.hotel}</div>
                <a className="item-reviews__hotel-link" href={about.hotelLink}>
                    <img src={googleLogo} alt="Google" />
                    <span>Google</span>
                </a>
                <picture className="item-reviews__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
            </div>
        </div>
    )
}