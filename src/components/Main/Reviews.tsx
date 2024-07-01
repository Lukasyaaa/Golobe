import React, { ForwardRefRenderFunction, forwardRef } from "react";
import { BlockHeader } from "../Common/BlockHeader";
import { useTypedSelector } from "../../hooks/redux";
import { Review } from "./Review";
 
interface ReviewsProps{

}

const Reviews : ForwardRefRenderFunction<HTMLDivElement, ReviewsProps> = (props, ref) =>{
    const reviews = useTypedSelector(store => store.reviews);
    return(
        <section className="reviews">
            <BlockHeader parent="reviews" text={reviews.header} />
            <div className="reviews__items" ref={ref}>
                {reviews.items.map((review, index) => <Review 
                    key={index} 
                    id={index}
                    text={review.text}
                    image={review.image}
                    hotelLink={review.hotelLink}
                    isActive={review.isActive} 
                />)}
            </div>
        </section>
    )
}

export default forwardRef<HTMLDivElement, ReviewsProps>(Reviews);