import React, { FC } from "react";
import { Intro } from "../components/Start/Intro";
import { Travels } from "../components/Start/Travels/Travels";
import { Choose } from "../components/Start/Choose/Choose";
import { Reviews } from "../components/Start/Reviews/Reviews";
import { useTypedSelector } from "../useTypedSelector";

export const Home : FC = () =>{
    const userStore = useTypedSelector(state => state.user);
    console.log(userStore);

    return(
        <main className="home">
            <Intro />
            <Travels />
            <Choose />
            <Reviews />
        </main>
    )
}