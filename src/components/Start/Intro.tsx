import React, { FC, Fragment } from "react";
import { useTypedSelector } from "../../useTypedSelector";
import { Options } from "../Common/Options/Options";
import { contentPart, optionsNeededBlocks } from "../../types";

export const Intro : FC = () =>{
    const store = useTypedSelector(state => state.start.intro);

    let isWebp = true;
    let pathToBackground = (isWebp) ? store.background.webp : store.background.jpeg;
    if(store.heading !== "" && store.subheading !== "" && store.supheading !== "" && (store.background.jpeg !== "" || (isWebp && store.background.webp !== ""))){
        return(
            <section className="start__intro intro-start">
                <div 
                    className="container_intro" style={{
                        backgroundImage: `url(` + pathToBackground + `)`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="container_header">
                        <div className="intro-start__supheading">{store.supheading}</div>
                        <h1 className="intro-start__heading">{store.heading}</h1>
                        <div className="intro-start__subheading">{store.subheading}</div>
                    </div>
                </div>
                <Options neededBlocks={optionsNeededBlocks.BothHeaders} startValue={contentPart.Flights} />
            </section>
        )
    }
    return <Fragment />
}