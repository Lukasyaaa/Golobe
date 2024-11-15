import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { hotel } from "../../../../types";
import { HotelReview } from "./HotelReview";

interface hotelReviewsProps{
    about : hotel
}

export const HotelReviews : FC<hotelReviewsProps> = ({about}) => {
    let [reviewPage, setReviewPage] = useState<number>(0);
    
    let items = useRef<HTMLDivElement>(null);
    let hiddenPrevItems = useRef<HTMLDivElement>(null);
    let hiddenNextItems = useRef<HTMLDivElement>(null);
    let [height, setHeight] = useState<number>(0);
    useEffect(() => {
        if(items.current){
            setHeight(items.current.offsetHeight);
        }
    }, [])

    const prevPage = () => {
        if(hiddenPrevItems.current){
            setReviewPage(prev => prev - 1);
            setHeight(hiddenPrevItems.current.offsetHeight);
        }
    }
    const nextPage = () => {
        if(hiddenNextItems.current){
            setReviewPage(prev => prev + 1);
            setHeight(hiddenNextItems.current.offsetHeight);
        }
    }

    let isFirst = useRef<boolean>(true);
    if(about.reviews.elements.length !== 0){
        let sumRating = 0;
        about.reviews.elements.forEach(review => {
            sumRating += review.grade;
        })

        let hiddenPagesClasses = ["reviews-hotel__page_hidden"];
        if(isFirst.current){
            hiddenPagesClasses.push("_hidden");
            isFirst.current = false;
        }

        return(
            <section className="hotel__reviews reviews-hotel hotel__section section">
                <div className="container">
                    <div className="reviews-hotel__header section__header">
                        <h2 className="reviews-hotel__title section__title">Reviews</h2>
                        <a href="#" className="reviews-hotel__link section__link">Give Your Review</a>
                    </div>
                    <div className="reviews-hotel__grade">
                        <div className="reviews-hotel__rating">
                            {sumRating / about.reviews.elements.length + ((Number.isInteger(sumRating / about.reviews.elements.length)) ? ".0" : "")}
                        </div>
                        <div className="reviews-hotel__subrating">
                            <div className="reviews-hotel__rating-text">Very Good</div>
                            <div className="reviews-hotel__count">{about.reviews.elements.length + " verified reviews"}</div>
                        </div>
                    </div>
                    <div className="reviews-hotel__pages" style={{height: height}}>
                        {reviewPage !== 0 &&
                            <div className={hiddenPagesClasses.join(" ")} ref={hiddenPrevItems}>
                                {about.reviews.elements.slice(
                                    (reviewPage - 1) * about.reviews.maxShow, 
                                    Math.min(reviewPage * about.reviews.maxShow, about.reviews.elements.length)
                                ).map((review, i) => 
                                    <HotelReview about={review} key={i}/>
                                )}
                            </div>
                        }
                        <div className="reviews-hotel__page" ref={items}>
                            {about.reviews.elements.slice(
                                reviewPage * about.reviews.maxShow, 
                                Math.min((reviewPage + 1) * about.reviews.maxShow, about.reviews.elements.length)
                            ).map((review, i) => 
                                <HotelReview about={review} key={i}/>
                            )}
                        </div>
                        {reviewPage !== Math.ceil(about.reviews.elements.length / about.reviews.maxShow) &&
                            <div className={hiddenPagesClasses.join(" ")} ref={hiddenNextItems}>
                                {about.reviews.elements.slice(
                                    (reviewPage + 1) * about.reviews.maxShow, 
                                    Math.min((reviewPage + 2) * about.reviews.maxShow, about.reviews.elements.length)
                                ).map((review, i) => 
                                    <HotelReview about={review} key={i} />
                                )}
                            </div>
                        }
                    </div>
                    {about.reviews.elements.length > about.reviews.maxShow &&
                    <div className="reviews-hotel__interaction">
                        <button 
                            className="reviews-hotel__arrow reviews-hotel__arrow_left icon-arrow_bottom" type="button" 
                            disabled={reviewPage === 0}
                            onClick={(reviewPage !== 0) ? () => prevPage() : undefined}
                        ></button>
                        <output className="reviews-hotel__pagination">
                            {(reviewPage + 1) + " of " + (Math.ceil(about.reviews.elements.length / about.reviews.maxShow))}
                        </output>
                        <button 
                            className="reviews-hotel__arrow reviews-hotel__arrow_right icon-arrow_bottom" type="button" 
                            disabled={reviewPage === (Math.floor(about.reviews.elements.length / about.reviews.maxShow))}
                            onClick={(reviewPage !== (Math.floor(about.reviews.elements.length / about.reviews.maxShow))) 
                                ? () => nextPage()
                                : undefined
                            }
                        ></button>
                    </div>}
                </div>
            </section>
        )
    }
    return <Fragment />
}