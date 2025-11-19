import React, { type FC } from "react";
import { getGrade, getRating, type ShortReview as ShortReviewType } from "../../../types";

interface ShortReviewProps{
    about: ShortReviewType,
    parentCls: string[]
}

export const ShortReview : FC<ShortReviewProps> = ({about, parentCls}) => {
    return(
        <div className={`${parentCls.map(cl => cl + "__short-review").join(" ")} ${parentCls.map(cl => "short-review-" + cl).join(" ")} short-review`}>
            <div className={`${parentCls.map(cl => "short-review-" + cl + "__rating").join(" ")} short-review__rating`}>
                {getRating(about.rating)}
            </div>
            <div className={`${parentCls.map(cl => "short-review-" + cl + "__review").join(" ")} short-review__review`}>
                <strong>{getGrade(about.rating)}</strong> {about.countReviews + " reviews"}
            </div>
        </div>
    )
}