import React, { type FC } from "react";
import { Options } from "../Options/Options";
import { NEEDED_BLOCKS, SITE_PARTS } from "../../types";
import { useTypedSelector } from "../../store";

export const IntroHome : FC = () => {
    const about = useTypedSelector(state => state.home.intro);
    let isWebp = false;

    let {jpeg, webp} = about.background;
    return(
        <section className="intro">
            <div 
                className="intro__inner" 
                style={{
                    background: `url(${isWebp ? webp : jpeg})`,
                    backgroundSize: "cover", backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
            >
                <div className="container">
                    <div className="intro__supheading">{about.supheading}</div>
                    <h1 className="intro__heading">{about.heading}</h1>
                    <div className="intro__subheading">{about.subheading}</div>
                </div>
            </div>
            <Options value={SITE_PARTS.flights} neededBlocks={NEEDED_BLOCKS.all} />
        </section>
    )
}