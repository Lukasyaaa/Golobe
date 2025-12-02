import React, { useState, type FC } from "react";
import type { HotelReview, useStateReturned } from "../../../../types";
import { useAppDispatch, useTypedSelector } from "../../../../store";
import { hotelsSlice } from "../../../../store/hotels";

interface AddReviewProps{
    isOpened: useStateReturned<boolean>,
    hotelId: number
}

export const AddReview: FC<AddReviewProps> = ({isOpened, hotelId}) => {
    let [, setIsOpened] = isOpened;

    let [choosedRating, setChoosedRating] = useState<number>(-1);
    let [hoveredRating, setHoveredRating] = useState<number>(-1);

    let [errorMessage, setErrorMessage] = useState<string>("");

    const currentUser = useTypedSelector(state => state.user);
    const hotelReviews = useTypedSelector(state => state.hotels.reviews);
    const dispatch = useAppDispatch();
    return(
        <div className="hotel-page__modal modal-hotel-page modal">
            <div className="modal-hotel-page__close-parent modal__close-parent">
                <button 
                    className="modal-hotel-page__close modal__close" type="button" 
                    onClick={() => setIsOpened(false)}
                />
            </div>
            <h2 className="modal-hotel-page__heading modal__heading">Add Review</h2>
            <div className="modal-hotel-page__field field">
                <label className="modal-hotel-page__subtexarea field__subinput" htmlFor="review-message">Review Message</label>
                <textarea 
                    className="modal-hotel-page__textarea field__input" id="review-message" 
                    placeholder="Review Message" value={errorMessage} 
                    onChange={(e) => setErrorMessage(e.currentTarget.value)}
                />
            </div>
            <div className="modal-hotel-page__stars stars-modal-hotel-page">
                <h3 className="stars-modal-hotel-page__title">Choose Rating</h3>
                <ul className="stars-modal-hotel-page__list">
                    {Array.from({length: 5}).map((_, i) => 
                        <li className="stars-modal-hotel-page__link" key={i}>
                            <button 
                                className="stars-modal-hotel-page__button" 
                                onClick={() => setChoosedRating(i + 1)} 
                                onMouseEnter={() => setHoveredRating(i)} onMouseLeave={() => setHoveredRating(-1)}
                                onFocus={() => setHoveredRating(i)} onBlur={i === 4 ? () => setHoveredRating(-1) : undefined}
                            >
                                <svg viewBox="0 0 22.5 21" width="22.5" height="21" fill="none">
                                    <path fill={i <= ((hoveredRating !== - 1) ? hoveredRating : choosedRating) ? "rgb(141, 211, 187)" : "rgb(17, 34, 17)"} fillRule="nonzero" d="m 17.716747,21.00073 c -0.1578,6e-4 -0.3119,-0.0486 -0.4401,-0.1406 l -6.0286,-4.3707 -6.0286101,4.3707 c -0.1288,0.0934 -0.28397,0.1434 -0.44307,0.1428 -0.15911,-5e-4 -0.31391,-0.0517 -0.44203,-0.1461 -0.12811,-0.0943 -0.2229,-0.227 -0.27066,-0.3787 -0.04776,-0.1518 -0.04602,-0.3148 0.00498,-0.4655 l 2.35125,-6.9643 -6.09374995,-4.1789 c -0.131997,-0.0904 -0.231619,-0.2206 -0.284313,-0.37171 -0.052694,-0.15106 -0.055697,-0.31502 -0.008572,-0.46792 0.047125,-0.15289 0.14191,-0.28671 0.270505,-0.3819 0.12859,-0.09519 0.28426,-0.14677 0.44425,-0.14719 H 8.2658469 L 10.534547,0.51868 c 0.0489,-0.15074 0.1443,-0.28212 0.2725,-0.37531 C 10.935147,0.05019 11.089547,0 11.248047,0 c 0.1584,0 0.3128,0.05019 0.441,0.14337 0.1282,0.09319 0.2235,0.22457 0.2724,0.37531 l 2.2688,6.98438 h 7.5178 c 0.1602,-8e-5 0.3162,0.05113 0.4452,0.14614 0.1289,0.09501 0.2241,0.22882 0.2715,0.38183 0.0475,0.15301 0.0446,0.31719 -0.008,0.46848 -0.0526,0.15132 -0.1523,0.28172 -0.2845,0.37232 l -6.0961,4.1765 2.3499,6.9624 c 0.038,0.1127 0.0487,0.2329 0.0312,0.3505 -0.0175,0.1177 -0.0628,0.2295 -0.1321,0.3263 -0.0693,0.0967 -0.1606,0.1755 -0.2664,0.23 -0.1058,0.0545 -0.223,0.083 -0.342,0.0832 z"/>
                                </svg>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
            <button 
                className="modal-hotel-page__confirm button_green" type="button"
                disabled={choosedRating === -1 || errorMessage === ""}
                onClick={() => {
                    const newReview: HotelReview = {
                        ava: currentUser.ava, author: currentUser.name,
                        review: errorMessage, grade: choosedRating, hotelId: Number(hotelId)
                    }
                    localStorage.setItem("hotelsReviews", JSON.stringify([...hotelReviews, newReview]));
                    dispatch(hotelsSlice.actions.addReview(newReview));
                    setIsOpened(false);
                }}
            >
                Confirm Changes
            </button>
        </div>
    )
}