import React, { FC, useRef, MouseEvent, useEffect } from "react";
import { imageVariants, reviewsItemText, srcs } from "../../types";
import googleLogo from "../../assets/img/main/reviews/google.svg"
import { useDispatch } from "react-redux";
import { reviewsChangeIsActiveAction } from "../../store/reviewsReducer";

interface ReviewProps{
    id : number,
    text : reviewsItemText,
    image : imageVariants,
    hotelLink : string,
    isActive : boolean,
}

export const Review : FC<ReviewProps> = ({id, text, image, hotelLink, isActive}) =>{
    const dispatch = useDispatch();
    let infoInner = useRef<HTMLDivElement>(null);

    const showText = (e : MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        dispatch(reviewsChangeIsActiveAction(id));
    }

    return(
        <div className="reviews__item item-reviews">
            <div className="item-reviews__inner">
                <h4 className="item-reviews__title">{text.heading}</h4>
                <div 
                    className="item-reviews__info" 
                    style={{height : (infoInner.current && isActive) ? infoInner.current.offsetHeight : 37}}
                >
                    <div ref={infoInner}>
                        {text.info}
                    </div>
                </div>
                <button className="item-reviews__more" type="button" onClick={(e) => showText(e)}>{text.button}</button>
                <div className="item-reviews__stars">
                    {Array.from({ length: text.starsCount }, (_, index) => (
                        <span className="item-reviews__star _icon-star" key={index}></span>
                    ))}
                </div>
                <div className="item-reviews__author">{text.author}</div>
                <div className="item-reviews__hotel">{text.hotel}</div>
                <a className="item-reviews__hotel-link" href={hotelLink}>
                    <img src={googleLogo} alt="Google" />
                    <span>Google</span>
                </a>
                <picture className="item-reviews__image">
                    <img src={image.srcs.jpeg} alt={image.alt} />
                    <source srcSet={image.srcs.webp} type="img/webp" />
                </picture>
            </div>
        </div>
    )
}