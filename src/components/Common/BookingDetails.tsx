import React, { FC, useState } from "react";
import { contentPart, flightDirection, flightSchedulePart, hotel, imageVariants } from "../../types";
import { durationToString, getDayWeek, getDayWeekFull, getFlightAmenitie, getStringMonth, halfTimeToWholeString, timeToInt, timeToString } from "../../helperFunctions";
import { NavLink } from "react-router-dom";
import { flightsConfiguratePath, hotelsConfiguretePath } from "../../App";

interface finalFlightBookingDetailsProps{
    id : number,
    about : flightSchedulePart,
    flightDirection : flightDirection,
    seatsTypes : string[],
    isFinal : true,
    isAuthorized : boolean,
    contentType : contentPart.Flights
}

interface finalHotelBookingDetailsProps{
    about : hotel,
    roomId : number,
    title : string,
    isFinal : true,
    isAuthorized : boolean,
    contentType : contentPart.Hotels
}

interface unFinalBookingDetailsProps{
    about : flightSchedulePart,
    isFinal : false,
    flightId : number,
    isDepart : boolean,
    choosedSeatsType : imageVariants<string>[]
}

export const BookingDetails : FC<
    finalFlightBookingDetailsProps | finalHotelBookingDetailsProps | unFinalBookingDetailsProps
> = (props) => {
    let [checkIn, setCheckIn] = useState<Date>(new Date());
    const nextCheckIn = () => {
        let checkInCopy : Date = new Date(checkIn);
        checkInCopy.setDate(checkInCopy.getDate() + 1);
        setCheckIn(checkInCopy);
    }
    let [checkOut, setCheckOut] = useState<Date>(new Date(checkIn.getTime() + 24*3600*1000));
    const nextCheckOut = () => {
        let checkOutCopy : Date = new Date(checkOut);
        checkOutCopy.setDate(checkOutCopy.getDate() + 1);
        setCheckOut(checkOutCopy);
    }

    if(!props.isFinal){
        let date = new Date(props.about.takeoffTime.year, props.about.takeoffTime.month - 1, props.about.takeoffTime.day);
        let flyTime = timeToInt(props.about.arrayTime.units, 1440) - timeToInt(props.about.takeoffTime.units, 0);

        let choosedSeatsTypeTitle : string[] = [];
        if(props.choosedSeatsType.indexOf(props.about.seatsTypes.economy.images[0]) !== -1){
            choosedSeatsTypeTitle.push("Economy");
        }
        if(props.choosedSeatsType.indexOf(props.about.seatsTypes.business.images[0]) !== -1){
            choosedSeatsTypeTitle.push("Busines");
        }
        if(props.choosedSeatsType.indexOf(props.about.seatsTypes.first.images[0]) !== -1){
            choosedSeatsTypeTitle.push("First");
        }

        if(props.isDepart){
            return(
                <article 
                    className={[
                        "booking__link", "link-booking",
                        "booking__link_flight", "link-booking_flight",
                        "navigation-flight__link", "navigation-flight_depart__link", 
                        "link-navigation-flight", "link-navigation-flight_depart"
                    ].join(" ")}
                >
                    <div className="link-booking__header link-booking_flight__header link-navigation-flight__header link-navigation-flight_depart__header">
                        <output className="link-booking__takeoff-time link-navigation-flight__takeoff-time link-navigation-flight_depart__takeoff-time">
                            {"Depart " + getDayWeek(date.getDay()) + ", " + getStringMonth(date.getMonth()) + " " + date.getDate()}
                        </output>
                        <output className="link-booking__fly-time link-navigation-flight__fly-time link-navigation-flight_depart__fly-time">
                            {durationToString(flyTime)}
                        </output>
                    </div>
                    <div className="link-booking__main link-navigation-flight__main link-navigation-flight_depart__main">
                        {(choosedSeatsTypeTitle.length !== 0) 
                            ? <NavLink 
                                className="link-booking__button link-booking_flight__button link-navigation-flight__button link-navigation-flight_depart__button" 
                                to={flightsConfiguratePath + "/" + props.flightId + "/Depart" + "/" + choosedSeatsTypeTitle.join("+")}
                            >
                                <picture className="link-booking__image link-booking_flight__image link-navigation-flight__image link-navigation-flight_depart__image">
                                    <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                    <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                                </picture>
                                <div className="link-booking__subimage link-booking_flight__subimage link-navigation-flight__subimage link-navigation-flight_depart__subimage">
                                    <div className="link-booking__airline link-navigation-flight__airline link-navigation-flight_depart__airline">
                                        {props.about.airline.alt}
                                    </div>
                                    <div className="link-booking__airplane link-navigation-flight__airplane link-navigation-flight_depart__airplane">
                                        {props.about.airplane}
                                    </div>
                                </div>
                            </NavLink>
                            : <div className="link-booking__button link-booking_flight__button link-navigation-flight__button link-navigation-flight_depart__button _disabled">
                                <picture className="link-booking__image link-booking_flight__image link-navigation-flight__image link-navigation-flight_depart__image">
                                    <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                    <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                                </picture>
                                <div className="link-booking__subimage link-booking_flight__subimage link-navigation-flight__subimage link-navigation-flight_depart__subimage">
                                    <div className="link-booking__airline link-navigation-flight__airline link-navigation-flight_depart__airline">
                                        {props.about.airline.alt}
                                    </div>
                                    <div className="link-booking__airplane link-navigation-flight__airplane link-navigation-flight_depart__airplane">
                                        {props.about.airplane}
                                    </div>
                                </div>
                            </div>
                        }
                        <ul className="link-booking__amenities link-navigation-flight__amenities link-navigation-flight_depart__amenities">
                            {props.about.amenities.map((amenitie, i) => 
                                <li 
                                    className={"link-booking__amenitie link-navigation-flight__amenitie link-navigation-flight_depart__amenitie " + getFlightAmenitie(amenitie)}
                                    key={i}
                                >
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="link-booking__schedule link-booking_flight__schedule link-navigation-flight__schedule link-navigation-flight_depart__schedule">
                        <div 
                            className={[
                                "link-booking__schedule-part", "link-booking__schedule-part_from",
                                "link-booking_flight__schedule-part", "link-booking_flight__schedule-part_from",
                                "schedule-part-link-booking", "schedule-part_from-link-booking",
                                "schedule-part-link-booking_flight", "schedule-part_from-link-booking_flight",
                                "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part_from",
                                "link-navigation-flight_depart__schedule-part", "link-navigation-flight_depart__schedule-part_from",
                                "schedule-part-link-navigation-flight", "schedule-part_from-link-navigation-flight",
                                "schedule-part-link-navigation-flight_depart", "schedule-part_from-link-navigation-flight_depart"
                            ].join(" ")}
                        >
                            <time 
                                className={[
                                    "schedule-part-link-booking__time", "schedule-part_from-link-booking__time",
                                    "schedule-part-link-booking_flight__time", "schedule-part_from-link-booking_flight__time",
                                    "schedule-part-link-navigation-flight__time", "schedule-part_from-link-navigation-flight__time",
                                    "schedule-part-link-navigation-flight_depart__time", 
                                    "schedule-part_from-link-navigation-flight_depart__time"
                                ].join(" ")}
                                dateTime={
                                    props.about.takeoffTime.year + "-" + props.about.takeoffTime.month + "-" + props.about.takeoffTime.day +
                                    "T" + halfTimeToWholeString(props.about.takeoffTime.units)
                                }
                            >
                                {timeToString(props.about.takeoffTime.units)}
                            </time>
                            <span 
                                className={[
                                    "schedule-part-link-booking__place", "schedule-part_from-link-booking__place",
                                    "schedule-part-link-booking_flight__place", "schedule-part_from-link-booking_flight__place",
                                    "schedule-part-link-navigation-flight__place", "schedule-part_from-link-navigation-flight__place",
                                    "schedule-part-link-navigation-flight_depart__place",
                                    "schedule-part_from-link-navigation-flight_depart__place"
                                ].join(" ")}
                            >
                                {props.about.from}
                            </span>
                        </div>
                        <div className="link-booking__gap link-booking_flight__gap link-navigation-flight__gap link-navigation-flight_depart__gap icon-plane"></div>
                        <div 
                            className={[
                                "link-booking__schedule-part", "schedule-part-link-booking",
                                "link-booking_flight__schedule-part", "schedule-part-link-booking_flight",
                                "link-booking__schedule-part_to", "schedule-part_to-link-booking",
                                "link-booking_flight__schedule-part-to", "schedule-part_to-link-booking_flight",
                                "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part_to",
                                "link-navigation-flight_depart__schedule-part", "link-navigation-flight_depart__schedule-part_to",
                                "schedule-part-link-navigation-flight", "schedule-part_to-link-navigation-flight",
                                "schedule-part-link-navigation-flight_depart", "schedule-part_to-link-navigation-flight_depart"
                            ].join(" ")}
                        >
                            <time 
                                className={[
                                    "schedule-part-link-booking__time", "schedule-part_to-link-booking__time",
                                    "schedule-part-link-booking_flight__time", "schedule-part_to-link-booking_flight__time",
                                    "schedule-part-link-navigation-flight__time", "schedule-part_to-link-navigation-flight__time",
                                    "schedule-part-link-navigation-flight_depart__time", 
                                    "schedule-part_to-link-navigation-flight_depart__time"
                                ].join(" ")}
                                dateTime={
                                    props.about.arrayTime.year + "-" + props.about.arrayTime.month + "-" + props.about.arrayTime.day +
                                    "T" + halfTimeToWholeString(props.about.arrayTime.units)
                                }
                            >
                                {timeToString(props.about.arrayTime.units)}
                            </time>
                            <span 
                                className={[
                                    "schedule-part-link-booking__place", "schedule-part_to-link-booking__place",
                                    "schedule-part-link-booking_flight__place", "schedule-part_to-link-booking_flight__place",
                                    "schedule-part-link-navigation-flight__place", "schedule-part_to-link-navigation-flight__place",
                                    "schedule-part-link-navigation-flight_depart__place",
                                    "schedule-part_to-link-navigation-flight_depart__place"
                                ].join(" ")}
                            >
                                {props.about.to}
                            </span>
                        </div>
                    </div>
                </article>
            )
        }
        return(
            <article 
                className={[
                    "booking__link", "link-booking",
                    "booking__link_flight", "link-booking_flight",
                    "navigation-flight__link", "navigation-flight_return__link", 
                    "link-navigation-flight", "link-navigation-flight_return"
                ].join(" ")}
            >
                <div className="link-booking__header link-booking_flight__header link-navigation-flight__header link-navigation-flight_return__header">
                    <output className="link-booking__takeoff-time link-navigation-flight__takeoff-time link-navigation-flight_return__takeoff-time">
                        {"Return " + getDayWeek(date.getDay()) + ", " + getStringMonth(date.getMonth()) + " " + date.getDate()}
                    </output>
                    <output className="link-booking__fly-time link-navigation-flight__fly-time link-navigation-flight_return__fly-time">
                        {durationToString(flyTime)}
                    </output>
                </div>
                <div className="link-booking__main link-navigation-flight__main link-navigation-flight_return__main">
                    {(choosedSeatsTypeTitle.length !== 0) 
                        ? <NavLink 
                            className="link-booking__button link-booking_flight__button link-navigation-flight__button link-navigation-flight_return__button" 
                            to={flightsConfiguratePath + "/" + props.flightId + "/Return" + "/" + choosedSeatsTypeTitle.join("+")}
                        >
                            <picture className="link-booking__image link-booking_flight__image link-navigation-flight__image link-navigation-flight_return__image">
                                <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                            </picture>
                            <div className="link-booking__subimage link-booking_flight__subimage link-navigation-flight__subimage link-navigation-flight_return__subimage">
                                <div className="link-booking__airline link-navigation-flight__airline link-navigation-flight_return__airline">
                                    {props.about.airline.alt}
                                </div>
                                <div className="link-booking__airplane link-navigation-flight__airplane link-navigation-flight_return__airplane">
                                    {props.about.airplane}
                                </div>
                            </div>
                        </NavLink>
                        : <div className="link-booking__button link-booking_flight__button link-navigation-flight__button link-navigation-flight_return__button _disabled">
                            <picture className="link-booking__image link-booking_flight__image link-navigation-flight__image link-navigation-flight_return__image">
                                <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                            </picture>
                            <div className="link-booking__subimage link-booking_flight__subimage link-navigation-flight__subimage link-navigation-flight_return__subimage">
                                <div className="link-booking__airline link-navigation-flight__airline link-navigation-flight_return__airline">
                                    {props.about.airline.alt}
                                </div>
                                <div className="link-booking__airplane link-navigation-flight__airplane link-navigation-flight_return__airplane">
                                    {props.about.airplane}
                                </div>
                            </div>
                        </div>
                    }
                    <ul className="link-booking__amenities link-navigation-flight__amenities link-navigation-flight_return__amenities">
                        {props.about.amenities.map((amenitie, i) => 
                            <li 
                                className={"link-booking__amenitie link-navigation-flight__amenitie link-navigation-flight_return__amenitie " + getFlightAmenitie(amenitie)}
                                key={i}
                            ></li>
                        )}
                    </ul>
                </div>
                <div className="link-booking__schedule link-booking_flight__schedule link-navigation-flight__schedule link-navigation-flight_return__schedule">
                    <div 
                        className={[
                            "link-booking__schedule-part", "schedule-part-link-booking",
                            "link-booking_flight__schedule-part", "schedule-part-link-booking_flight",
                            "link-booking__schedule-part_from", "schedule-part_from-link-booking",
                            "link-booking_flight__schedule-part_from", "schedule-part_from-link-booking_flight",
                            "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part_from",
                            "link-navigation-flight_return__schedule-part", "link-navigation-flight_return__schedule-part_from",
                            "schedule-part-link-navigation-flight", "schedule-part_from-link-navigation-flight",
                            "schedule-part-link-navigation-flight_return", "schedule-part_from-link-navigation-flight_return"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_from-link-booking__time",
                                "schedule-part-link-booking_flight__time", "schedule-part_from-link-booking_flight__time",
                                "schedule-part-link-navigation-flight__time", "schedule-part_from-link-navigation-flight__time",
                                "schedule-part-link-navigation-flight_return__time", 
                                "schedule-part_from-link-navigation-flight_return__time"
                            ].join(" ")}
                            dateTime={
                                props.about.takeoffTime.year + "-" + props.about.takeoffTime.month + "-" + props.about.takeoffTime.day +
                                "T" + halfTimeToWholeString(props.about.takeoffTime.units)
                            }
                        >
                            {timeToString(props.about.takeoffTime.units)}
                        </time>
                        <span 
                            className={[
                                "schedule-part-link-booking__place", "schedule-part_from-link-booking__place",
                                "schedule-part-link-booking_flight__place", "schedule-part_from-link-booking_flight__place",
                                "schedule-part-link-navigation-flight__place", "schedule-part_from-link-navigation-flight__place",
                                "schedule-part-link-navigation-flight_return__place",
                                "schedule-part_from-link-navigation-flight_return__place"
                            ].join(" ")}
                        >
                            {props.about.from}
                        </span>
                    </div>
                    <div className="link-booking__gap link-booking_flight__gap link-navigation-flight__gap link-navigation-flight_return__gap icon-plane"></div>
                    <div 
                        className={[
                            "link-booking__schedule-part", "link-booking__schedule-part_to",
                            "link-booking_flight__schedule-part", "link-booking_flight__schedule-part_to",
                            "schedule-part-link-booking", "schedule-part_to-link-booking",
                            "schedule-part-link-booking_flight", "schedule-part_to-link-booking_flight",
                            "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part",
                            "link-navigation-flight_return__schedule-part", "link-navigation-flight_return__schedule-part_to",
                            "schedule-part-link-navigation-flight", "schedule-part_to-link-navigation-flight",
                            "schedule-part-link-navigation-flight_return", "schedule-part_to-link-navigation-flight_return"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_to-link-booking__time",
                                "schedule-part-link-booking_flight__time", "schedule-part_to-link-booking_flight__time",
                                "schedule-part-link-navigation-flight__time", "schedule-part_to-link-navigation-flight__time",
                                "schedule-part-link-navigation-flight_return__time", 
                                "schedule-part_to-link-navigation-flight_return__time"
                            ].join(" ")}
                            dateTime={
                                props.about.arrayTime.year + "-" + props.about.arrayTime.month + "-" + props.about.arrayTime.day +
                                "T" + halfTimeToWholeString(props.about.arrayTime.units)
                            }
                        >
                            {timeToString(props.about.arrayTime.units)}
                        </time>
                        <span 
                            className={[
                                "schedule-part-link-booking__place", "schedule-part_to-link-booking__place",
                                "scheduel-part-link-booking_flight__place", "schedule-part_to-link-booking_flight__place",
                                "schedule-part-link-navigation-flight__place", "schedule-part_to-link-navigation-flight__place",
                                "schedule-part-link-navigation-flight_return__place",
                                "schedule-part_to-link-navigation-flight_return__place"
                            ].join(" ")}
                        >
                            {props.about.to}
                        </span>
                    </div>
                </div>
            </article>
        )
    }
    if(props.contentType === contentPart.Flights){
        let date = new Date(props.about.takeoffTime.year, props.about.takeoffTime.month - 1, props.about.takeoffTime.day);
        let flyTime = timeToInt(props.about.arrayTime.units, 1440) - timeToInt(props.about.takeoffTime.units, 0);
        return(
            <article 
                className="booking__link link-booking booking_flight__link link-booking_flight"
            >
                <div className="link-booking__header link-booking_flight__header">
                    <output className="link-booking__takeoff-time link-booking_flight__takeoff-time">
                        {"Return " + getDayWeek(date.getDay()) + ", " + getStringMonth(date.getMonth()) + " " + date.getDate()}
                    </output>
                    <output className="link-booking__fly-time">
                        {durationToString(flyTime)}
                    </output>
                </div>
                <div className="link-booking__main link-booking_flight__main">
                    {(props.isAuthorized)
                        ?<NavLink 
                            className="link-booking__button link-booking_flight__button" 
                            to={
                                flightsConfiguratePath + "/" + props.id + "/" + props.flightDirection + "/" +
                                props.seatsTypes.join("+") + "/Cheque/"
                            }
                        >
                            <picture className="link-booking__image link-booking_flight__image">
                                <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                            </picture>
                            <div className="link-booking__subimage link-booking_flight__subimage">
                                <div className="link-booking__airline link-booking_flight__airline">
                                    {props.about.airline.alt}
                                </div>
                                <div className="link-booking__airplane link-booking_flight__airplane">
                                    {props.about.airplane}
                                </div>
                            </div>
                        </NavLink>
                        : <div 
                            className="link-booking__button link-booking_flight__button" 
                        >
                            <picture className="link-booking__image link-booking_flight__image">
                                <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                            </picture>
                            <div className="link-booking__subimage link-booking_flight__subimage">
                                <div className="link-booking__airline link-booking_flight__airline">
                                    {props.about.airline.alt}
                                </div>
                                <div className="link-booking__airplane link-booking_flight__airplane">
                                    {props.about.airplane}
                                </div>
                            </div>
                        </div>
                    }
                    <ul className="link-booking__amenities link-booking_flight__amenities">
                        {props.about.amenities.map((amenitie, i) => 
                            <li 
                                className={`link-booking__amenitie link-booking_flight__amenitie ${getFlightAmenitie(amenitie)}`}
                                key={i}
                            >
                            </li>
                        )}
                    </ul>
                </div>
                <div className="link-booking__schedule link-booking_flight__schedule">
                    <div 
                        className={[
                            "link-booking__schedule-part", "link-booking__schedule-part_from",
                            "link-booking_flight__schedule-part", "link-booking_flight__schedule-part_from",
                            "schedule-part-link-booking", "schedule-part_from-link-booking",
                            "schedule-part-link-booking_flight", "schedule-part_from-link-booking_flight"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_from-link-booking__time",
                                "schedule-part-link-booking_flight__time", "schedule-part_from-link-booking_flight__time"
                            ].join(" ")}
                            dateTime={
                                props.about.takeoffTime.year + "-" + props.about.takeoffTime.month + "-" + props.about.takeoffTime.day +
                                "T" + halfTimeToWholeString(props.about.takeoffTime.units)
                            }
                        >
                            {timeToString(props.about.takeoffTime.units)}
                        </time>
                        <span 
                            className={[
                                "schedule-part-link-booking__place", "schedule-part_from-link-booking__place",
                                "schedule-part-link-booking_flight__place", "schedule-part_from-link-booking_flight__place"
                            ].join(" ")}
                        >
                            {props.about.from}
                        </span>
                    </div>
                    <div className="link-booking__gap link-bookin_flight__gap icon-plane"></div>
                    <div 
                        className={[
                            "link-booking__schedule-part", "link-booking__schedule-part_to",
                            "link-booking_flight__schedule-part", "link-booking_flight__schedule-part_to",
                            "schedule-part-link-booking", "schedule-part_to-link-booking",
                            "schedule-part-link-booking_flight", "schedule-part_to-link-booking_flight"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_to-link-booking__time",
                                "schedule-part-link-booking_flight__time", "schedule-part_to-link-booking_flight__time"
                            ].join(" ")}
                            dateTime={
                                props.about.arrayTime.year + "-" + props.about.arrayTime.month + "-" + props.about.arrayTime.day +
                                "T" + halfTimeToWholeString(props.about.arrayTime.units)
                            }
                        >
                            {timeToString(props.about.arrayTime.units)}
                        </time>
                        <span 
                            className={[
                                "schedule-part-link-booking__place", "schedule-part_to-link-booking__place",
                                "schedule-part-link-booking_flight__place", "schedule-part_to-link-booking_flight__place"
                            ].join(" ")}
                        >
                            {props.about.to}
                        </span>
                    </div>
                </div>
            </article>
        )
    }

    return(
        <article 
            className="booking__link link-booking booking_hotel__link link-booking_hotel"
        >
            <div className="link-booking__header link-booking_hotel__header">
                <output className="link-booking__advantages">
                    {props.title}
                </output>
                <output className="link-booking__price">
                    <mark>{"$" + 0}</mark>/night
                </output>
            </div>
            <NavLink 
                className="link-booking__button link-booking_hotel__button" 
                to={
                    hotelsConfiguretePath + "/" + props.about.id + "/Rooms/" + props.roomId + "/Cheque/CheckIn/" +
                    checkIn.getFullYear() + "+" + getStringMonth(checkIn.getMonth() + 1) + "+" + checkIn.getDate() + "/CheckOut/" + 
                    checkOut.getFullYear() + "+" + getStringMonth(checkOut.getMonth() + 1) + "+" + checkOut.getDate() + "/"
                }
            >
                <picture className="link-booking__image link-booking_hotel__image">
                    <img src={props.about.logo.srcs.jpeg} alt={props.about.logo.alt} />
                    <source srcSet={props.about.logo.srcs.webp} type="img/webp" />
                </picture>
                <div className="link-booking__subimage link-booking_hotel__subimage">
                    <div className="link-booking__title">
                        {props.about.title}
                    </div>
                    <div className="link-booking__location icon-location">
                        <span>{props.about.location.full}</span>
                    </div>
                </div>
            </NavLink>
            <div className="link-booking__schedule link-booking_hotel__schedule">
                <button 
                    className={[
                        "link-booking__schedule-part", "link-booking__schedule-part_from",
                        "link-booking_hotel__schedule-part", "link-booking_hotel__schedule-part_from",
                        "schedule-part-link-booking", "schedule-part_from-link-booking",
                        "schedule-part-link-booking_hotel", "schedule-part_from-link-booking_hotel"
                    ].join(" ")}
                    type="button" disabled={((checkOut.getTime() - checkIn.getTime()) === 24*3600*1000)}
                    onClick={((checkOut.getTime() - checkIn.getTime()) !== 24*3600*1000) ? () => nextCheckIn() : undefined}
                >
                    <div                             
                        className={[
                            "schedule-part-link-booking__inner", "schedule-part_from-link-booking__inner",
                            "schedule-part-link-booking_hotel__inner", "schedule-part_from-link-booking_hotel__inner"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_from-link-booking__time",
                                "schedule-part-link-booking_hotel__time", "schedule-part_from-link-booking_hotel__time"
                            ].join(" ")}
                            dateTime={
                                checkIn.getFullYear() + "-" + checkIn.getMonth() + "-" + checkIn.getDate()
                            }
                        >
                            {getDayWeekFull(checkIn.getDay()) + ", " + getStringMonth(checkIn.getMonth()) + " " + checkIn.getDate()}
                        </time>
                        <span 
                            className={[
                                "schedule-part-link-booking__place", "schedule-part_from-link-booking__place",
                                "schedule-part-link-booking_hotel__place", "schedule-part_from-link-booking_hotel__place"
                            ].join(" ")}
                        >
                            Check-in
                        </span>
                    </div>
                </button>
                <div className="link-booking__gap link-bookin_hotel__gap icon-hotel"></div>
                <button 
                    className={[
                        "link-booking__schedule-part", "link-booking__schedule-part_to",
                        "link-booking_hotel__schedule-part", "link-booking_hotel__schedule-part_to",
                        "schedule-part-link-booking", "schedule-part_to-link-booking",
                        "schedule-part-link-booking_hotel", "schedule-part_to-link-booking_hotel"
                    ].join(" ")}
                    type="button" onClick={nextCheckOut}
                >
                    <div                             
                        className={[
                            "schedule-part-link-booking__inner", "schedule-part_to-link-booking__inner",
                            "schedule-part-link-booking_hotel__inner", "schedule-part_to-link-booking_hotel__inner"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_to-link-booking__time",
                                "schedule-part-link-booking_hotel__time", "schedule-part_to-link-booking_hotel__time"
                            ].join(" ")}
                            dateTime={
                                checkOut.getFullYear() + "-" + checkOut.getMonth() + "-" + checkOut.getDate()
                            }
                        >
                            {getDayWeekFull(checkOut.getDay()) + ", " + getStringMonth(checkOut.getMonth()) + " " + checkOut.getDate()}
                        </time>
                        <span 
                            className={[
                                "schedule-part-link-booking__place", "schedule-part_to-link-booking__place",
                                "schedule-part-link-booking_hotel__place", "schedule-part_to-link-booking_hotel__place"
                            ].join(" ")}
                        >
                            Check Out
                        </span>
                    </div>
                </button>
            </div>
        </article>
    )
}