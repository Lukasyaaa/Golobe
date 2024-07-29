import React, { FC } from "react";
import { BlockHeader } from "../Common/BlockHeader";
import { useTypedSelector } from "../../hooks/redux";
import { Review } from "./Review";
 
interface ReviewsProps{

}

export const Reviews : FC<ReviewsProps> = () =>{
    const reviewsStore = useTypedSelector(store => store.reviews);
    return(
        <section className="reviews">
            <BlockHeader parent="reviews" about={reviewsStore.header} />
            <div className="reviews__items">
                {reviewsStore.items.map((review, i) => <Review key={i} id={i} about={review}/>)}
            </div>
        </section>
    )
}