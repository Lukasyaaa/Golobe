import React, { FC, Fragment } from "react";
import { useTypedSelector } from "../../useTypedSelector";
import { Options } from "../Common/Options/Options";
import { contentPart, optionsNeededBlocks } from "../../types";

export const Intro : FC = () =>{
    const state = useTypedSelector(store => store.start.intro);

    let isWebp = true;
    let pathToBackground = (isWebp) ? state.background.webp : state.background.jpeg;
    if(state.heading !== "" && state.subheading !== "" && state.supheading !== "" && (state.background.jpeg !== "" || (isWebp && state.background.webp !== ""))){
        return(
            <section className="start__intro intro-start">
                <div 
                    className="container_intro" style={{
                        backgroundImage: `url(` + pathToBackground + `)`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="container_header">
                        <div className="intro-start__supheading">{state.supheading}</div>
                        <h1 className="intro-start__heading">{state.heading}</h1>
                        <div className="intro-start__subheading">{state.subheading}</div>
                    </div>
                </div>
                <Options neededBlocks={optionsNeededBlocks.BothHeaders} startValue={contentPart.Flights} />
            </section>
        )
    }
    return <Fragment />
}