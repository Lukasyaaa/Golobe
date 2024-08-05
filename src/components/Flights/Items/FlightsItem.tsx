import React, { FC } from "react";
import { flightsItem } from "../../../types";
import { FlightsItemSchedule } from "./FlightsItemSchedule";

interface FlightsItemProps{
    about : flightsItem
}

export const FlightsItem : FC<FlightsItemProps> = ({about}) =>{
    let classes : string[] = [
        "flights-items__link", 
        "link-flights-items",
        (about.images.length > 1) ? "many-image" : ((about.images.length === 1) ? "one-image" : "no-image")
    ];

    return(
        <article className={classes.join(" ")}>
            {(about.images.length > 1) ?
            <div className="link-flights-items__images">
                {about.images.map((image, i) =>             
                <picture key={i} className="link-flights-items__image">
                    <img className="popa" src={image.srcs.jpeg} alt={image.alt} />
                    <source srcSet={image.srcs.webp} type="image/webp" />
                </picture>)}
            </div> : 
            (about.images.length === 1 &&
            <picture className="link-flights-items__image">
                <img className="popa" src={about.images[0].srcs.jpeg} alt={about.images[0].alt} />
                <source srcSet={about.images[0].srcs.webp} type="image/webp" />
            </picture>)}
            <div className="link-flights-items__info">
                <div className="link-flights-items__header">
                    <div className="link-flights-items__assessment-block">
                        <div className="link-flights-items__rating">{about.review.rating}</div>
                        <div className="link-flights-items__rating-text">{about.review.ratingText}</div>
                        <div className="link-flights-items__count-reviews">{`${about.review.countReviews} reviews`}</div>
                    </div>
                    <div className="link-flights-items__price">{about.price.sub}<mark>${about.price.main}</mark></div>
                </div>
                <div className="link-flights-items__schedule">
                    {about.schedule.map((itemSchedule, i) => <FlightsItemSchedule 
                        key={i} 
                        about={itemSchedule} 
                        isLast={i === about.schedule.length - 1} 
                    />)}
                </div>
                <div className="link-flights-items__footer">
                    <div className="link-flights-items__footer-inner">
                        <button 
                            className="link-flights-items__favourites _icon-favourites_transparent" 
                            type="button" onClick={(e) => e.stopPropagation()}
                        ></button>
                        <a href="#" className="link-flights-items__button" onClick={(e) => e.stopPropagation()}>{about.buttonText}</a>
                    </div>
                </div>
            </div>
        </article>
    )
}