import React, { FC } from "react";
import { Intro } from "../components/Start/Intro";
import { Travels } from "../components/Start/Travels/Travels";
import { Choose } from "../components/Start/Choose/Choose";
import { Reviews } from "../components/Start/Reviews/Reviews";

export const Home : FC = () =>{
    return(
        <main className="home">
            <Intro />
            <Travels />
            <Choose />
            <Reviews />
        </main>
    )
}