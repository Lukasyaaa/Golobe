import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { Options } from "../Common/Options/Options";
import { optionsBlockType, optionsItemsType } from "../../types";

interface introFlightsProps{
    isSupportWebp : boolean
}

export const IntroFlights : FC<introFlightsProps> = ({isSupportWebp}) =>{
    const introStore = useTypedSelector(store => store.flights.intro);
    const pathToBackground = (isSupportWebp) ? introStore.background.webp : introStore.background.jpeg;
    
    return(
        <section className="intro_flights">
            <div className="intro_flights__back" style={{
                background: `url(${pathToBackground}) center no-repeat`,
                backgroundSize: "cover"
            }}>
                <div className="container">
                    <div className="intro_flights__info">
                        <h1 className="intro_flights__heading">{introStore.heading}</h1>
                        <div className="intro_flights__subheading">{introStore.subheading}</div>
                    </div>
                </div>
            </div>
            <Options neededBlocks={optionsBlockType.FLIGHTS_HEADER_TYPE} startValue={optionsItemsType.Flights} />
        </section>
    )
}