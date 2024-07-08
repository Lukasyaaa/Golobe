import React, { ForwardRefRenderFunction, forwardRef } from "react";
import { BlockHeader } from "../Common/BlockHeader";
import { useTypedSelector } from "../../hooks/redux";
import { Review } from "./Review";
 
interface ReviewsProps{

}

const Reviews : ForwardRefRenderFunction<HTMLDivElement, ReviewsProps> = (props, ref) =>{
    const reviewsStore = useTypedSelector(store => store.reviews);
    return(
        <section className="reviews">
            <BlockHeader parent="reviews" text={reviewsStore.header} />
            <div className="reviews__items" ref={ref}>
                {reviewsStore.items.map((review, index) => <Review key={index} id={index} about={review}/>)}
            </div>
        </section>
    )
}

export default forwardRef<HTMLDivElement, ReviewsProps>(Reviews);