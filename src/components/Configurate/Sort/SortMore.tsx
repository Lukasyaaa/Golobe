import React, { FC, useRef, useState } from "react";
import { contentPart, setter, sortFlightsCategory, sortHotelsCategory } from "../../../types";
import { SortLink } from "./SortLink";
import { toggleState } from "../../../helperFunctions";

interface sortMoreFlightsProps{
    title : string,
    contentType : contentPart.Flights,
    value : sortFlightsCategory[],
    isActive : setter<boolean>
}

interface sortMoreHotelsProps{
    title : string,
    contentType : contentPart.Hotels,
    value : sortHotelsCategory[],
    isActive : setter<boolean>
}

export const SortMore : FC<sortMoreFlightsProps | sortMoreHotelsProps> = ({title, contentType, value, isActive}) => {
    let selectInner = useRef<HTMLUListElement>(null);
    
    let classes = ["sort__select", "select-sort", "sort-flights__select", "select-sort-flights", "select"];
    if(isActive.value){
        classes.push("_active");
    }

    if(contentType === contentPart.Flights){
        return(
            <div className={classes.join(" ")}>
                <button 
                    className="select-sort__opener select__opener" 
                    onClick={() => toggleState({value: isActive.value, set: isActive.set})} type="button"
                >
                    <div className="select-sort__burger select-sort-flights__burger"><span></span></div>
                    <span className="select-sort__opener-text select-sort-flights__opener">{title}</span>
                </button>
                <div className="select-sort__list select-sort-flights__list select__list" style={{
                    height: (isActive.value) ? ((selectInner.current) ? selectInner.current.offsetHeight : "auto") : 0
                }}>
                    <ul className="select-sort__list-inner select-sort-flights__list-inner select__list-inner" ref={selectInner}>
                        {value.map((sortCategory, i, links) => 
                            <SortLink 
                                key={i} contentType={contentPart.Flights} value={sortCategory} 
                                id={i} isLast={i === links.length - 1} 
                                isActive={{value: isActive.value, set: isActive.set}} selectInner={selectInner}
                            />
                        )}
                    </ul>
                </div>
            </div>
        )
    }
    return(
        <div className="sort__select select-sort sort-hotels__select select-sort-hotels select">
            <button 
                className="select-sort__opener select__opener" 
                onClick={() => toggleState({value: isActive.value, set: isActive.set})} type="button"
            >
                <div className="select-sort__burger select-sort-hotels__burger"><span></span></div>
                <span className="select-sort__opener-text select-sort-hotels__opener">{title}</span>
            </button>
            <div className="select-sort__list select-sort-hotels__list select__list" style={{
                height: (isActive.value) ? ((selectInner.current) ? selectInner.current.offsetHeight : "auto") : 0
            }}>
                <ul className="select-sort__list-inner select-sort-hotels__list-inner select__list-inner" ref={selectInner}>
                    {value.map((sortCategory, i, links) => 
                        <SortLink 
                            key={i} contentType={contentPart.Hotels} value={sortCategory} 
                            id={i} isLast={i === links.length - 1}
                            isActive={{value: isActive.value, set: isActive.set}} selectInner={selectInner}  
                        />
                    )}
                </ul>
            </div>
        </div>
    )
}