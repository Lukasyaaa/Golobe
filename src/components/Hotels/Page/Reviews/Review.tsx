import React, { type FC } from "react";
import { getGrade, getRating, type HotelReview } from "../../../../types";

export const Review : FC<HotelReview> = ({grade, author, review, ava}) => {
    return(
        <div className="reviews-hotel__item item-reviews-hotel">
            <picture className="item-reviews-hotel__ava">
                <source srcSet={ava.webp} type="image/webp" />
                <img src={ava.jpeg} alt={author.firstName + "s review"} />
            </picture>
            <div className="item-reviews-hotel__info">
                <div className="item-reviews-hotel__header">
                    <strong>{getRating(grade) + " " + getGrade(grade)}</strong> | {author.firstName + " " + author.lastName}
                </div>
                <div className="item-reviews-hotel__main">{review}</div>
            </div>
            <button className="item-reviews-hotel__flag" type="button">
                <svg className="item-reviews-hotel__flag-icon" viewBox="0 0 15 17.5" width="15" height="17.5" fill="none">
                    <path
                        d="M 0.625,17.5 C 0.45924,17.5 0.30027,17.4342 0.18306,17.3169 0.06585,17.1997 0,17.0408 0,16.875 V 1.41133 C 4e-5,1.24757 0.04298,1.08668 0.12454,0.94468 0.20609,0.80268 0.32342,0.68451 0.46484,0.60195 0.9375,0.32734 1.88984,0 3.75,0 5.20352,0 6.8293,0.57461 8.2637,1.08125 9.4187,1.48945 10.5098,1.875 11.25,1.875 c 0.9529,-0.00292 1.8957,-0.19547 2.7734,-0.56641 0.1069,-0.04511 0.2233,-0.06308 0.3388,-0.0523 0.1155,0.01079 0.2266,0.04999 0.3233,0.11411 0.0967,0.06412 0.176,0.15118 0.2309,0.2534 C 14.9713,1.72602 15,1.84023 15,1.95625 V 10.525 c -2e-4,0.1519 -0.0446,0.3004 -0.1278,0.4274 -0.0833,0.1271 -0.2017,0.2271 -0.341,0.2878 -0.3402,0.1489 -1.5824,0.6348 -3.2812,0.6348 -0.943,0 -2.1242,-0.2789 -3.3746,-0.5746 C 6.46992,10.9684 5.0168,10.625 3.75,10.625 c -1.44023,0 -2.17734,0.218 -2.5,0.3559 v 5.8941 c 0,0.1658 -0.06585,0.3247 -0.18306,0.4419 C 0.94973,17.4342 0.79076,17.5 0.625,17.5 Z"
                        fill="rgba(17, 34, 17, 0.75)" fillRule="nonzero" 
                    />
                </svg>
            </button>
        </div>
    )
}