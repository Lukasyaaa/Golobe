import React, { FC } from "react";
import { useTypedSelector } from "../hooks/redux";
import { Travels } from "../components/Common/Travels/Travels";
import { Offer } from "../components/Common/Offer";
import { IntroVariant } from "../components/Common/IntroVariant";
import { optionsItemsType } from "../types";
import { Recent } from "../components/HotelsInfo/Recent";

interface HotelsProps{
    isSupportWebp : boolean
}

export const HotelsInfo : FC<HotelsProps> = ({isSupportWebp}) =>{
    const introStore = useTypedSelector(state => state.hotels.text.intro);
    const travelsStore = useTypedSelector(state => state.hotels.text.travels);
    const offerStore = useTypedSelector(state => state.hotels.text.offer);

    return(
        <main className="main">
            <IntroVariant isSupportWebp={isSupportWebp} introStore={introStore} optionsType={optionsItemsType.Hotels} />
            <Recent />
            <Travels travelsStore={travelsStore} />
            <Offer offerStore={offerStore} /> 
        </main>
    )
}