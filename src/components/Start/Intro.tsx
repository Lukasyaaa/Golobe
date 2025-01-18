import React, { FC, Fragment } from "react";
import { useTypedSelector } from "../../helperFunctions.ts";

interface IntroProps{
    isWebp : boolean
}

export const Intro : FC<IntroProps> = ({isWebp}) => {
    const about = useTypedSelector(state => state.start.intro);
    const pathToBackground = (isWebp) ? about.background.webp : about.background.jpeg;

    return(
        <section className="intro intro_start" style={{backgroundImage: `url("${pathToBackground}")`}}>
            <div className="container container_header">
                <div className="intro_start__supheading">{about.supheading}</div>
                <h1 className="intro_start__heading">{about.heading}</h1>
                <div className="intro_start__subheading">{about.subheading}</div>
            </div>
        </section>
    )
}