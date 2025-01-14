import React, { FC, Fragment } from "react";
import { Options } from "../Common/Options.tsx";

export const Intro : FC = () => {
    return(
        <section className="intro intro_start">
            <div className="container container_header">
                <div className="intro_start__supheading">Helping Others</div>
                <h1 className="intro_start__heading">Live & Travel</h1>
                <div className="intro_start__subheading">Special offers to suit your plan</div>
            </div>
        </section>
    )
}