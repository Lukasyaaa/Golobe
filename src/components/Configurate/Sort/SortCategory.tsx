import React, { FC, forwardRef, MouseEvent } from "react";
import { contentPart, sortFlightsCategory, sortHotelsCategory } from "../../../types";
import { useDispatch } from "react-redux";
import { sortSetActiveAction } from "../../../store/configurate/sortReducer";
import { makePseudoActive, makeUnPseudoActive } from "../../../helperFunctions";

interface sortCategoryFlightsProps{
    contentType : contentPart.Flights,
    value : sortFlightsCategory,
    id : number,
    isActive : boolean,
    containerRef : React.RefObject<HTMLDivElement>
}

interface sortCategoryHotelsProps{
    contentType : contentPart.Hotels,
    value : sortHotelsCategory,
    id : number,
    isActive : boolean,
    containerRef : React.RefObject<HTMLDivElement>
}

export const SortCategory = forwardRef<HTMLDivElement, sortCategoryFlightsProps | sortCategoryHotelsProps>(({contentType, value, id, isActive, containerRef}, ref) => {
    const dispatch = useDispatch();

    const setActive = (e : MouseEvent<HTMLButtonElement>) => {
        dispatch(sortSetActiveAction(contentType, id));
        makeUnPseudoActive(e, containerRef)
    }

    if(contentType === contentPart.Flights){
        let daysPart = (value.subtitle.flyTime / 1440 >= 1) ? Math.floor(value.subtitle.flyTime / 1440) + "d" : "";
        let hoursPart = Math.floor(value.subtitle.flyTime / 60 % 24) + "h";
        let minutesPart = value.subtitle.flyTime % 60 + "m"
        if(isActive){
            return(
                <div className="sort-flights__item item-sort-flights sort__item item-sort _active">
                    <h3 className="item-sort-flights__title item-sort__title">{value.title}</h3>
                    <div className="item-sort-flights__subtitle item-sort__subtitle">
                        {`$${value.subtitle.price} . ${daysPart} ${hoursPart} ${minutesPart}`}
                    </div>
                </div>  
            )
        }
        return(
            <button 
                className="sort-flights__item item-sort-flights sort__item item-sort" type="button"
                onClick={setActive} 
                onFocus={(e) => makePseudoActive(e, containerRef)} onBlur={(e) => makeUnPseudoActive(e, containerRef)}
                onMouseEnter={(e) => makePseudoActive(e, containerRef)} onMouseLeave={(e) => {
                    if(e.target !== document.activeElement){
                        makeUnPseudoActive(e, containerRef);
                    }
                }}
            >
                <h3 className="item-sort-flights__title item-sort__title">{value.title}</h3>
                <div className="item-sort-flights__subtitle item-sort__subtitle">
                    {`$${value.subtitle.price} . ${daysPart} ${hoursPart} ${minutesPart}`}
                </div>
            </button>
        )
    }
    if(isActive){
        return(
            <div className="sort-hotels__item item-sort-hotels sort__item item-sort _active">
                <h3 className="item-sort-hotels__title item-sort__title">{value.title}</h3>
                <div className="item-sort-hotels__subtitle item-sort__subtitle">
                    {value.subtitle + " places"}
                </div>
            </div>
        )
    }
    return(
        <button 
            className="sort-hotels__item item-sort-hotels sort__item item-sort" type="button"
            onClick={setActive} 
            onFocus={(e) => makePseudoActive(e, containerRef)} onBlur={(e) => makeUnPseudoActive(e, containerRef)}
            onMouseEnter={(e) => makePseudoActive(e, containerRef)} onMouseLeave={(e) => {
                if(e.target !== document.activeElement){
                    makeUnPseudoActive(e, containerRef);
                }
            }}
        >
            <h3 className="item-sort-hotels__title item-sort__title">{value.title}</h3>
            <div className="item-sort-hotels__subtitle item-sort__subtitle">
                {value.subtitle + " places"}
            </div>
        </button>
    )
})