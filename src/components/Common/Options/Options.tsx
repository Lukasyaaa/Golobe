import React, { FC, Fragment, useRef, useState } from "react";
import { useTypedSelector } from "../../../useTypedSelector";
import { contentPart, optionsNeededBlocks, optionsFlightItems, optionsHotelsItems, optionType } from "../../../types";
import { OptionsHeader } from "./OptionsHeader";
import { OptionsInput } from "./OptionsInput";
import { OptionsSelect } from "./OptionsSelect";

interface optionsProps{
    neededBlocks : optionsNeededBlocks,
    startValue : contentPart
}

export const Options : FC<optionsProps> = ({neededBlocks, startValue}) =>{
    const state = useTypedSelector(store => store.options);
    let [choosedOptions, setChoosedOptions] = useState(startValue);
    let choosedItems : optionsFlightItems | optionsHotelsItems = 
        (choosedOptions === contentPart.Flights) ? state.inputs.flights : state.inputs.hotels;
    let isFirst = useRef<boolean>(true);
    let copyNeededBlocks = useRef<optionsNeededBlocks>(neededBlocks);

    if(isFirst.current){
        isFirst.current = false;
        switch(neededBlocks){
            case optionsNeededBlocks.FlightHeader:
                if(state.header.flights === "" || state.inputs.flights.length === 0){
                    return <Fragment />
                }
                break;
            case optionsNeededBlocks.HotelHeader:
                if(state.header.hotels === "" || state.inputs.hotels.length === 0){
                    return <Fragment />
                }
                break;
            case optionsNeededBlocks.OnlyInputs:
                if(startValue === contentPart.Flights){
                    if(state.header.flights === "" || state.inputs.flights.length === 0){
                        return <Fragment />
                    }
                }else{
                    if(state.header.hotels === "" || state.inputs.hotels.length === 0){
                        return <Fragment />
                    }
                }
                break;
            case optionsNeededBlocks.BothHeaders:
                if(state.inputs.flights.length === 0){
                    if(state.header.hotels === "" || state.inputs.hotels.length === 0){
                        return <Fragment />
                    }
                    copyNeededBlocks.current = optionsNeededBlocks.HotelHeader;
                    setChoosedOptions(contentPart.Hotels);
                }else if(state.inputs.hotels.length === 0){
                    if(state.header.flights === ""){
                        return <Fragment />
                    }
                    copyNeededBlocks.current = optionsNeededBlocks.FlightHeader;
                    setChoosedOptions(contentPart.Flights);
                }
                break;
        }
    }
    
    let classes = ["intro-start__options", "options-intro-start", "intro__options options", "container"]
    if(copyNeededBlocks.current !== optionsNeededBlocks.BothHeaders){
        classes.push("header-text");
    }
    return(
        <article className={classes.join(" ")}>
            <div className="options-intro-start__inner options__inner">
                {(copyNeededBlocks.current === optionsNeededBlocks.BothHeaders) ? 
                    <OptionsHeader value={state.header} activeLink={{value: choosedOptions, set: setChoosedOptions}}/> :
                    <div className="options-intro-start__header_text options__header_text">
                        {(copyNeededBlocks.current === optionsNeededBlocks.FlightHeader) ? state.header.flights : state.header.hotels}
                    </div>
                }
                <div className="options-intro-start__rows options__rows">
                    {new Array(Math.ceil(choosedItems.length / 4)).fill(0).map((_, i) => 
                        <ul className="options__inputs" key={i}>
                            {choosedItems.slice(i*4, Math.min((i+1) * 4, choosedItems.length)).map((input, j) => {
                                if(input.type === optionType.Input){
                                    return <OptionsInput 
                                        key={(i + 1) * j}
                                        title={input.title} placeholder={input.value} iconPosition={input.iconPosition} 
                                        isBigger={choosedOptions === contentPart.Hotels && state.inputs.hotels[j].isBigger} 
                                        parent={choosedOptions}
                                    />
                                }
                                return <OptionsSelect 
                                    key={(i + 1) * j}
                                    title={input.title} links={input.value} parent={choosedOptions}
                                    isBigger={choosedOptions === contentPart.Hotels && state.inputs.hotels[j].isBigger}
                                />
                            })}
                        </ul>
                    )}
                </div>
                {copyNeededBlocks.current !== optionsNeededBlocks.OnlyInputs &&
                    <div className="options-intro-start__footer options__footer">
                        <button 
                            className="options-intro-start__promo options-intro-start__button options__promo options__button icon-plus" 
                            type="button"
                        >
                            <span>{state.footer.addPromoText}</span>
                        </button>
                        <button 
                            className="options-intro-start__show options-intro-start__button options__show options__button button_question icon-send" 
                            type="button"
                        >
                            <span>
                                {(choosedOptions === contentPart.Flights) ? state.footer.showText.flights : state.footer.showText.hotels}
                            </span>
                        </button>
                    </div>
                }
            </div>
        </article>
    )
}