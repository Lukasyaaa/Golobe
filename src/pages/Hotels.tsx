import React, { type FC } from "react";
import { IntroVariants } from "../components/Common/IntroVariants";
import { Offers } from "../components/Common/Offers/Offers";
import { useTypedSelector } from "../store";
import { SITE_PARTS } from "../types";
import { Travels } from "../components/Common/Travels/Travels";
import { Recent } from "../components/Hotels/Home/Recent";

export const Hotels : FC = () =>{
    const about = useTypedSelector(state => state.hotels.start);

    return(
        <main className="hotels">
            <IntroVariants about={about.intro} type={SITE_PARTS.stays} />
            <Recent />
            <Travels {...about.travels} />
            <Offers {...about.offers} />
        </main>
    )
}