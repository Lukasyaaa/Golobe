import React, { FC, Fragment, useRef, useState } from "react";
import { HeaderBlock } from "../../Common/HeaderBlock";
import { useTypedSelector } from "../../../useTypedSelector";
import { Review } from "./Review";
import { reviewItem } from "../../../types";

export const Reviews : FC = () => {
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const state = useTypedSelector(store => store.start.reviews);

    let filtredReviews = useRef<reviewItem[]>([]);
    if(state.buttonViewAll !== ""){
        let isWebp = true;
        if(filtredReviews.current.length === 0){
            state.items.forEach(review => {
                if(review.title !== "" && review.info !== "" && review.hotel.company !== "" && review.hotel.location !== "" 
                && review.hotel.linkToLocation !== "" && review.author !== "" 
                && (review.image.srcs.jpeg !== "" || (isWebp && review.image.srcs.webp !== ""))){
                    filtredReviews.current.push(review);
                }
            });
        }

        if(filtredReviews.current.length !== 0){
            return(
                <section className="start__reviews reviews">
                    <div className="container">
                        <HeaderBlock 
                            about={state.header} classes={["reviews"]}  isNeedButton={filtredReviews.current.length > state.maxShow}
                            isShowAll={{value: isShowAll, set: setIsShowAll}}
                        />
                    </div>
                    <div className="reviews__items">
                        {((isShowAll) ? filtredReviews.current : filtredReviews.current.slice(0, state.maxShow)).map((review, i) => 
                            <Review about={review} linkToLocation={state.linkToLocation} viewAll={state.buttonViewAll} key={i} />
                        )}
                    </div>
                </section>
            )
        }
    }
    return <Fragment />
}