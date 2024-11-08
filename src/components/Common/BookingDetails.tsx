import React, { FC, Fragment } from "react";
import { contentPart, flightSchedulePart, hotel, imageVariants } from "../../types";
import { durationToString, getDayWeek, getFlightAmenitie, getMonth, halfTimeToWholeString, timeToInt, timeToString } from "../../helperFunctions";
import { NavLink } from "react-router-dom";
import { flightsConfiguratePath } from "../../App";

interface finalFlightBookingDetailsProps{
    about : flightSchedulePart,
    isFinal : true,
    contentType : contentPart.Flights
}

interface finalHotelBookingDetailsProps{
    about : hotel,
    isFinal : true,
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
    if(!props.isFinal){
        let date = new Date(props.about.takeoffTime.year, props.about.takeoffTime.month - 1, props.about.takeoffTime.day);
        let flyTime = timeToInt(props.about.arrayTime.units, 1440) - timeToInt(props.about.takeoffTime.units, 0);

        let choosedSeatsTypeTitle : string[] = [];
        if(props.choosedSeatsType.indexOf(props.about.seatsTypes.economy[0]) !== -1){
            choosedSeatsTypeTitle.push("Economy");
        }
        if(props.choosedSeatsType.indexOf(props.about.seatsTypes.business[0]) !== -1){
            choosedSeatsTypeTitle.push("Busines");
        }
        if(props.choosedSeatsType.indexOf(props.about.seatsTypes.first[0]) !== -1){
            choosedSeatsTypeTitle.push("First");
        }

        if(props.isDepart){
            return(
                <article 
                    className={[
                        "booking__link", "link-booking",
                        "navigation-flight__link", "navigation-flight_depart__link", 
                        "link-navigation-flight", "link-navigation-flight_depart"
                    ].join(" ")}
                >
                    <div className="link-booking__header link-navigation-flight__header link-navigation-flight_depart__header">
                        <output className="link-booking__takeoff-time link-navigation-flight__takeoff-time link-navigation-flight_depart__takeoff-time">
                            {"Depart " + getDayWeek(date.getDay()) + ", " + getMonth(date.getMonth()) + " " + date.getDate()}
                        </output>
                        <output className="link-booking__fly-time link-navigation-flight__fly-time link-navigation-flight_depart__fly-time">
                            {durationToString(flyTime)}
                        </output>
                    </div>
                    <div className="link-booking__main link-navigation-flight__main link-navigation-flight_depart__main">
                        {(choosedSeatsTypeTitle.length !== 0) 
                            ? <NavLink 
                                className="link-booking__button link-navigation-flight__button link-navigation-flight_depart__button" 
                                to={flightsConfiguratePath + "/" + props.flightId + "/Depart" + "/" + choosedSeatsTypeTitle.join("+")}
                            >
                                <picture className="link-booking__image link-navigation-flight__image link-navigation-flight_depart__image">
                                    <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                    <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                                </picture>
                                <div className="link-booking__subimage link-navigation-flight__subimage link-navigation-flight_depart__subimage">
                                    <div className="link-booking__airline link-navigation-flight__airline link-navigation-flight_depart__airline">
                                        {props.about.airline.alt}
                                    </div>
                                    <div className="link-booking__airplane link-navigation-flight__airplane link-navigation-flight_depart__airplane">
                                        {props.about.airplane}
                                    </div>
                                </div>
                            </NavLink>
                            : <div className="link-booking__button link-navigation-flight__button link-navigation-flight_depart__button _disabled">
                                <picture className="link-booking__image link-navigation-flight__image link-navigation-flight_depart__image">
                                    <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                    <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                                </picture>
                                <div className="link-booking__subimage link-navigation-flight__subimage link-navigation-flight_depart__subimage">
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
                    <div className="link-booking__schedule link-navigation-flight__schedule link-navigation-flight_depart__schedule">
                        <div 
                            className={[
                                "link-booking__schedule-part", "link-booking__schedule-part_from",
                                "schedule-part-link-booking", "schedule-part_from-link-booking",
                                "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part_from",
                                "link-navigation-flight_depart__schedule-part", "link-navigation-flight_depart__schedule-part_from",
                                "schedule-part-link-navigation-flight", "schedule-part_from-link-navigation-flight",
                                "schedule-part-link-navigation-flight_depart", "schedule-part_from-link-navigation-flight_depart"
                            ].join(" ")}
                        >
                            <time 
                                className={[
                                    "schedule-part-link-booking__time", "schedule-part_from-link-booking__time",
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
                                    "schedule-part-link-navigation-flight__place", "schedule-part_from-link-navigation-flight__place",
                                    "schedule-part-link-navigation-flight_depart__place",
                                    "schedule-part_from-link-navigation-flight_depart__place"
                                ].join(" ")}
                            >
                                {props.about.from}
                            </span>
                        </div>
                        <div className="link-booking__gap link-navigation-flight__gap link-navigation-flight_depart__gap icon-plane"></div>
                        <div 
                            className={[
                                "link-booking__schedule-part", "schedule-part-link-booking",
                                "link-booking__schedule-part_to", "schedule-part_to-link-booking",
                                "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part_to",
                                "link-navigation-flight_depart__schedule-part", "link-navigation-flight_depart__schedule-part_to",
                                "schedule-part-link-navigation-flight", "schedule-part_to-link-navigation-flight",
                                "schedule-part-link-navigation-flight_depart", "schedule-part_to-link-navigation-flight_depart"
                            ].join(" ")}
                        >
                            <time 
                                className={[
                                    "schedule-part-link-booking__time", "schedule-part_to-link-booking__time",
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
                    "navigation-flight__link", "navigation-flight_return__link", 
                    "link-navigation-flight", "link-navigation-flight_return"
                ].join(" ")}
            >
                <div className="link-booking__header link-navigation-flight__header link-navigation-flight_return__header">
                    <output className="link-booking__takeoff-time link-navigation-flight__takeoff-time link-navigation-flight_return__takeoff-time">
                        {"Return " + getDayWeek(date.getDay()) + ", " + getMonth(date.getMonth()) + " " + date.getDate()}
                    </output>
                    <output className="link-booking__fly-time link-navigation-flight__fly-time link-navigation-flight_return__fly-time">
                        {durationToString(flyTime)}
                    </output>
                </div>
                <div className="link-booking__main link-navigation-flight__main link-navigation-flight_return__main">
                    {(choosedSeatsTypeTitle.length !== 0) 
                        ? <NavLink 
                            className="link-booking__button link-navigation-flight__button link-navigation-flight_return__button" 
                            to={flightsConfiguratePath + "/" + props.flightId + "/Return" + "/" + choosedSeatsTypeTitle.join("+")}
                        >
                            <picture className="link-booking__image link-navigation-flight__image link-navigation-flight_return__image">
                                <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                            </picture>
                            <div className="link-booking__subimage link-navigation-flight__subimage link-navigation-flight_return__subimage">
                                <div className="link-booking__airline link-navigation-flight__airline link-navigation-flight_return__airline">
                                    {props.about.airline.alt}
                                </div>
                                <div className="link-booking__airplane link-navigation-flight__airplane link-navigation-flight_return__airplane">
                                    {props.about.airplane}
                                </div>
                            </div>
                        </NavLink>
                        : <div className="link-booking__button link-navigation-flight__button link-navigation-flight_return__button _disabled">
                            <picture className="link-booking__image link-navigation-flight__image link-navigation-flight_return__image">
                                <img src={props.about.airline.srcs.jpeg} alt={props.about.airline.alt} />
                                <source srcSet={props.about.airline.srcs.webp} type="img/webp" />
                            </picture>
                            <div className="link-booking__subimage link-navigation-flight__subimage link-navigation-flight_return__subimage">
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
                <div className="link-booking__schedule link-navigation-flight__schedule link-navigation-flight_return__schedule">
                    <div 
                        className={[
                            "link-booking__schedule-part", "schedule-part-link-booking",
                            "link-booking__schedule-part_from", "schedule-part_from-link-booking",
                            "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part_from",
                            "link-navigation-flight_return__schedule-part", "link-navigation-flight_return__schedule-part_from",
                            "schedule-part-link-navigation-flight", "schedule-part_from-link-navigation-flight",
                            "schedule-part-link-navigation-flight_return", "schedule-part_from-link-navigation-flight_return"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_from-link-booking__time",
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
                                "schedule-part-link-navigation-flight__place", "schedule-part_from-link-navigation-flight__place",
                                "schedule-part-link-navigation-flight_return__place",
                                "schedule-part_from-link-navigation-flight_return__place"
                            ].join(" ")}
                        >
                            {props.about.from}
                        </span>
                    </div>
                    <div className="link-booking__gap link-navigation-flight__gap link-navigation-flight_return__gap icon-plane"></div>
                    <div 
                        className={[
                            "link-booking__schedule-part", "link-booking__schedule-part_to",
                            "schedule-part-link-booking", "schedule-part_to-link-booking",
                            "link-navigation-flight__schedule-part", "link-navigation-flight__schedule-part",
                            "link-navigation-flight_return__schedule-part", "link-navigation-flight_return__schedule-part_to",
                            "schedule-part-link-navigation-flight", "schedule-part_to-link-navigation-flight",
                            "schedule-part-link-navigation-flight_return", "schedule-part_to-link-navigation-flight_return"
                        ].join(" ")}
                    >
                        <time 
                            className={[
                                "schedule-part-link-booking__time", "schedule-part_to-link-booking__time",
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
                        {"Return " + getDayWeek(date.getDay()) + ", " + getMonth(date.getMonth()) + " " + date.getDate()}
                    </output>
                    <output className="link-booking__fly-time link-booking_flight__fly-time">
                        {durationToString(flyTime)}
                    </output>
                </div>
                <div className="link-booking__main link-booking_flight__main">
                    <NavLink className="link-booking__button link-booking_flight__button" to={""}>
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
    return <Fragment />
}