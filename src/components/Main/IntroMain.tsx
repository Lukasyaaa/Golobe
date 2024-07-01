import React, { FC } from "react";
import Options from "../Common/Options/Options";
import { useTypedSelector } from "../../hooks/redux";
import { introStart } from "../../types";

interface IntroMainProps{

}

export const IntroMain : FC<IntroMainProps> = () =>{
    const intro = useTypedSelector<introStart>(store => store.another.intro.start);

    return(
        <section className="intro">
            <div className="container">
                <div className="intro__subheading">{intro.supheading}</div>
                <h1 className="intro__heading">{intro.heading}</h1>
                <div className="intro__supheading">{intro.subheading}</div>
            </div>
            <Options />
        </section>
    );
}