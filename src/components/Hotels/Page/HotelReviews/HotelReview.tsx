import React, { FC } from "react";
import { hotelReview } from "../../../../types";

interface hotelReviewProps{
    about : hotelReview
}

export const HotelReview : FC<hotelReviewProps> = ({about}) => {
    return(
        <div className="reviews-hotel__item item-reviews-hotel">
            <picture className="item-reviews-hotel__image">
                <img src={about.avatar.srcs.jpeg} alt={about.avatar.alt} />
                <source srcSet={about.avatar.srcs.webp} type="img/webp" />
            </picture>
            <div className="item-reviews-hotel__subimage">
                <div className="item-reviews-hotel__header">
                    <div className="item-reviews-hotel__grade"><span>{about.grade + " Very Good"}</span></div>
                    <div className="item-reviews-hotel__author">{about.author}</div>
                </div>
                <div className="item-reviews-hotel__info">{about.info}</div>
            </div>
            <button className="item-reviews-hotel__flag icon-flag" type="button"></button>
        </div>
    )
}