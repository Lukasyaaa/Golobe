import React, { FC } from "react";
import { shortReview } from "../../types";

interface shortReviewProps{
    parentClasses : string[],
    about : shortReview
}

export const ShortReview : FC<shortReviewProps> = ({parentClasses, about}) => {
    return(
        <div className={
            parentClasses.map(cl => cl + "__short-review").join(" ") + " " + parentClasses.map(cl => "short-review-" + cl) + " short-review"
        }>
            <div 
                className={
                    parentClasses.map(cl => "short-review-" + cl + "__rating") + " short-review__rating"
                }
            >
                {about.rating + ((Number.isInteger(about.rating)) ? ".0" : "")}
            </div>
            <div 
                className={
                    parentClasses.map(cl => "short-review-" + cl + "__count-reviews") + " short-review__count-reviews"
                }
            >
                <strong>Very Good</strong> {about.countReviews} reviews
            </div>
        </div>
    )
}