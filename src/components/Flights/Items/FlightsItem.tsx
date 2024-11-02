import React, { FC } from "react";
import { flight } from "../../../types";
import { ShortReview } from "../../Common/ShortReview";
import { FlightsScheduleItem } from "./FlightsScheduleItem";

interface flightsItemProps{
    about : flight,
    buttonLink : string
}

export const FlightsItem : FC<flightsItemProps> = ({about, buttonLink}) => {
    return(
        <article className="flights__item content__item item-flights item-content">
            {(about.images.length === 1) ? 
            <picture className="item-flights__image">
                <img src={about.images[0].srcs.jpeg} alt={about.images[0].alt} />
                <source srcSet={about.images[0].srcs.webp} type="img/webp" />
            </picture>
            :
            <div className="item-flights__images">
                {about.images.map((airline, i) => 
                    <picture className="item-flights__image" key={i}>
                        <img src={airline.srcs.jpeg} alt={airline.alt} />
                        <source srcSet={airline.srcs.webp} type="img/webp" />
                    </picture>
                )}    
            </div>}
            <div className="item-flights__info">
                <div className="item-flights__header">
                    <ShortReview parentClasses={["item-flights"]} about={about.shortReview} />
                    <div className="item-flights__price">starting from<strong>{`$${about.price}`}</strong></div>
                </div>
                <div className="item-flights__schedule">
                    <FlightsScheduleItem about={about.schedule.depart} isDeparture={true} />
                    <FlightsScheduleItem about={about.schedule.return} isDeparture={false} />
                </div>
                <div className="item-flights__footer item-content__footer">
                    <button className="item-flights__favourites item-content__favourites icon-heart_border" type="button"></button>
                    <button className="item-flights__view-more item-content__view-more" type="button">{buttonLink}</button>
                </div>
            </div>
        </article>
    )
}