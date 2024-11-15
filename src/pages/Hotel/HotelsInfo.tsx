import React, { FC } from "react";
import { IntroVariant } from "../../components/Common/InfoVariant/IntroVariants";
import { useTypedSelector } from "../../useTypedSelector";
import { contentPart } from "../../types";
import { Travels } from "../../components/Common/InfoVariant/Travels/Travels";
import { Offers } from "../../components/Common/InfoVariant/Offers/Offers";
import { Recentes } from "../../components/Hotels/Home/Recent/Recentes";

export const HotelsInfo : FC = () => {
    let state = useTypedSelector(state => state.hotels.home);

    return(
        <main className="hotels">
            <IntroVariant state={state.intro} contentType={contentPart.Hotels} />
            <Recentes />
            <Travels state={state.travels}/>
            <Offers state={state.offers} />
        </main>
    )
}