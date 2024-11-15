import React, { FC, Fragment, useRef, useState } from "react"; 
import { useTypedSelector } from "../../../useTypedSelector"; 
import { contentPart, optionsNeededBlocks, optionsFlightItems, optionsHotelsItems, optionType } from "../../../types"; 
import { OptionsHeader } from "./OptionsHeader"; 
import { OptionsInput } from "./OptionsInput"; 
import { OptionsSelect } from "./OptionsSelect"; 
 
interface OptionsProps{ 
    neededBlocks : optionsNeededBlocks, 
    startValue : contentPart 
} 
 
export const Options : FC<OptionsProps> = ({neededBlocks, startValue}) =>{ 
    const store = useTypedSelector(state => state.options); 
    let [choosedOption, setChoosedOption] = useState(startValue); 
    let choosedItems : optionsFlightItems | optionsHotelsItems =  
        (choosedOption === contentPart.Flights) ? store.inputs.flights : store.inputs.hotels; 
    let isFirst = useRef<boolean>(true); 
    let copyNeededBlocks = useRef<optionsNeededBlocks>(neededBlocks); 
 
    let parentClasses : string[] = []; 
    if(isFirst.current){ 
        isFirst.current = false; 
        switch(neededBlocks){ 
            case optionsNeededBlocks.FlightHeader: 
                parentClasses.push("intro_variants"); 
                parentClasses.push("intro-flights"); 
                if(store.header.flights === "" || store.inputs.flights.length === 0){ 
                    return <Fragment /> 
                } 
                break; 
            case optionsNeededBlocks.HotelHeader: 
                parentClasses.push("intro_variants"); 
                parentClasses.push("intro-hotels"); 
                if(store.header.hotels === "" || store.inputs.hotels.length === 0){ 
                    return <Fragment /> 
                } 
                break; 
            case optionsNeededBlocks.OnlyInputs: 
                parentClasses.push("configurate")
                if(startValue === contentPart.Flights){ 
                    parentClasses.push("flights"); 
                    if(store.header.flights === "" || store.inputs.flights.length === 0){ 
                        return <Fragment /> 
                    } 
                }else{ 
                    parentClasses.push("hotels"); 
                    if(store.header.hotels === "" || store.inputs.hotels.length === 0){ 
                        return <Fragment /> 
                    } 
                } 
                break; 
            case optionsNeededBlocks.BothHeaders: 
                parentClasses.push("intro-start"); 
                if(store.inputs.flights.length === 0){ 
                    if(store.header.hotels === "" || store.inputs.hotels.length === 0){ 
                        return <Fragment /> 
                    } 
                    copyNeededBlocks.current = optionsNeededBlocks.HotelHeader; 
                    setChoosedOption(contentPart.Hotels); 
                }else if(store.inputs.hotels.length === 0){ 
                    if(store.header.flights === ""){ 
                        return <Fragment /> 
                    } 
                    copyNeededBlocks.current = optionsNeededBlocks.FlightHeader; 
                    setChoosedOption(contentPart.Flights); 
                } 
                break; 
        } 
    } 
     
     
    let classes =  [ 
        ...parentClasses.map(cl => cl + "__options"), ...parentClasses.map(cl => "options-" + cl), "options", "container" 
    ] 
    if(neededBlocks === optionsNeededBlocks.OnlyInputs){ 
        classes.push("independent"); 
    } 
    if(copyNeededBlocks.current !== optionsNeededBlocks.BothHeaders && copyNeededBlocks.current !== optionsNeededBlocks.OnlyInputs){ 
        classes.push("header-text"); 
    } 
 
    let inputsCount : number = 0; 
    return( 
        <article className={classes.join(" ")}>
            <div className={parentClasses.map(cl => "options-" + cl + "__inner").join(" ") +  " options__inner"}>
                {(neededBlocks !== optionsNeededBlocks.OnlyInputs) ?
                    (copyNeededBlocks.current === optionsNeededBlocks.BothHeaders) ? 
                        <OptionsHeader value={store.header} activeLink={{value: choosedOption, set: setChoosedOption}}/> :
                        <div className={parentClasses.map(cl => "options-" + cl + "__header_text").join(" ") +  " options__header_text"}>
                            {(copyNeededBlocks.current === optionsNeededBlocks.FlightHeader) ? 
                                store.header.onlyFlights : store.header.onlyHotels
                            }
                        </div>
                    : <Fragment />
                }
                <div className={parentClasses.map(cl => "options-" + cl + "__rows").join(" ") +  " options__rows"}>
                    {new Array(Math.ceil(choosedItems.length / 4)).fill(0).map((_, i) => 
                        <ul className={parentClasses.map(cl => "options-" + cl + "__inputs").join(" ") +  " options__inputs"} key={i}>
                            {choosedItems.slice(i*4, Math.min((i+1) * 4, choosedItems.length)).map((input, j) => {
                                if(input.type === optionType.Input){
                                    return <OptionsInput 
                                        key={(i + 1) * j}
                                        id={++inputsCount}
                                        title={input.title} placeholder={input.value} iconPosition={input.iconPosition} 
                                        isBigger={choosedOption === contentPart.Hotels && store.inputs.hotels[j].isBigger} 
                                        parent={choosedOption} parentClasses={parentClasses.map(cl => "options-" + cl)}
                                    />
                                }
                                return <OptionsSelect 
                                    key={(i + 1) * j}
                                    title={input.title} about={input.value} parent={choosedOption}
                                    isBigger={choosedOption === contentPart.Hotels && store.inputs.hotels[j].isBigger}
                                    parentClasses={parentClasses.map(cl => "options-" + cl)}
                                />
                            })}
                            {neededBlocks === optionsNeededBlocks.OnlyInputs && (i === Math.ceil(choosedItems.length / 4) - 1) && <li className="options__find">
                                <button className="icon-search" type="button"></button>
                            </li>}
                        </ul>
                    )}
                </div>
                {copyNeededBlocks.current !== optionsNeededBlocks.OnlyInputs &&
                    <div className={parentClasses.map(cl => "options-" + cl + "__footer").join(" ") +  " options__footer"}>
                        <button 
                            className={
                                parentClasses.map(cl => "options-" + cl + "__promo").join(" ") + " " +
                                parentClasses.map(cl => "options-" + cl + "__button").join(" ") +
                                " options__promo options__button icon-plus"
                            } 
                            type="button"
                        >
                            <span>{store.footer.addPromoText}</span>
                        </button>
                        <button 
                            className={
                                parentClasses.map(cl => "options-" + cl + "__show").join(" ") + " " +
                                parentClasses.map(cl => "options-" + cl + "__button").join(" ") +
                                " options__show options__button button_question icon-send"
                            } 
                            type="button"
                        >
                        <span>
                            {(choosedOption === contentPart.Flights) ? store.footer.showText.flights : store.footer.showText.hotels}
                        </span>
                    </button>
                </div>
                }
            </div>
        </article>
    )
}