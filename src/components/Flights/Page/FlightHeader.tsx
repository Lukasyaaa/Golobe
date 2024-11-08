import React, { FC, Fragment } from "react";
import { flight, flightDirection } from "../../../types";
import { BreadCrumbs } from "../../Common/Breadcrumbs";
import { ShortReview } from "../../Common/ShortReview";

interface flightHeaderProps{
    about : flight,
    choosedFlight : string
}

export const FlightHeader : FC<flightHeaderProps> = ({about, choosedFlight}) => {
    if(choosedFlight.includes("+")){
        let departPrice = 
            about.schedule.depart.price.baseFare + about.schedule.depart.price.taxes + about.schedule.depart.price.serviceFee - 
            about.schedule.depart.price.discount;
        let returnPrice =             
            about.schedule.return.price.baseFare + about.schedule.return.price.taxes + about.schedule.return.price.serviceFee - 
            about.schedule.return.price.discount;
        return(
            <section className="flight__header header-flight two">
                <div className="container">
                    <div className="header-flight__breadcrumbs-container">
                        <BreadCrumbs 
                            parentClasses={["header-flight", "header_depart-flight"]} 
                            links={[
                                {description: "Turkey", path: "#"}, {description: about.schedule.depart.arrayPlace.city, path: "#"}
                            ]} 
                            current={about.schedule.depart.arrayPlace.airport} 
                        />
                        <BreadCrumbs 
                            parentClasses={["header-flight", "header_return-flight"]} 
                            links={[
                                {description: "Turkey", path: "#"}, {description: about.schedule.return.arrayPlace.city, path: "#"}
                            ]} 
                            current={about.schedule.return.arrayPlace.airport} 
                        />
                    </div>
                    <div className="header-flight__row">
                        <div className="header-flight__left">
                            <h1 className="header-flight__title">
                                {
                                    "Depart on " + about.schedule.depart.airline.alt + " " + about.schedule.depart.airplane + 
                                    ", and Come Back on " + about.schedule.return.airline.alt + " " + about.schedule.return.airplane
                                }
                            </h1>
                            <ul className="header-flight__locations">
                                <li className="header-flight__location header-flight__location_depart">
                                    Depart
                                    <div className="header-flight__location-inner header-flight__location_depart__inner icon-location">
                                        <span>{about.schedule.depart.arrayPlace.full}</span>
                                    </div>
                                </li>
                                <li className="header-flight__location header-flight__location_return">
                                    Return
                                    <div className="header-flight__location-inner header-flight__location_return__inner icon-location">
                                        <span>{about.schedule.return.arrayPlace.full}</span>
                                    </div>
                                </li>
                            </ul>
                            <ShortReview parentClasses={["header-flight"]} about={about.shortReview} />
                        </div>
                        <div className="header-flight__right">
                            <div className="header-flight__price">
                                {"$" + departPrice + ", $" + returnPrice}
                            </div>
                            <div className="header-flight__interaction">
                                <button className="header-flight__favourites icon-heart_border" type="button"></button>
                                <button className="header-flight__share icon-share" type="button"></button>
                                <button className="header-flight__book" type="button">Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="header-flight__images">
                        <picture className="header-flight__image header_depart-flight__image">
                            <img src={about.schedule.depart.image.srcs.jpeg} alt={about.schedule.depart.image.alt} />
                            <source srcSet={about.schedule.depart.image.srcs.webp} type="img/webp" />
                        </picture>
                        <picture className="header-flight__image header_return-flight__image">
                            <img src={about.schedule.return.image.srcs.jpeg} alt={about.schedule.return.image.alt} />
                            <source srcSet={about.schedule.return.image.srcs.webp} type="img/webp" />
                        </picture>
                        <div className="header-flight__subimage header_depart-flight__subimage">Depart</div>
                        <div className="header-flight__subimage header_return-flight__subimage">Return</div>
                    </div>
                </div>
            </section>
        )
    }

    let usedSchedulePart = (choosedFlight === flightDirection.Depart) ? about.schedule.depart : about.schedule.return;
    let price = 
        usedSchedulePart.price.baseFare + usedSchedulePart.price.taxes + usedSchedulePart.price.serviceFee - 
        usedSchedulePart.price.discount;
    return(
        <section 
            className={
                "flight__header header-flight" + 
                " flight__header_" + choosedFlight.toLowerCase() + " header_" + choosedFlight.toLowerCase() +"-flight"
            }
        >
            <div className="container">
                <BreadCrumbs 
                    parentClasses={["header-flight", `header_${choosedFlight.toLowerCase()}-flight`]} 
                    links={[
                        {description: "Turkey", path: "#"}, {description: usedSchedulePart.arrayPlace.city, path: "#"}
                    ]} 
                    current={usedSchedulePart.arrayPlace.airport}
                />
                <div className={"header-flight__row " + "header_" + choosedFlight.toLowerCase() + "-flight__row"}>
                    <div className={"header-flight__left " + "header_" + choosedFlight.toLowerCase() + "-flight__left"}>
                        <h1 className={"header-flight__title " + "header_" + choosedFlight.toLowerCase() + "-flight__title"}>
                            {usedSchedulePart.airline.alt + " " + usedSchedulePart.airplane}
                        </h1>
                        <div className={"header-flight__location " + "header_" + choosedFlight.toLowerCase() + "-flight__location icon-location"}>
                            <span>{usedSchedulePart.arrayPlace.full}</span>
                        </div>
                        <ShortReview parentClasses={["header-flight", ]} about={about.shortReview} />
                    </div>
                    <div className={"header-flight__right " + "header_" + choosedFlight.toLowerCase() + "-flight__right"}>
                        <div className={"header-flight__price " + "header_" + choosedFlight.toLowerCase() + "-flight__price"}>
                            {"$" + price}
                        </div>
                        <div className={"header-flight__interaction " + "header_" + choosedFlight.toLowerCase() + "-flight__interaction"}>
                            <button 
                                className={
                                    "header-flight__favourites " + 
                                    "header_" + choosedFlight.toLowerCase() + "-flight__favourites icon-heart_border"
                                }
                                type="button"
                            ></button>
                            <button 
                                className={
                                    "header-flight__share " + 
                                    "header_" + choosedFlight.toLowerCase() + "-flight__share icon-share"
                                }
                                type="button"
                            ></button>
                            <button 
                                className={"header-flight__book " + "header_" + choosedFlight.toLowerCase() + "-flight__book"} 
                                type="button"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
                <picture className={"header-flight__image " + "header_" + choosedFlight.toLowerCase() + "-flight__image"}>
                    <img src={usedSchedulePart.image.srcs.jpeg} alt={usedSchedulePart.image.alt} />
                    <source srcSet={usedSchedulePart.image.srcs.webp} type="img/webp" />
                </picture>
            </div>
        </section>
    )
}