import React from "react";
import "./scss/style.scss";
import { Header } from "./components/Common/Header.tsx";
import { Intro } from "./components/Start/Intro.tsx";
import { Options } from "./components/Common/Options/Options.tsx";
import { Trips } from "./components/Start/Trips/Trips.tsx";

export const App = () => {
    const closeInteraction = () => {

    }

    return(
        <div className="wrapper" onClick={closeInteraction}>
            <Header />
            <Intro />
            <Options />
            <Trips />
        </div>
    )
}