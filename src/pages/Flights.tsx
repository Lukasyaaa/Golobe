import React, {FC, Fragment} from "react";
import { IntroFlights } from "../components/Flights/IntroFlights";
import { Map } from "../components/Flights/Map";
import { Travels } from "../components/Flights/Travels";
import { Offer } from "../components/Flights/Offer";

interface FlightsProps{
    isSupportWebp : boolean
}

export const Flights : FC<FlightsProps> = ({isSupportWebp}) =>{
    return(
        <Fragment>
            <IntroFlights isSupportWebp={isSupportWebp} />
            <Map isSupportWebp={isSupportWebp} />
            <Travels />
            <Offer /> 
        </Fragment>
    )
}