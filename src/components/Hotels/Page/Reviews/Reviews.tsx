import { useEffect, useRef, useState, type FC } from "react";
import { getGrade, getRating, type HotelReview, type ShortReview, type useStateReturned } from "../../../../types";
import { Review } from "./Review";
import { useTypedSelector } from "../../../../store";

interface ReviewsProps{
    reviews: HotelReview[],
    shortReview: ShortReview,
    isOpened: useStateReturned<boolean>,
}

export const Reviews : FC<ReviewsProps> = ({reviews, shortReview, isOpened}) => {
    const maxShow = 10;
    let [currentPage, setCurrentPage] = useState<number>(0);
    let user = useTypedSelector(state => state.user);

    let container = useRef<HTMLDivElement>(null);
    let inner = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const containerHTML = container.current;
        const innerHTML = inner.current;
        if(containerHTML && innerHTML){
            containerHTML.style.height = innerHTML.offsetHeight + "px";
        }
    }, [currentPage]);

    let [, setIsOpened] = isOpened;

    return(
        <section className="hotel-page__reviews hotel-page__section section-hotel-page reviews-hotel">
            <div className="container">
                <div className="section-hotel-page__header reviews-hotel__header">
                    <h2 className="section-hotel-page__heading reviews-hotel__heading">Reviews</h2>
                    <button 
                        className="section-hotel-page__button reviews-hotel__button button_green" type="button"
                        disabled={user.name.firstName === ""} onClick={() => setIsOpened(true)}
                    >
                        Give your review
                    </button>
                </div>
                <div className="reviews-hotel__grade grade-reviews-hotel">
                    <div className="grade-reviews-hotel__rating">{getRating(shortReview.rating)}</div>
                    <div className="grade-reviews-hotel__left">
                        <div className="grade-reviews-hotel__assessment">{getGrade(shortReview.rating)}</div>
                        <div className="grade-reviews-hotel__count-reviews">{shortReview.countReviews + " verified reviews"}</div>
                    </div>
                </div>
                <div className="reviews-hotel__items" ref={container}>
                    <div className="reviews-hotel__items-inner" ref={inner}>
                        {reviews.slice(
                            currentPage * maxShow, Math.min((currentPage + 1) * maxShow, reviews.length)
                        ).map((review, i) => <Review {...review} key={i}/>)}
                    </div>
                </div>
                {reviews.length > maxShow && <div className="reviews-hotel__pagination">
                    <button 
                        className="reviews-hotel__arrow prev" type="button" 
                        disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        <svg className="reviews-hotel__arrow-icon" viewBox="0 0 15 8.25" width="15" height="8.25" fill="none">
                            <path
                                fillRule="nonzero" stroke="#000000" strokeWidth="1.5" d="M 0.75,0.75 7.5,7.5 14.25,0.75"
                                strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="reviews-hotel__current">{(currentPage + 1) + " of " + Math.ceil(reviews.length / maxShow)}</div>
                    <button 
                        className="reviews-hotel__arrow next" type="button" 
                        disabled={currentPage === Math.ceil(reviews.length / maxShow) - 1} 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        <svg className="reviews-hotel__arrow-icon" viewBox="0 0 15 8.25" width="15" height="8.25" fill="none">
                            <path
                                d="M 0.75,0.75 7.5,7.5 14.25,0.75"
                                fillRule="nonzero" stroke="#000000" strokeWidth="1.5" 
                                strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>}
            </div>
        </section>
    )
}