import React, { FC } from "react";
import { Options } from "./Options/Options";
import { introVariant, optionsBlockType, contentPart } from "../../types";

interface introFlightsProps{
    isSupportWebp : boolean
    introStore : introVariant,
    optionsType : contentPart
}

export const IntroVariant : FC<introFlightsProps> = ({isSupportWebp, introStore, optionsType}) =>{
    const pathToBackground = (isSupportWebp) ? introStore.background.webp : introStore.background.jpeg;
    const parentClass = (optionsType === contentPart.Flights) ? "intro_flights" : "intro_hotels";
    
    return(
        <section className={`${parentClass} intro_variant`}>
            <div className={`${parentClass}__back intro_variant__back`} style={{
                background: `url(${pathToBackground}) center no-repeat`,
                backgroundSize: "cover"
            }}>
                <div className="container">
                    <div className={`${parentClass}__info intro_variant__info`}>
                        <h1 className={`${parentClass}__heading intro_variant__heading`}>{introStore.heading}</h1>
                        <div className={`${parentClass}__subheading intro_variant__subheading`}>{introStore.subheading}</div>
                    </div>
                </div>
            </div>
            <Options 
                neededBlocks={(optionsType === contentPart.Flights) ? 
                    optionsBlockType.FLIGHTS_HEADER_TYPE : optionsBlockType.HOTELS_HEADER_TYPE
                } 
                startValue={optionsType} 
            />
        </section>
    )
}