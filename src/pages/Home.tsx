import React, { type FC } from "react";
import { IntroHome } from "../components/Home/IntroHome";
import { Trips } from "../components/Home/Trips/Trips";
import { Choose } from "../components/Home/Choose/Choose";
import { Reviews } from "../components/Home/Reviews/Reviews.tsx";

export const Home : FC = () => {
    return(
        <main className="home">
            <IntroHome />
            <Trips />
            <Choose />
            <Reviews />
        </main>
    )
}