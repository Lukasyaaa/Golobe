import React, { FC, useState } from "react";
import { flight, flightDirection } from "../../../types";
import { ShortReview } from "../../Common/ShortReview";
import { FlightsScheduleItem } from "./FlightsScheduleItem";
import { flightsConfiguratePath } from "../../../App";
import { NavLink } from "react-router-dom";

interface flightsItemProps{
    about : flight,
    buttonLink : string
}

export const FlightsItem : FC<flightsItemProps> = ({about, buttonLink}) => {
    let [isDepartChoosed, setIsDepartChoosed] = useState<boolean>(about.schedule.depart.isChoosed);
    let [isReturnChoosed, setIsReturnChoosed] = useState<boolean>(about.schedule.return.isChoosed);
    
    let choosedFlight = "";
    if(isDepartChoosed){
        if(isReturnChoosed){
            choosedFlight = flightDirection.Depart + "+" + flightDirection.Return;
        }else{
            choosedFlight = flightDirection.Depart;
        }
    }else if(isReturnChoosed){
        choosedFlight = flightDirection.Return;
    }

    return(
        <article className="flights__item content__item item-flights item-content">
            {(about.schedule.depart.airline.alt === about.schedule.return.airline.alt) 
            ? <picture className="item-flights__image">
                <img src={about.schedule.depart.airline.srcs.jpeg} alt={about.schedule.depart.airline.alt} />
                <source srcSet={about.schedule.depart.airline.srcs.webp} type="img/webp" />
            </picture>
            : <div className="item-flights__images">
                {Array.from([about.schedule.depart.airline, about.schedule.return.airline]).map((airline, i) => 
                    <picture className="item-flights__image" key={i}>
                        <img src={airline.srcs.jpeg} alt={airline.alt} />
                        <source srcSet={airline.srcs.webp} type="img/webp" />
                    </picture>
                )}    
            </div>}
            <div className="item-flights__info">
                <div className="item-flights__header">
                    <ShortReview parentClasses={["item-flights"]} about={about.shortReview} />
                    <div className="item-flights__price">
                        starting from
                        <strong>
                            {`$${Math.min(
                                about.schedule.depart.price.baseFare + about.schedule.depart.price.serviceFee + 
                                about.schedule.depart.price.taxes - about.schedule.depart.price.discount, 
                                about.schedule.return.price.baseFare + about.schedule.return.price.serviceFee + 
                                about.schedule.return.price.taxes - about.schedule.return.price.discount
                            )}`}
                        </strong>
                    </div>
                </div>
                <div className="item-flights__schedule">
                    <FlightsScheduleItem 
                        about={about.schedule.depart} isDeparture={true} isActive={{value: isDepartChoosed, set: setIsDepartChoosed}} 
                    />
                    <FlightsScheduleItem 
                        about={about.schedule.return} isDeparture={false} isActive={{value: isReturnChoosed, set: setIsReturnChoosed}} 
                    />
                </div>
                <div className="item-flights__footer item-content__footer">
                    <button className="item-flights__favourites item-content__favourites icon-heart_border" type="button"></button>
                    {(choosedFlight === "") 
                    ? <div className="item-flights__view-more item-content__view-more _disabled">
                        {buttonLink}
                    </div>
                    : <NavLink 
                        className="item-flights__view-more item-content__view-more" 
                        to={flightsConfiguratePath + "/" + (about.id + 1) + "/" + choosedFlight} type="button"
                    >
                        {buttonLink}
                    </NavLink>}
                </div>
            </div>
        </article>
    )
}