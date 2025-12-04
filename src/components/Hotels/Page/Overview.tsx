import { type FC } from "react";
import { getGrade, getRating, type ShortReview } from "../../../types";

interface OverviewProps{
    main: string,
    shortReview: ShortReview,
    features: string[]
}

export const Overview : FC<OverviewProps> = ({main, shortReview, features}) => {
    return(
        <section className="hotel-page__overview hotel-page__section section-hotel-page overview">
            <div className="container">
                <h2 className="section-hotel-page__heading overview__heading">Overview</h2>
                <div className="overview__info">{main}</div>
                <ul className="overview__features">
                    <li className="overview__short-review short-review-overview overview__feature">
                        <div className="short-review-overview__rating">{getRating(shortReview.rating)}</div>
                        <div className="short-review-overview__assessment">{getGrade(shortReview.rating)}</div>
                        <div className="short-review-overview__count-reviews">
                            {shortReview.countReviews + " reviews"}
                        </div>
                    </li>
                    {features.map((feature, i) => 
                        <li className="overview__feature" key={i}><span>{feature}</span></li>
                    )}
                </ul>
            </div>
        </section>
    )
}