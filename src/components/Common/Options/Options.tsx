import React, { useState, forwardRef, ForwardRefRenderFunction, useRef, useEffect, MouseEvent, FocusEvent } from "react";
import { useLocation } from "react-router-dom";
import { OptionsInput } from "./OptionsInput";
import { OptionsSelect } from "./OptionsSelect";
import { useTypedSelector } from "../../../hooks/redux";
import { flightsOptionsItem, hotelsOptionsItem, optionsType } from "../../../types";
import { useDispatch } from "react-redux";
import { optionsReplaceActiveHeaderLinkAction } from "../../../store/start/optionsReducer";
import { flightsPath, hotelsPath } from "../../../App";

interface OptionsProps{

}

enum currentOptionsHeader{
    Both = 0,
    Flights = 1,
    Hotels = 2 
}

const Options : ForwardRefRenderFunction<HTMLDivElement, OptionsProps> = (props, ref) =>{
    const optionsStore = useTypedSelector(store => store.options);
    let [currentValueOptions, setCurrentValueOptions] = useState<optionsType>(optionsType.Flights);
    const neededMassive : flightsOptionsItem[] | hotelsOptionsItem[] = 
        (currentValueOptions === optionsType.Flights) ? optionsStore.flights : optionsStore.hotels;

    let location = useLocation();
    let [currentHeaderOptions, setCurrentHeaderOptions] = useState<currentOptionsHeader>(currentOptionsHeader.Both);
    let header = useRef<HTMLUListElement>(null);
    useEffect(() => {
        switch(location.pathname){
            case flightsPath:
                setCurrentHeaderOptions(currentOptionsHeader.Flights);
                break;
            case hotelsPath:
                setCurrentHeaderOptions(currentOptionsHeader.Flights);
                break;
            default:
                setCurrentHeaderOptions(currentOptionsHeader.Both);
                break;
        }
    }, [location.pathname])

    const dispatch = useDispatch();

    const makeActive = (e : MouseEvent<HTMLButtonElement>, id : number) : void =>{
        if(header.current){
            for(let i : number = 0; i < optionsStore.header.start.length; i++){
                if(optionsStore.header.start[i].isActive){
                    dispatch(optionsReplaceActiveHeaderLinkAction(i, id));
                    setCurrentValueOptions(id);
                }
            }
            header.current.classList.remove("_hide-active");
        }
    }

    const makePseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) : void =>{
        if(header.current){
            e.currentTarget.classList.add("_hover");
            header.current.classList.add("_hide-active");
        }
    }

    const makeUnPseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) : void =>{
        if(header.current){
            e.currentTarget.classList.remove("_hover");
            header.current.classList.remove("_hide-active");
        }
    }

    let classes : string[] = ["options", "container"];
    if(currentHeaderOptions === currentOptionsHeader.Both){
        classes.push("header-both");
    }

    return(
        <div className={classes.join(" ")}>
            <div className="options__inner">
                <div className="options__header header-options">
                    {(currentHeaderOptions === currentOptionsHeader.Both) 
                    ? <ul className="header-options__list" ref={header}>
                        {optionsStore.header.start.map((headerLink, index) => {
                            if(headerLink.isActive){
                                return <li className="header-options__link" key={index}>
                                    <div className={[headerLink.iconValue, "_active"].join(" ")}><span>{headerLink.value}</span></div>
                                </li>
                            }
                            return <li className="header-options__link" key={index}>
                                <button 
                                    className={headerLink.iconValue} 
                                    type="button"
                                    onMouseEnter={(e) => makePseudoActive(e)} onMouseLeave={(e) => {
                                        if(e.target !== document.activeElement){
                                            makeUnPseudoActive(e);
                                        }
                                    }}
                                    onClick={(e) => makeActive(e, index)}
                                    onFocus={(e) => makePseudoActive(e)} onBlur={(e) => makeUnPseudoActive(e)}
                                ><span>{headerLink.value}</span></button>
                            </li>
                        })}
                    </ul> 
                    : ((currentHeaderOptions === currentOptionsHeader.Flights) ? optionsStore.header.flights : optionsStore.header.hotels)}
                </div>
                <div className="options__inputs inputs-options" ref={ref}>
                    {neededMassive.map((optionsItem, optionIndex) => ((typeof optionsItem.value === "string") ?
                    <OptionsInput 
                        key={optionIndex} 
                        title={optionsItem.title} 
                        iconValue={optionsItem.iconValue} iconPosition={optionsItem.iconPosition}
                        parentType={currentValueOptions}
                        isBigger={(currentValueOptions === optionsType.Hotels) ? optionsStore.hotels[optionIndex].isBigger : false}
                        value={optionsItem.value}
                    /> :               
                    <OptionsSelect
                        key={optionIndex} 
                        id={optionIndex}
                        title={optionsItem.title} 
                        iconValue={optionsItem.iconValue} iconPosition={optionsItem.iconPosition}
                        parentType={currentValueOptions}
                        isBigger={(currentValueOptions === optionsType.Hotels) ? optionsStore.hotels[optionIndex].isBigger : false}
                        links={optionsItem.value}
                        isActive={(typeof optionsItem.isActive === "boolean") ? optionsItem.isActive : false}
                    />))}
                </div>
                <div className="options__footer footer-options">
                    <button className="footer-options__item footer-options__promo _icon-plus" type="button"><span>Add Promo Code</span></button>
                    <button className="footer-options__item footer-options__submit _icon-send" type="submit">
                        <span>Show {(currentValueOptions === optionsType.Flights) ? "Flights" : "Hotels"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default forwardRef<HTMLDivElement, OptionsProps>(Options);