import React, { FC, useRef } from "react";
import { contentPart, contentPartValues, setter } from "../../../types";
import { makePseudoActive, makeUnPseudoActive } from "../../../helperFunctions";

interface optionsHeaderProps{
    value : contentPartValues,
    activeLink : setter<contentPart>
}

export const OptionsHeader : FC<optionsHeaderProps> = ({value, activeLink}) =>{
    let list = useRef<HTMLUListElement>(null);

    if(activeLink.value === contentPart.Flights){
        return(
            <ul className="options-intro-start__header options__header header-options-intro-start header-options" ref={list}>
                <li 
                    className={[
                        "header-options__link", `header-options__link_flight`, 
                        "header-options-intro-start__link", `header-options-intro-start__link_flight`,
                        "_active"
                    ].join(" ")}
                >
                    <div 
                        className={[
                            "header-options__link-inner", "header-options__link_flight-inner", 
                            "header-options-intro-start__link-inner", "header-options-intro-start__link_flight-inner", "icon-plane"
                        ].join(" ")} 
                    >
                        <span>{value.flights}</span>
                    </div>
                </li>
                <li 
                    className={[
                        "header-options__link", `header-options__link_hotel`, 
                        "header-options-intro-start__link", `header-options-intro-start__link_hotel`
                    ].join(" ")}
                >
                    <button 
                        className={[
                            "header-options__link-inner", "header-options__link_hotel-inner", 
                            "header-options-intro-start__link-inner", "header-options-intro-start__link_hotel-inner", "icon-bed"
                        ].join(" ")}
                        type="button" onClick={() => activeLink.set(contentPart.Hotels)}
                        onFocus={(e) => makePseudoActive(e, list)} onMouseEnter={(e) => makePseudoActive(e, list)}
                        onBlur={(e) => makeUnPseudoActive(e, list)} 
                        onMouseLeave={(e) => {
                            if(e.target !== document.activeElement){
                                makeUnPseudoActive(e, list);
                            }
                        }}
                    >
                        <span>{value.hotels}</span>
                    </button>
                </li>
            </ul>
        )
    }
    return(
        <ul className="options-intro-start__header options__header header-options-intro-start header-options">
            <li 
                className={[
                    "header-options__link", `header-options__link_flight`, 
                    "header-options-intro-start__link", `header-options-intro-start__link_flight`,
                    "link-header-options", `link_flight-header-options`,
                    "link-header-options-intro-start", `link_flight-header-options-intro-start`
                ].join(" ")}
            >
                <button 
                    className={[
                        "link-header-options__inner", "link_flight-header-options__inner", 
                        "link-header-options-intro-start__inner", "link_flight-header-options-intro-start__inner", "icon-plane"
                    ].join(" ")} type="button" onClick={() => activeLink.set(contentPart.Flights)}
                    onFocus={(e) => makePseudoActive(e, list)} onMouseEnter={(e) => makePseudoActive(e, list)}
                    onBlur={(e) => makeUnPseudoActive(e, list)} 
                    onMouseLeave={(e) => {
                        if(e.target !== document.activeElement){
                            makeUnPseudoActive(e, list);
                        }
                    }}
                >
                    <span>{value.flights}</span>
                </button>
            </li>
            <li 
                className={[
                    "header-options__link", `header-options__link_hotel`, 
                    "header-options-intro-start__link", `header-options-intro-start__link_hotel`,
                    "link-header-options", `link_hotel-header-options`,
                    "link-header-options-intro-start", `link_hotel-header-options-intro-start`, "_active"
                ].join(" ")}
            >
                <div 
                    className={[
                        "link-header-options__inner", "link_hotel-header-options__inner", 
                        "link-header-options-intro-start__inner", "link_hotel-header-options-intro-start__inner", "icon-bed"
                    ].join(" ")}
                >
                    <span>{value.hotels}</span>
                </div>
            </li>
        </ul>
    )
}