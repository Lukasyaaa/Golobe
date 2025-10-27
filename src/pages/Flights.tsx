import React, { type FC } from "react";
import { IntroVariants } from "../components/Common/IntroVariants";
import { useTypedSelector } from "../store";
import { SITE_PARTS } from "../types";
import { Travels } from "../components/Common/Travels/Travels";
import { Offers } from "../components/Common/Offers/Offers";
import { Map } from "../components/Flights/Start/Map";

export const Flights : FC = () =>{
    const about = useTypedSelector(state => state.flights.start);

    return(
        <main className="flights">
            <IntroVariants about={about.intro} type={SITE_PARTS.flights} />
            <Map />
            <Travels {...about.travels} />
            <Offers {...about.offers} />
        </main>
    )
}