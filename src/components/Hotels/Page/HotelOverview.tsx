import React, { FC, Fragment } from "react";
import { hotel } from "../../../types";

interface hotelOverviewProps{
    about : hotel
}

export const HotelOverview : FC<hotelOverviewProps> = ({about}) => {
    let sumRating = 0;
    about.reviews.elements.forEach(review => {
        sumRating += review.grade;
    })

    if(about.overview !== ""){
        return(
            <section className="hotel__overview overview hotel__section section">
                <div className="container">
                    <h2 className="overview__title section__title">Overview</h2>
                    <div className="overview__info">{about.overview}</div>
                    {(about.advantages.length !== 0) &&
                    <div className="overview__items">
                        {about.reviews.elements.length !== 0 &&
                        <div className="overview__short-review short-review-overview">
                            <div className="short-review-overview__rating">
                                {sumRating / about.reviews.elements.length + ((Number.isInteger(sumRating / about.reviews.elements.length)) ? ".0" : "")}
                            </div>
                            <div className="short-review-overview__rating-text">Very Good</div>
                            <div className="short-review-overview__count-reviews">{about.reviews.elements.length + " reviews"}</div>
                        </div>}
                        {about.advantages.map((advantage, i) => 
                            <div className="overview__item item-overview icon-stars" key={i}>
                                <span>{advantage}</span>
                            </div>
                        )}
                    </div>}
                </div>
            </section>
        )
    }
    return <Fragment />
}