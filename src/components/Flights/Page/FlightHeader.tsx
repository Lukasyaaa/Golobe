import React, { FC } from "react";
import { SharedHeader } from "../../Common/SharedHeader";
import { contentPart, flightDirection, flightSchedule, flightSchedulePart, shortReview } from "../../../types";

interface flightHeaderDoubleProps{
    flightDirection : flightDirection.Two,
    schedule : flightSchedule,
    shortReview : shortReview
}

interface flightHeaderSingleProps{
    flightDirection : flightDirection.Return | flightDirection.Depart
    schedulePart : flightSchedulePart,
    shortReview : shortReview
}

export const FlightHeader : FC<flightHeaderDoubleProps | flightHeaderSingleProps> = (props) => {
    if(props.flightDirection === flightDirection.Two){
        return(
            <section className="flight__header header-flight header-shared two">
                <div className="container">
                    <SharedHeader 
                        contentType={contentPart.Flights} flightDirection={flightDirection.Two} 
                        schedule={props.schedule} shortReview={props.shortReview} isCheck={false}
                    />
                    <div className="header-flight__images">
                        <picture className="header-flight__image header-flight_depart__image">
                            <img src={props.schedule.depart.image.srcs.jpeg} alt={props.schedule.depart.image.alt} />
                            <source srcSet={props.schedule.depart.image.srcs.webp} type="img/webp" />
                        </picture>
                        <picture className="header-flight__image header-flight_return__image">
                            <img src={props.schedule.return.image.srcs.jpeg} alt={props.schedule.return.image.alt} />
                            <source srcSet={props.schedule.return.image.srcs.webp} type="img/webp" />
                        </picture>
                        <div className="header-flight__subimage header-flight_depart__subimage">Depart</div>
                        <div className="header-flight__subimage header-flight_return__subimage">Return</div>
                    </div>
                </div>
            </section>
        )
    }
    return(
        <section className={
            `flight__header flight_${props.flightDirection}__header header-flight header-flight_${flightDirection} header-shared`
        }>
            <div className="container">
                <SharedHeader 
                    contentType={contentPart.Flights} flightDirection={props.flightDirection} 
                    schedulePart={props.schedulePart} shortReview={props.shortReview} isCheck={false}
                />
                <picture className={"header-flight__image " + "header_" + props.flightDirection.toLowerCase() + "-flight__image"}>
                    <img src={props.schedulePart.image.srcs.jpeg} alt={props.schedulePart.image.alt} />
                    <source srcSet={props.schedulePart.image.srcs.webp} type="img/webp" />
                </picture>
            </div>
        </section>
    )
}