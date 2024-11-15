import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { contentPart, flight, flightDirection, flightSchedule, flightSchedulePart, hotel, shortReview } from "../../types";
import { BreadCrumbs } from "./Breadcrumbs";
import { ShortReview } from "./ShortReview";

interface sharedHeaderFligthSingleProps{
    schedulePart : flightSchedulePart,
    shortReview : shortReview,
    contentType : contentPart.Flights,
    flightDirection : flightDirection.Depart | flightDirection.Return,
    isCheck : boolean
}

interface sharedHeaderFligthDoubleProps{
    schedule : flightSchedule,
    shortReview : shortReview,
    contentType : contentPart.Flights,
    flightDirection : flightDirection.Two,
    isCheck : false
}

interface sharedHeaderHotelProps{
    about : hotel,
    isCheck : boolean,
    contentType : contentPart.Hotels
    buttonImagesMore : string,
}

export const SharedHeader : FC<
    sharedHeaderFligthSingleProps | sharedHeaderFligthDoubleProps | sharedHeaderHotelProps
> = (props) => {
    if(props.contentType === contentPart.Flights){
        if(props.flightDirection === flightDirection.Two){
            let departPrice = 
                props.schedule.depart.price.baseFare + props.schedule.depart.price.taxes + 
                props.schedule.depart.price.serviceFee - props.schedule.depart.price.discount
            ;
            let returnPrice =             
                props.schedule.return.price.baseFare + props.schedule.return.price.taxes + 
                props.schedule.return.price.serviceFee - props.schedule.return.price.discount
            ;
            return(
                <Fragment>
                    <div className="header-flight__breadcrumbs-container">
                        <BreadCrumbs 
                            parentClasses={["header-flight", "header-flight_depart", "header-shared"]} 
                            links={[
                                {description: "Turkey", path: "#"}, 
                                {description: props.schedule.depart.arrayPlace.city, path: "#"}
                            ]} 
                            current={props.schedule.depart.arrayPlace.airport} isNoneColor={false}
                        />
                        <BreadCrumbs 
                            parentClasses={["header-flight", "header-flight_return", "header-shared"]} 
                            links={[
                                {description: "Turkey", path: "#"}, 
                                {description: props.schedule.return.arrayPlace.city, path: "#"}
                            ]} 
                            current={props.schedule.return.arrayPlace.airport} isNoneColor={false}
                        />
                    </div>
                    <div className="header-flight__row header-shared__row">
                        <div className="header-flight__left header-shared__left">
                            <h1 className="header-flight__title header-shared__title">
                                {
                                    "Depart on " + props.schedule.depart.airline.alt + " " + props.schedule.depart.airplane + 
                                    ", and Come Back on " + props.schedule.return.airline.alt + " " + 
                                    props.schedule.return.airplane
                                }
                            </h1>
                            <ul className="header-flight__locations">
                                <li className="header-flight__location header-flight_depart__location">
                                    Depart
                                    <div className="header-flight__location-inner header-flight_depart__location-inner header-shared__location icon-location">
                                        <span>{props.schedule.depart.arrayPlace.full}</span>
                                    </div>
                                </li>
                                <li className="header-flight__location header-flight_return__location">
                                    Return
                                    <div className="header-flight__location-inner header-flight_return__location-inner header-shared__location icon-location">
                                        <span>{props.schedule.return.arrayPlace.full}</span>
                                    </div>
                                </li>
                            </ul>
                            <ShortReview parentClasses={["header-flight", "header-shared"]} about={props.shortReview} />
                        </div>
                        <div className="header-flight__right header-shared__right">
                            <div className="header-flight__price header-shared__price">
                                {"$" + departPrice + ", $" + returnPrice}
                            </div>
                            <div className="header-flight__interaction header-shared__interaction">
                                <button 
                                    className="header-flight__favourites header-shared__favourites icon-heart_border" 
                                    type="button"
                                >
                                </button>
                                <button className="header-flight__share header-shared__share icon-share" type="button">
                                </button>
                                <button className="header-flight__book header-shared__book" type="button">Book Now</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    
        let price = 
            props.schedulePart.price.baseFare + props.schedulePart.price.taxes + props.schedulePart.price.serviceFee - 
            props.schedulePart.price.discount
        ;

        if(props.isCheck){
            return(
                <Fragment>
                    <BreadCrumbs 
                        parentClasses={[
                            "header-check", `header-check_${props.flightDirection.toLowerCase()}`, "header-shared"
                        ]} 
                        links={[
                            {description: "Turkey", path: "#"}, {description: props.schedulePart.arrayPlace.city, path: "#"}
                        ]} 
                        current={props.schedulePart.arrayPlace.airport} isNoneColor={props.isCheck}
                    />
                    <div className={
                        "header-check__row header-check_" + props.flightDirection.toLowerCase() + "__row header-shared__row"
                    }>
                        <div className={
                            "header-check__left header-check_" +
                            props.flightDirection.toLowerCase() + "__left header-shared__left"
                        }>
                            <h1 className={
                                "header-check__title header-check_" +
                                props.flightDirection.toLowerCase() + "__title header-shared__title"
                            }>
                                {props.schedulePart.airline.alt + " " + props.schedulePart.airplane}
                            </h1>
                            <div className={
                                "header-check__location header-check_" +
                                props.flightDirection.toLowerCase() + "__location header-shared__location icon-location"
                            }>
                                <span>{props.schedulePart.arrayPlace.full}</span>
                            </div>
                        </div>
                        <div className={
                            "header-check__right header-check_" +
                            props.flightDirection.toLowerCase() + "__right header-shared__right"
                        }>
                            <div className={
                                "header-check__price header-check_" +
                                props.flightDirection.toLowerCase() + "__price header-shared__price"
                            }>
                                {"$" + price}
                            </div>
                            <div className={
                                "header-check__interaction header-check_" +
                                props.flightDirection.toLowerCase() + "__interaction header-shared__interaction"
                            }>
                                <button 
                                    className={
                                        "header-check__share header-check_" +
                                        props.flightDirection.toLowerCase() + "__share icon-share header-shared__share"
                                    }
                                    type="button"
                                >
                                </button>
                                <button 
                                    className={
                                        "header-check__book header-check_" + 
                                        props.flightDirection.toLowerCase() + "__book header-shared__book"
                                    } 
                                    type="button"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return(
            <Fragment>
                <BreadCrumbs 
                    parentClasses={[
                        "header-flight", `header-flight_${props.flightDirection.toLowerCase()}`, "header-shared"
                    ]} 
                    links={[
                        {description: "Turkey", path: "#"}, {description: props.schedulePart.arrayPlace.city, path: "#"}
                    ]} 
                    current={props.schedulePart.arrayPlace.airport} isNoneColor={props.isCheck}
                />
                <div className={
                    "header-flight__row header-flight_" + 
                    props.flightDirection.toLowerCase() + "__row header-shared__row"
                }>
                    <div className={
                        "header-flight__left header-flight_" +
                        props.flightDirection.toLowerCase() + "__left header-shared__left"
                    }>
                        <h1 className={
                            "header-flight__title header-flight_" +
                            props.flightDirection.toLowerCase() + "__title header-shared__title"
                        }>
                            {props.schedulePart.airline.alt + " " + props.schedulePart.airplane}
                        </h1>
                        <div className={
                            "header-flight__location header-flight_" +
                            props.flightDirection.toLowerCase() + "__location header-shared__location icon-location"
                        }>
                            <span>{props.schedulePart.arrayPlace.full}</span>
                        </div>
                        <ShortReview 
                            parentClasses={[
                                "header-flight", `header-flight_${props.flightDirection.toLowerCase()}`,  "header-shared"
                            ]} 
                            about={props.shortReview} 
                        />
                    </div>
                    <div className={
                        "header-flight__right header-flight_" +
                        props.flightDirection.toLowerCase() + "__right header-shared__right"
                    }>
                        <div className={
                            "header-flight__price header-flight_" +
                            props.flightDirection.toLowerCase() + "__price header-shared__price"
                        }>
                            {"$" + price}
                        </div>
                        <div className={
                            "header-flight__interaction header-flight_" +
                            props.flightDirection.toLowerCase() + "__interaction header-shared__interaction"
                        }>
                            <button 
                                className={
                                    "header-flight__favourites header-flight_" + 
                                    props.flightDirection.toLowerCase() + "__favourites icon-heart_border header-shared__favourites"
                                }
                                type="button"
                            >
                            </button>
                            <button 
                                className={
                                    "header-flight__share header-flight_" +
                                    props.flightDirection.toLowerCase() + "__share icon-share header-shared__share"
                                }
                                type="button"
                            >
                            </button>
                            <button 
                                className={
                                    "header-flight__book header-flight_" + 
                                    props.flightDirection.toLowerCase() + "__book header-shared__book"
                                } 
                                type="button"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    let minPrice = 
        props.about.rooms[0].price.baseFare + props.about.rooms[0].price.serviceFee + props.about.rooms[0].price.taxes - 
        props.about.rooms[0].price.discount
    ;
    props.about.rooms.slice(1).map(room => {
        let price = room.price.baseFare + room.price.serviceFee + room.price.taxes - room.price.discount;
        if(price < minPrice){
            minPrice = price;
        }
    });

    let sumRating = 0;
    props.about.reviews.elements.forEach(review => {
        sumRating += review.grade;
    });


    if(props.isCheck){
        return(
            <Fragment>
                <BreadCrumbs 
                    parentClasses={["header-check", "header-shared"]} 
                    links={[
                        {description: "Turkey", path: "#"},
                        {description: props.about.location.city, path: "#"}
                    ]} 
                    current={props.about.title} isNoneColor={true}
                />
                <div className="header-check__row header-shared__row">
                    <div className="header-check__left header-shared__left">
                        <h1 className="header-check__title header-shared__title">
                            {props.about.title}
                        </h1>
                        <div className="header-check__location header-shared__location icon-location">
                            <span>{props.about.location.full}</span>
                        </div>
                    </div>
                    <div className="header-check__right header-shared__right">
                        <div className="header-check__price header-shared__price">
                            {"$" + minPrice}
                        </div>
                        <div className="header-check__interaction header-shared__interaction">
                            <button className="header-check__share header-shared__share icon-share" type="button"></button>
                            <button className="header-check__book header-shared__book" type="button">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    return(
        <Fragment>
            <BreadCrumbs 
                parentClasses={["header-hotel", "header-shared"]} 
                links={[
                    {description: "Turkey", path: "#"},
                    {description: props.about.location.city, path: "#"}
                ]} 
                current={props.about.title} isNoneColor={false}
            />
            <div className="header-hotel__row header-shared__row">
                <div className="header-hotel__left header-shared__left">
                    <div className="header-hotel__top">
                        <h1 className="header-hotel__title header-shared__title">
                            {props.about.title}
                        </h1>
                        <div className="header-hotel__stars">
                            <ul className="header-hotel__stars-container">
                                {Array.from({length: 5}).map((_, i) => {
                                    if(i < props.about.countStars){
                                        return <span className="item-hotels__star filled icon-star" key={i}></span>
                                    }
                                    return <span className="item-hotels__star icon-star" key={i}></span>
                                })}
                            </ul>
                            <div className="header-hotel__stars-count">
                                {props.about.countStars + " Star Hotel"}
                            </div>
                        </div>
                    </div>
                    <div className="header-hotel__location header-shared__location icon-location">
                        <span>{props.about.location.full}</span>
                    </div>
                    {props.about.reviews.elements.length !== 0 &&
                        <ShortReview 
                            parentClasses={["header-hotel", "header-shared"]} 
                            about={{
                                rating: sumRating / props.about.reviews.elements.length, 
                                countReviews: props.about.reviews.elements.length
                            }} 
                        />
                    }
                </div>
                <div className="header-hotel__right header-shared__right">
                    <div className="header-hotel__price header-shared__price">
                        {"$" + minPrice}<span>/night</span>
                    </div>
                    <div className="header-hotel__interaction header-shared__interaction">
                        <button 
                            className="header-hotel__favourites header-shared__favourites icon-heart_border" type="button"
                        >
                        </button>
                        <button className="header-hotel__share header-shared__share icon-share" type="button"></button>
                        <button className="header-hotel__book header-shared__book" type="button">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}