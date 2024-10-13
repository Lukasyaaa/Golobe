import React, { FC } from "react";
import { contentPart, introVariant, optionsNeededBlocks } from "../../../types";
import { Options } from "../Options/Options";

interface introVariantProps{
    contentType : contentPart,
    state : introVariant
}

export const IntroVariant : FC<introVariantProps> = ({contentType, state}) => {
    let ourParent = (contentType === contentPart.Flights) ? "flights" : "hotels";

    let isWebp = true;
    let pathToBackground = (isWebp) ? state.background.webp : state.background.jpeg;
    return(
        <section className={ourParent + "__intro intro-" + ourParent + " intro_variants"}>
            <div 
                className={"intro-" + ourParent + "__back intro_variants__back"} style={{
                    backgroundImage: `url(` + pathToBackground + `)`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
                }}
            >
                <div className="container_intro-variant">
                    <div className={"intro-" + ourParent + "__info intro_variants__info"}>
                        <h1 className={"intro-" + ourParent + "__heading intro_variants__heading"}>
                            {state.heading}    
                        </h1>
                        <div className={"intro-" + ourParent + "__subheading intro_variants__subheading"}>
                            {state.subheading}
                        </div>
                    </div>
                </div>
            </div>
            <Options 
                startValue={contentType} 
                neededBlocks={(contentType === contentPart.Flights) ? optionsNeededBlocks.FlightHeader : optionsNeededBlocks.HotelHeader} 
            />
        </section>
    )
}