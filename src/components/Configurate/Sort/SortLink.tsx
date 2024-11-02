import React, { FC, forwardRef } from "react";
import { contentPart, setter, sortFlightsCategory, sortHotelsCategory } from "../../../types";
import { useDispatch } from "react-redux";
import { sortReplaceAction } from "../../../store/configurate/sortReducer";
import { makeActiveState, makePseudoActive, makeUnActiveState, makeUnPseudoActive } from "../../../helperFunctions";

interface sortFlightsLinkProps{
    contentType : contentPart.Flights,
    value : sortFlightsCategory,
    id : number,
    isActive : setter<boolean>,
    selectInner : React.RefObject<HTMLUListElement>,
    isLast : boolean
}

interface sortHotelsLinkProps{
    contentType : contentPart.Hotels,
    value : sortHotelsCategory,
    id : number,
    isActive : setter<boolean>,
    selectInner : React.RefObject<HTMLUListElement>,
    isLast : boolean
}

export const SortLink = forwardRef<HTMLUListElement, sortFlightsLinkProps | sortHotelsLinkProps>(({contentType, value, id, isActive, selectInner, isLast}, ref) => {
    const dispatch = useDispatch();
    const replaceSortCategories = () => {
        dispatch(sortReplaceAction(contentType, id))
    }

    if(contentType === contentPart.Hotels){
        return(
            <li className="select-sort__link link-select-sort select-sort-hotels__link link-select-sort-hotels select__link">
                <button 
                    className="link-select-sort__inner link-select-sort-hotels__inner select__link-inner" type="button"
                    onClick={replaceSortCategories}
                    onFocus={(e) => {
                        if(id === 0){
                            makeActiveState(isActive);
                        }
                        makePseudoActive(e, selectInner);
                    }} 
                    onMouseEnter={(e) => makePseudoActive(e, selectInner)}
                    onBlur={(e) => {
                        if(isLast){
                            makeUnActiveState(isActive)
                        }
                        makeUnPseudoActive(e, selectInner);
                    }} 
                    onMouseLeave={(e) => {
                        if(e.target !== document.activeElement){
                            makeUnPseudoActive(e, selectInner);
                        }
                    }}
                >
                    <h3 className="link-select-sort__title link-select-sort-hotels__title"></h3>
                    <div className="link-select-sort__subtitle link-select-sort-hotels__subtitle">
                        {value.subtitle + " places"}
                    </div>
                </button>
            </li>
        )
    }

    let daysPart = (value.subtitle.flyTime / 1440 >= 1) ? Math.floor(value.subtitle.flyTime / 1440) + "d" : "";
    let hoursPart = Math.floor(value.subtitle.flyTime / 60 % 24) + "h";
    let minutesPart = value.subtitle.flyTime % 60 + "m"
    return(
        <li className="select-sort__link link-select-sort select-sort-flights__link link-select-sort-flights select__link">
            <button 
                className="link-select-sort__inner link-select-sort-flights__inner select__link-inner" type="button"
                onClick={replaceSortCategories}
                onFocus={(e) => {
                    if(id === 0){
                        makeActiveState(isActive);
                    }
                    makePseudoActive(e, selectInner);
                }} 
                onMouseEnter={(e) => makePseudoActive(e, selectInner)}
                onBlur={(e) => {
                    if(isLast){
                        makeUnActiveState(isActive)
                    }
                    makeUnPseudoActive(e, selectInner);
                }} 
                onMouseLeave={(e) => {
                    if(e.target !== document.activeElement){
                        makeUnPseudoActive(e, selectInner);
                    }
                }}
            >
                <h3 className="link-select-sort__title link-select-sort-flights__title">{value.title}</h3>
                <div className="link-select-sort__subtitle link-select-sort-flights__subtitle">
                    <span>{"$" + value.subtitle.price}</span> . <span>{daysPart + " " + hoursPart + " " + minutesPart}</span>
                </div>
            </button>
        </li>
    )
})