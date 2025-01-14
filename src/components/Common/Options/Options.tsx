import React, { FC, useState, useRef } from "react";
import { OptionInput } from "./OptionInput.tsx";
import { OptionSelect } from "./OptionSelect.tsx";
import { iconPosition, iconValue, optionsContainer, optionsFlights, optionsHotels, optionType } from "../../../types.ts";
import { makePseudoActive, unMakePseudoActive} from "../../../helperFunctions.ts"

export const Options : FC = () => {
    const about : optionsContainer = {
        flights: {
            content: [
                {
                    type: optionType.INPUT, label: "From - To", value: "Lahore - Karachi", icon: null
                },
                {
                    type: optionType.SELECT, label: "Trip", value: { links: ["Return", "Depart"], startActive: 0 }, icon: null
                },
                {
                    type: optionType.INPUT, label: "Depart - Return", value: "07 Nov 22 - 13 Nov 22", icon: null
                },
                {
                    type: optionType.INPUT, label: "Passenger - Clas", value: "1 Passenger, Economy", icon: null
                },
            ],
            isFlight: true
        },
        hotels: {
            content: [
                {
                    type: optionType.INPUT, label: "Enter Destination", value: "Istanbul, Turkey", isBigger: true,
                    icon: {value: iconValue.BED, position: iconPosition.LEFT}
                },
                {
                    type: optionType.INPUT, label: "Check-in", value: "Fri 12/2", isBigger: false,
                    icon: {value: iconValue.DATE, position: iconPosition.RIGHT}
                },
                {
                    type: optionType.INPUT, label: "Check Out", value: "Sun 12/4", isBigger: false,
                    icon: {value: iconValue.DATE, position: iconPosition.RIGHT}
                },
                {
                    type: optionType.SELECT, label: "Rooms & Guests", 
                    value: { links: ["1 room, 2 guests", "2 room, 2 guests"], startActive: 0 }, 
                    icon: {value: iconValue.HUMAN, position: iconPosition.LEFT}, isBigger: false
                }
            ],
            isFlight: false
        }
    };
    let [optionsType, setOptionsType] = useState<optionsFlights | optionsHotels>(about.flights);
    
    const toggleOptionsType = (newAbout : optionsFlights | optionsHotels) => {
        setOptionsType(newAbout);
    }

    const headerElement = useRef<HTMLElement>(null);
    
    let inputId = 0;
    return(
        <article className="options container">
            <div className="options__inner">
                <ul className="options__header header-options" ref={headerElement}>
                    {[
                        { value: "Flights", icon: "icon-plane", info: about.flights }, 
                        { value: "Stays", icon: "icon-bed", info: about.hotels }
                    ].map((headerLink, i) => {
                        if(headerLink.info.isFlight === optionsType.isFlight){
                            return(
                                <li className="header-options__link" key={i}>
                                    <div className={headerLink.icon + " _active"} >
                                        <span>{headerLink.value}</span>
                                    </div>
                                </li>
                            )
                        }
                        return(
                            <li className="header-options__link" key={i}>
                                <button 
                                    className={headerLink.icon} type="button" 
                                    onClick={(e) => {toggleOptionsType(headerLink.info); unMakePseudoActive(e, headerElement)}}
                                    onMouseEnter={(e) => makePseudoActive(e, headerElement)} 
                                    onFocus={(e) => makePseudoActive(e, headerElement)}
                                    onMouseLeave={(e) => {
                                        if(e.target !== document.activeElement){
                                            unMakePseudoActive(e, headerElement);
                                        }
                                    }} onBlur={(e) => unMakePseudoActive(e, headerElement)}
                                >
                                    <span>{headerLink.value}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className="options__table">
                    {Array.from({length: Math.ceil(optionsType.content.length / 4)}).map((_, i) => {
                        return(
                            <div className="options__row" key={i}>
                                {optionsType.content.slice(i * 4, (i+1)*4).map((option, j) => {
                                    if(option.type === optionType.INPUT){
                                        inputId++;
                                        return(
                                            <OptionInput 
                                                key={j} id={inputId} placeholder={option.value} label={option.label} 
                                                icon={option.icon} 
                                                isBigger={!optionsType.isFlight && option.isBigger} isHotelPart={!optionsType.isFlight}  
                                            />
                                        )
                                    }
                                    return(
                                        <OptionSelect 
                                            key={j} label={option.label} links={option.value.links} 
                                            startActive={option.value.startActive}  icon={option.icon}
                                            isBigger={!optionsType.isFlight && option.isBigger} isHotelPart={!optionsType.isFlight}  
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="options__footer">
                    <button className="options__add-promo icon-plus" type="button"><span>Add Promo Code</span></button>
                    <a className="options__link icon-send" href="#"><span>Show Flights</span></a>
                </div>
            </div>
        </article>
    )
}