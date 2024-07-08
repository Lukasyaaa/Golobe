import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import Options from "../Common/Options/Options";

interface introFlightsProps{
    isSupportWebp : boolean
}

export const IntroFlights : FC<introFlightsProps> = ({isSupportWebp}) =>{
    const introFlightsStore = useTypedSelector(store => store.flights.intro);
    const pathToBackground = (isSupportWebp) ? introFlightsStore.background.webp : introFlightsStore.background.jpeg;
    
    return(
        <section className="intro_flights">
            <div className="intro_flights__back" style={{
                background: `url(${pathToBackground}) center no-repeat`,
                backgroundSize: "cover"
            }}>
                <div className="container">
                    <div className="intro_flights__info">
                        <h1 className="intro_flights__heading">{introFlightsStore.heading}</h1>
                        <div className="intro_flights__subheading">{introFlightsStore.subheading}</div>
                    </div>
                </div>
            </div>
            <Options />
        </section>
    )
}