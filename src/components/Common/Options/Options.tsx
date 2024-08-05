import React, {FC, useState, useRef, MouseEvent, FocusEvent } from "react";
import { useDispatch } from "react-redux";
import { OptionsInput } from "./OptionsInput";
import { OptionsSelect } from "./OptionsSelect";

import { useTypedSelector } from "../../../hooks/redux";
import { optionsFlightsItem, optionsHotelsItem, optionsBlockType, contentPart } from "../../../types";
import { optionsSetActiveHeaderLinkAction } from "../../../store/common/optionsReducer";


interface OptionsProps{
    neededBlocks : optionsBlockType,
    startValue : contentPart,
}

export const Options : FC<OptionsProps> = ({neededBlocks, startValue}) =>{
    const optionsStore = useTypedSelector(store => store.options);
    let [currentTypeOptions, setCurrentTypeOptions] = useState<contentPart>(startValue);
    let neededMassive : optionsFlightsItem[] | optionsHotelsItem[] = 
        (currentTypeOptions === contentPart.Flights) ? optionsStore.flights : optionsStore.hotels;

    let header = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const makeActive = (id : number) : void =>{
        if(header.current){
            dispatch(optionsSetActiveHeaderLinkAction(id));
            switch(id){
                case 0:
                    setCurrentTypeOptions(contentPart.Flights);
                    break;
                default:
                    setCurrentTypeOptions(contentPart.Hotels);
                    break;
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
    if(neededBlocks === optionsBlockType.BOTH_HEADER_TYPES){
        classes.push("header-both");
    }else if(neededBlocks === optionsBlockType.ONLY_ITEMS){
        classes.push("independet");
    }

    return(
        <div className={classes.join(" ")}>
            <div className="options__inner">
                {neededBlocks !== optionsBlockType.ONLY_ITEMS && 
                <div className="options__header header-options">
                    {(neededBlocks === optionsBlockType.BOTH_HEADER_TYPES) 
                    ? <ul className="header-options__list" ref={header}>
                        {optionsStore.header.start.items.map((headerLink, index) => {
                            if(optionsStore.header.start.activeItem === index){
                                return <li className="header-options__link" key={index}>
                                    <div className={[headerLink.iconValue, "_active"].join(" ")}>
                                        <span>{headerLink.value}</span>
                                    </div>
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
                                    onClick={(e) => {e.stopPropagation(); makeActive(index)}}
                                    onFocus={(e) => makePseudoActive(e)} onBlur={(e) => makeUnPseudoActive(e)}
                                ><span>{headerLink.value}</span></button>
                            </li>
                        })}
                    </ul> 
                    : ((neededBlocks === optionsBlockType.FLIGHTS_HEADER_TYPE) ? 
                    optionsStore.header.flights : optionsStore.header.hotels)}
                </div>
                }
                <div className="options__inputs inputs-options">
                    {neededMassive.map((optionsItem, optionIndex) => ((typeof optionsItem.value === "string") ?
                    <OptionsInput 
                        key={optionIndex} 
                        title={optionsItem.title} 
                        iconValue={optionsItem.iconValue} iconPosition={optionsItem.iconPosition}
                        parentType={currentTypeOptions}
                        isBigger={
                            (currentTypeOptions === contentPart.Hotels) ? optionsStore.hotels[optionIndex].isBigger : false
                        }
                        value={optionsItem.value}
                    /> :               
                    <OptionsSelect
                        key={optionIndex} 
                        id={optionIndex}
                        title={optionsItem.title} 
                        iconValue={optionsItem.iconValue} iconPosition={optionsItem.iconPosition}
                        parentType={currentTypeOptions}
                        isBigger={
                            (currentTypeOptions === contentPart.Hotels) ? optionsStore.hotels[optionIndex].isBigger : false
                        }
                        links={optionsItem.value.items}
                        activeLink={optionsItem.value.activeItem}
                        isActive={(typeof optionsItem.isActive === "boolean") ? optionsItem.isActive : false}
                    />))}
                    {neededBlocks === optionsBlockType.ONLY_ITEMS && 
                        <div className="inputs-options__find">
                            <button type="button" className="_icon-search" onClick={(e) => e.stopPropagation()}></button>
                        </div>}
                </div>
                {neededBlocks !== optionsBlockType.ONLY_ITEMS &&
                <div className="options__footer footer-options">
                    <button className="footer-options__item footer-options__promo _icon-plus" type="button" onClick={(e) => e.stopPropagation()}>
                        <span>{optionsStore.footer.promoButtonText}</span>
                    </button>
                    <button 
                        className={["footer-options__item", 
                            "footer-options__submit", 
                            (currentTypeOptions === contentPart.Flights) ? "_icon-send" : "_icon-appartment"].join(" ")} 
                        type="submit" onClick={(e) => e.stopPropagation()}>
                        <span>{(currentTypeOptions === contentPart.Flights) ? 
                            optionsStore.footer.sendButtonText.flights : optionsStore.footer.sendButtonText.hotels}
                        </span>
                    </button>
                </div>
                }
            </div>
        </div>
    )
}