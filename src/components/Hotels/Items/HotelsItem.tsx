import React, { FC, useRef, MouseEvent } from "react";
import { hotelsItem } from "../../../types";
import { useDispatch } from "react-redux";
import { hotelsItemsSwapItemActiveAction } from "../../../store/hotels/hotelsItemsReducer";

interface HotelsItemProps{
    about : hotelsItem,
    id : number
}

export const HotelsItem : FC<HotelsItemProps> = ({about, id}) =>{
    let amenitiesList = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const toggleSelect = (e : MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(hotelsItemsSwapItemActiveAction(id))
    }

    return(
        <article className="hotels-items__link link-hotels-items">
            <picture className="link-hotels-items__image">
                <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                <source srcSet={about.image.srcs.webp} type="img/webp" />
            </picture>
            <div className="link-hotels-items__info">
                <div className="link-hotels-items__header">
                    <h4 className="link-hotels-items__title">{about.title}</h4>
                    <div className="link-hotels-items__price">
                        <span className="link-hotels-items__price-supmain">{about.price.pre}</span>
                        <span className="link-hotels-items__price-main">{`$${about.price.main}`}<mark>/night</mark></span>
                        <span className="link-hotels-items__price-submain">{about.price.post}</span>
                    </div>
                </div>
                <div className="link-hotels-items__location _icon-location"><span>{about.location}</span></div>
                <div className="link-hotels-items__row">
                    <div className="link-hotels-items__stars">
                        <div className="link-hotels-items__stars-container">                    
                            {Array.from({ length: about.stars.count }, (_, index) => (
                                <span className="link-hotels-items__star _icon-star" key={index}></span>
                            ))}
                        </div>
                        <span className="link-hotels-items__substars">{`${about.stars.count} ${about.stars.post}`}</span>
                    </div>
                    <div className="link-hotels-items__amenities amenities-link-hotels-items">
                        <button 
                            className="amenities-link-hotels-items__opener _icon-tea" 
                            type="button" onClick={toggleSelect}
                        >
                            <span><strong>{about.amenities.items.length}</strong> Amenities</span>
                        </button>
                        <div className="amenities-link-hotels-items__list" style={{
                            height: ((amenitiesList.current && about.amenities.isActive) ? amenitiesList.current.offsetHeight : 0)
                        }}>
                            <ul className="amenities-link-hotels-items__list-inner" ref={amenitiesList}>
                                {about.amenities.items.map((amenitiesText, i) => 
                                    <li className="amenities-link-hotels-items__link" key={i}>{amenitiesText}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="link-hotels-items__assessment-block">
                    <div className="link-hotels-items__rating">{about.review.rating}</div>
                    <div className="link-hotels-items__rating-text">{about.review.ratingText}</div>
                    <div className="link-hotels-items__count-reviews">{about.review.countReviews} reviews</div>
                </div>
                <div className="link-hotels-items__footer">
                    <div className="link-hotels-items__footer-inner">
                        <button 
                            className="link-hotels-items__favourites _icon-favourites_transparent" 
                            type="button" onClick={(e) => e.stopPropagation()}
                        ></button>
                        <a href="#" className="link-hotels-items__button" onClick={(e) => e.stopPropagation()}>{about.buttonText}</a>
                    </div>
                </div>
            </div>
        </article>
    )
}