import React, { type FC } from "react";
import { FILL_RULE, STROKE_LINECAP, STROKE_LINEJOIN, transformPrice, type Hotel as HotelType } from "../../../types";
import { ShortReview } from "../../Common/Blocks/ShortReview";
import { NavLink } from "react-router-dom";
import { hotelsCatalogPath } from "../../../App";
import { Stars } from "../../Common/Blocks/Stars/Stars";
import { ButtonBorder } from "../../Common/Blocks/ButtonBorder";

export const Hotel : FC<HotelType> = ({
    id, name, rating, location, amenities, images, reviews, starsCount, rooms
}) => {
    return(
        <article className="hotel">
            <div className="hotel__image-parent">
                <div className="hotel__images-count">{images.another.length + " images"}</div>
                <picture className="hotel__image">
                    <source srcSet={images.main.srcs.webp} type="image/webp" />
                    <img src={images.main.srcs.jpeg} alt={images.main.alt} />
                </picture>
            </div>
            <div className="hotel__info">
                <div className="hotel__header">
                    <h3 className="hotel__heading">{name}</h3>
                    <div className="hotel__price">
                        <span>starting from</span><mark><strong>${Math.min(...rooms.map(room => transformPrice(room.price)))}</strong>/night</mark><span>excl. tax</span>
                    </div>
                </div>
                <div className="hotel__location location-hotel">
                    <div className="location-hotel__icon-parent">
                        <svg className="location-hotel__icon" width="11.25" height="15.75" fill="none">
                            <path
                                d="M 5.625,6.75 C 6.24632,6.75 6.75,6.24632 6.75,5.625 6.75,5.00368 6.24632,4.5 5.625,4.5 5.00368,4.5 4.5,5.00368 4.5,5.625 4.5,6.24632 5.00368,6.75 5.625,6.75 Z"
                                fill="#112211" fillRule="evenodd" 
                            />
                            <path
                                d="M 5.625,0 C 2.52352,0 0,2.41348 0,5.37891 0,6.79113 0.64371,8.66918 1.9132,10.961 c 1.01953,1.8401 2.19903,3.504 2.8125,4.332 0.10367,0.1414 0.23921,0.2565 0.39563,0.3358 0.15643,0.0793 0.32934,0.1206 0.50472,0.1206 0.17539,0 0.3483,-0.0413 0.50473,-0.1206 C 6.2872,15.5495 6.42274,15.4344 6.52641,15.293 7.1388,14.465 8.3194,12.8011 9.3389,10.961 10.6063,8.66988 11.25,6.79184 11.25,5.37891 11.25,2.41348 8.7265,0 5.625,0 Z m 0,7.875 C 5.17999,7.875 4.74498,7.74304 4.37497,7.49581 4.00496,7.24857 3.71657,6.89717 3.54627,6.48604 3.37597,6.0749 3.33142,5.6225 3.41823,5.18605 3.50505,4.74959 3.71934,4.34868 4.03401,4.03401 4.34868,3.71934 4.74959,3.50505 5.18605,3.41823 5.6225,3.33142 6.0749,3.37597 6.48604,3.54627 6.8972,3.71657 7.2486,4.00496 7.4958,4.37497 7.743,4.74498 7.875,5.17999 7.875,5.625 7.8743,6.22154 7.6371,6.79345 7.2153,7.21527 6.7935,7.63709 6.22154,7.87435 5.625,7.875 Z"
                                fill="#112211" fillRule="nonzero" 
                            />
                        </svg>
                    </div>
                    <span className="location-hotel__text">{location.text}</span>
                </div>
                <div className="hotel__row">
                    <Stars cl="hotel" starsCount={starsCount} />
                    <div className="hotel__amenities amenities-hotel">
                        <div className="amenities-hotel__icon-parent">
                            <svg className="amenities-hotel__icon" viewBox="0 0 13 11.5" width={13} height={11.5} fill="none">
                                <path
                                    d="M 12,0 H 1.5 C 1.36739,0 1.24021,0.05268 1.14645,0.14645 1.05268,0.24021 1,0.36739 1,0.5 v 6 C 1.00091,7.29537 1.31727,8.0579 1.87968,8.6203 2.4421,9.1827 3.20463,9.4991 4,9.5 H 7.5 C 8.29537,9.4991 9.0579,9.1827 9.6203,8.6203 10.1827,8.0579 10.4991,7.29537 10.5,6.5 V 4 h 0.5625 C 11.5762,3.99942 12.0687,3.79511 12.4319,3.43188 12.7951,3.06865 12.9994,2.57618 13,2.0625 V 1 C 13,0.73478 12.8946,0.48043 12.7071,0.29289 12.5196,0.10536 12.2652,0 12,0 Z m 0,2.0625 C 12,2.31114 11.9012,2.5496 11.7254,2.72541 11.5496,2.90123 11.3111,3 11.0625,3 H 10.5 V 1 H 12 Z M 11,10.5 H 0.5 C 0.36739,10.5 0.24021,10.5527 0.14645,10.6464 0.05268,10.7402 0,10.8674 0,11 0,11.1326 0.05268,11.2598 0.14645,11.3536 0.24021,11.4473 0.36739,11.5 0.5,11.5 H 11 c 0.1326,0 0.2598,-0.0527 0.3536,-0.1464 C 11.4473,11.2598 11.5,11.1326 11.5,11 11.5,10.8674 11.4473,10.7402 11.3536,10.6464 11.2598,10.5527 11.1326,10.5 11,10.5 Z"
                                    fill="#112211" fillRule="nonzero" 
                                />
                            </svg>
                        </div>
                        <span className="amenities-hotel__subicon">
                            <strong>{Math.floor(amenities.items.length / 5) * 5 + ((amenities.items.length % 5 === 0) ? "" : "+")}</strong> Amenities
                        </span>
                    </div>
                </div>
                <ShortReview about={{rating: rating, countReviews: reviews.items.length}} parentCls={["hotel"]} />
                <div className="hotel__footer">
                    <ButtonBorder
                        parentCls={["hotel"]} 
                        buttonCl="favourites"
                        value={{
                            viewbox: {minX: 0, minY: 0, width: 16.5, height: 15.25}, height: 15.25, width: 16.5,
                            pathes: [
                                {
                                    d: "m 8.2504,3.25 c 0,0 -1.25,-2.5 -3.78594,-2.5 C 2.40352,0.75 0.771493,2.47422 0.750399,4.53164 0.707431,8.80234 4.13829,11.8395 7.89884,14.3918 8.00251,14.4623 8.12501,14.5 8.2504,14.5 8.37579,14.5 8.49829,14.4623 8.60196,14.3918 12.3621,11.8395 15.793,8.80234 15.7504,4.53164 15.7293,2.47422 14.0973,0.75 12.0363,0.75 c -2.5359,0 -3.7859,2.5 -3.7859,2.5 z",
                                    fill: "unset", fillRule: FILL_RULE.nonzero,
                                    stroke: "rgb(17, 34, 17)", strokeLinecap: STROKE_LINECAP.round,
                                    strokeLinejoin: STROKE_LINEJOIN.round,
                                    strokeWidth: "1.5"
                                }
                            ]
                        }} 
                    />
                    <NavLink className="hotel__link button_green" to={`${hotelsCatalogPath}/${Number(id)+1}`}>View Place</NavLink>
                </div>
            </div>
        </article>
    )
}