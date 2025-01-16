import React, { FC } from "react";
import { Intro } from "../components/Start/Intro.tsx";
import { Options } from "../components/Common/Options/Options.tsx";
import { Trips } from "../components/Start/Trips/Trips.tsx";
import { Choose } from "../components/Start/Choose/Choose.tsx";
import { Reviews } from "../components/Start/Reviews/Reviews.tsx";

interface startProps{
    isWebp : boolean
}

export const Start : FC<startProps> = ({isWebp}) => {
    return(
        <main className="main">
            <Intro />
            <Options />
            <Trips />
            <Choose isWebp={isWebp} />
            <Reviews />
        </main>
    )
}