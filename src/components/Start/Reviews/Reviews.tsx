import React, { FC, Fragment, useState } from "react";
import { HeaderBlock } from "../../Common/HeaderBlock";
import { useTypedSelector } from "../../../useTypedSelector";
import { Review } from "./Review";
import { reviewItem } from "../../../types";

export const Reviews : FC = () => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const state = useTypedSelector(store => store.start.reviews);

    let isWebp = true;
    let filtredReviews : reviewItem[] = [];
    state.items.forEach(review => {
        if(review.title !== "" && review.info !== "" && review.hotel.company !== "" && review.hotel.location !== "" && review.author !== ""
        && (review.image.srcs.jpeg !== "" || (isWebp && review.image.srcs.webp !== ""))){
            filtredReviews.push(review);
        }
    });
    if(filtredReviews.length !== 0){
        return(
            <section className="start__reviews reviews">
                <div className="container">
                    <HeaderBlock 
                        about={state.header} isNeedButton={state.items.length > state.maxShow} parentClasses={["reviews"]} 
                        isShowAll={{value: isShowAll, set: setIsShowAll}}
                    />
                </div>
                <div className="reviews__items">
                    {((isShowAll) ? filtredReviews : filtredReviews.slice(0, state.maxShow)).map((review, i) => 
                        <Review about={review} linkToLocation={state.linkToLocation} viewAll={state.buttonViewAll} key={i} />
                    )}
                </div>
            </section>
        )
    }
    return <Fragment />
}