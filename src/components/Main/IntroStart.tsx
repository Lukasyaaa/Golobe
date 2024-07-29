import React, { FC } from "react";
import { Options } from "../Common/Options/Options";
import { useTypedSelector } from "../../hooks/redux";
import { introStart, optionsBlockType, optionsItemsType } from "../../types";

interface IntroStartProps{
    isSupportWebp : boolean
}

export const IntroStart : FC<IntroStartProps> = ({isSupportWebp}) =>{
    const introStore = useTypedSelector<introStart>(store => store.start.intro);
    const pathToBackground = (isSupportWebp) ? introStore.background.webp : introStore.background.jpeg;

    return(
        <section className="intro">
            <div className="container" style={{background: `url(${pathToBackground}) center no-repeat`, backgroundSize: "cover"}}>
                <div className="intro__subheading">{introStore.supheading}</div>
                <h1 className="intro__heading">{introStore.heading}</h1>
                <div className="intro__supheading">{introStore.subheading}</div>
            </div>
            <Options neededBlocks={optionsBlockType.BOTH_HEADER_TYPES} startValue={optionsItemsType.Flights} />
        </section>
    );
}