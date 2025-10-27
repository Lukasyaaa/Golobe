import React, { type FC } from "react";
import { NEEDED_BLOCKS, SITE_PARTS, type IntroVariants as IntroVariantsType, type objType } from "../../types";
import { Options } from "../Options/Options";

interface IntroVariantsProps{
    type: objType<typeof SITE_PARTS>,
    about: IntroVariantsType
}

export const IntroVariants : FC<IntroVariantsProps> = ({type, about}) => {
    const parentCl = (type === SITE_PARTS.flights) ? "flights" : "stays"
    return(
        <section className={["intro_" + parentCl, "intro-variants"].join(" ")}>
            <div 
                className={["intro_" + parentCl + "__back", "intro-variants__back"].join(" ")}
                style={{
                    background: `url(${about.background.jpeg})`,
                    backgroundRepeat: "no-repeat", backgroundSize: "cover"
                }}
            >
                <div className="container">
                    <h1 className={["intro_" + parentCl + "__heading", "intro-variants__heading"].join(" ")}>
                        {about.heading}
                    </h1>
                    <div className={["intro_" + parentCl + "__subheading", "intro-variants__subheading"].join(" ")}>
                        {about.subheading}
                    </div>
                </div>
            </div>
            <Options neededBlocks={NEEDED_BLOCKS.withoutHeader} value={type} />
        </section>
    )
}