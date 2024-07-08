import React, { FC } from "react";
import Options from "../Common/Options/Options";
import { useTypedSelector } from "../../hooks/redux";
import { introStart } from "../../types";

interface IntroMainProps{
    isSupportWebp : boolean
}

export const IntroMain : FC<IntroMainProps> = ({isSupportWebp}) =>{
    const introStore = useTypedSelector<introStart>(store => store.start.intro);
    const pathToBackground = (isSupportWebp) ? introStore.background.webp : introStore.background.jpeg;

    return(
        <section className="intro">
            <div className="container" style={{background: `url(${pathToBackground}) center no-repeat`, backgroundSize: "cover"}}>
                <div className="intro__subheading">{introStore.supheading}</div>
                <h1 className="intro__heading">{introStore.heading}</h1>
                <div className="intro__supheading">{introStore.subheading}</div>
            </div>
            <Options />
        </section>
    );
}