import React, { FC, useState } from "react";
import { IntroVariant } from "../components/Common/InfoVariant/IntroVariants";
import { Map } from "../components/Flights/Home/Map/Map";
import { useTypedSelector } from "../useTypedSelector";
import { contentPart } from "../types";
import { Travels } from "../components/Common/InfoVariant/Travels/Travels";
import { Offers } from "../components/Common/InfoVariant/Offers/Offers";

export const FlightsInfo : FC = () =>{
    const state = useTypedSelector(store => store.flights.home)

    return(
        <main className="flights">
            <IntroVariant state={state.intro} contentType={contentPart.Flights}  />
            <Map />
            <Travels state={state.travels} />
            <Offers state={state.offers} />
        </main>
    )
}