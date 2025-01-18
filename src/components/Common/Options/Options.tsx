import React, { FC, useState, useRef, MouseEvent } from "react";
import { OptionInput } from "./OptionInput.tsx";
import { OptionSelect } from "./OptionSelect.tsx";
import { OptionsAdvancedItems, OptionsItems, OptionType } from "../../../types.ts";
import { makePseudoActive, unMakePseudoActive, useTypedSelector} from "../../../helperFunctions.ts"

interface OptionsFlights{
    content : OptionsItems,
    isFlight: true
}
interface OptionsHotels{
    content : OptionsAdvancedItems,
    isFlight: false
}

export const Options : FC = () => {
    const about = useTypedSelector(state => state.options);
    let [optionsType, setOptionsType] = useState<OptionsFlights | OptionsHotels>(
        { content: about.flights, isFlight: true}
    );

    const toggleOptionsType = (e : MouseEvent<HTMLButtonElement>, newType : boolean) => {
        e.stopPropagation();
        if(newType === true){
            setOptionsType( {content: about.flights, isFlight: true} );
        } else {
            setOptionsType( {content: about.hotels, isFlight: false} );
        }
    }


    const headerElement = useRef<HTMLUListElement>(null);
    
    let inputId = 0;
    return(
        <article className="options container">
            <div className="options__inner">
                <ul className="options__header header-options" ref={headerElement}>
                    {[
                        { value: about.header.flights, icon: "icon-plane", isFlight: true }, 
                        { value: about.header.hotels, icon: "icon-bed", isFlight: false }
                    ].map((headerLink, i) => {
                        if(headerLink.isFlight === optionsType.isFlight){
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
                                    onClick={(e) => {
                                        toggleOptionsType(e, headerLink.isFlight); 
                                        unMakePseudoActive(e, headerElement);
                                    }}
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
                                    if(option.type === OptionType.INPUT){
                                        inputId++;
                                        return(
                                            <OptionInput 
                                                key={j} id={inputId} placeholder={option.value} label={option.label} 
                                                icon={option.icon} 
                                                isBigger={!optionsType.isFlight && about.hotels[j].isBigger} isHotelPart={!optionsType.isFlight}  
                                            />
                                        )
                                    }
                                    return(
                                        <OptionSelect 
                                            key={j} label={option.label} links={option.value.links} 
                                            startActive={option.value.startActive}  icon={option.icon}
                                            isBigger={!optionsType.isFlight && about.hotels[j].isBigger} isHotelPart={!optionsType.isFlight}  
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="options__footer">
                    <button className="options__add-promo icon-plus" type="button"><span>{about.addPromo}</span></button>
                    <a className="options__link icon-send" href="#">
                        <span>{(optionsType.isFlight) ? about.link.flights : about.link.hotels}</span>
                    </a>
                </div>
            </div>
        </article>
    )
}