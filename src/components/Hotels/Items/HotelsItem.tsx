import React, { FC } from "react";
import { contentPart, hotel } from "../../../types";
import { ShortReview } from "../../Common/ShortReview";
import { NavLink } from "react-router-dom";
import { hotelsConfiguretePath } from "../../../App";
import { useDispatch } from "react-redux";
import { userAddFavouriteAction, userDeleteFavouriteAction } from "../../../store/userReducer";

interface hotelsItemProps{
    about : hotel,
    buttonLink : string,
    minPrice : number,
    isFavourite : boolean,
    isAuthorized : boolean
}

export const HotelsItem : FC<hotelsItemProps> = ({about, buttonLink, minPrice, isFavourite, isAuthorized}) => {
    const dispatch = useDispatch();

    const addFavourite = () => {
        dispatch(userAddFavouriteAction(contentPart.Hotels, about.id));
    }
    const deleteFavourite = () => {
        dispatch(userDeleteFavouriteAction(contentPart.Hotels, about.id))
    }

    let avarageRating = 0;
    about.reviews.elements.forEach(review => {
        avarageRating += review.grade;
    })

    return(
        <article className="hotels__item content__item item-hotels item-content">
            {(about.images.another.length > 0) ?
            <figure className="item-hotels__image-block">
                <picture className="item-hotels__image">
                    <img src={about.images.main.srcs.jpeg} alt={about.images.main.alt} />
                    <source srcSet={about.images.main.srcs.webp} type="img/webp" />
                </picture>
                <figcaption className="item-hotels__subimage">{about.images.another.length + " images"}</figcaption>
            </figure>
            :
            <picture className="item-hotels__image loner">
                <img src={about.images.main.srcs.jpeg} alt={about.images.main.alt} />
                <source srcSet={about.images.main.srcs.webp} type="img/webp" />
            </picture>}
            <div className="item-hotels__info">
                <div className="item-hotels__row">
                    <div className="item-hotels__left">
                        <h3 className="item-hotels__title">{about.title}</h3>
                        <div className="item-hotels__location icon-location"><span>{about.location.full}</span></div>
                        <div className="item-hotels__status">
                            <div className="item-hotels__stars">
                                <div className="item-hotels__stars-container">
                                    {Array.from({length: 5}).map((_, i) => {
                                        if(i < about.countStars){
                                            return <span className="item-hotels__star filled icon-star" key={i}></span>
                                        }
                                        return <span className="item-hotels__star icon-star" key={i}></span>
                                    })}
                                </div>
                                <span className="item-hotels__substars">{about.countStars + " Star Hotel"}</span>
                            </div>
                            <div className="item-hotels__amenities icon-cup">
                                <span>
                                    <strong>
                                        {(about.includes.elements.length > 10 && about.includes.elements.length % 10 !== 0) 
                                            ? "+" + Math.floor(about.includes.elements.length / 10) + "0 " 
                                            : Math.floor(about.includes.elements.length) + " "
                                        }
                                    </strong> 
                                    Amenities
                                </span>
                            </div>
                        </div>
                        {about.reviews.elements.length !== 0 &&
                            <ShortReview 
                                parentClasses={["item-hotels"]} 
                                about={{
                                    rating: avarageRating / about.reviews.elements.length, 
                                    countReviews: about.reviews.elements.length
                                }} 
                            />
                        }
                    </div>
                    <div className="item-hotels__right">
                        <span>starting from</span><mark>{"$" + minPrice + "/night"}</mark><span>excl.tax</span>
                    </div>
                </div>
                <div className="item-hotels__footer item-content__footer">
                    {(isAuthorized) 
                        ? ((!isFavourite) 
                            ? <button 
                                className="item-hotels__favourites item-content__favourites icon-heart_border" 
                                type="button" onClick={addFavourite}
                            >   
                            </button>
                            : <button 
                                className="item-hotels__favourites item-content__favourites icon-heart _choosed" 
                                type="button" onClick={deleteFavourite}
                            >   
                            </button>
                        )
                        : <div 
                            className="item-hotels__favourites item-content__favourites icon-heart_border _disabled" 
                        >
                        </div>
                    }
                    <NavLink 
                        className="item-hotels__view-more item-content__view-more" 
                        to={hotelsConfiguretePath + "/" + (about.id + 1)}
                    >
                        {buttonLink}
                    </NavLink>
                </div>
            </div>
        </article>
    )
}