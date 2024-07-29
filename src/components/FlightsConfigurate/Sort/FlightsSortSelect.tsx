import React, {FC, useRef, useState} from "react";
import { flightsOption, flightsOptionParent } from "../../../types";
import { FlightsSortSelectLink } from "./FlightsSortSelectLink";
import { useDispatch } from "react-redux";
import { flightsOptionsHideActive, flightsOptionsShowActive } from "../../../store/flights/flightsOptionsReducer";

interface FlightsOptionSelectProps{
    links : flightsOption[],
    isActive : boolean
}

export const FlightsSortSelect : FC<FlightsOptionSelectProps> = ({links, isActive}) =>{
    let listInner = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();

    const showList = () => {
        dispatch(flightsOptionsShowActive());
    }
    const hideList = () => {
        dispatch(flightsOptionsHideActive());
    }

    return(
        <div className="flights-options__more more-flights-options">
            <button className="more-flights-options__opener" onClick={(e) => {e.stopPropagation(); (isActive) ? hideList() : showList()}}>
                <div className="more-flights-options__burger">
                    <span></span>
                </div>
                <span>Other sort</span>
            </button>
            <div className="more-flights-options__list" style={{height: (isActive) ? listInner.current?.offsetHeight : 0}}>
                <ul className="more-flights-options__list-inner" ref={listInner}>
                    {links.map((link, i) => 
                        <FlightsSortSelectLink 
                            key={i} 
                            about={link} maxId={links.length - 1 + 3} id={i + 3} appearList={showList} hideList={hideList}
                        />
                    )}
                </ul>
            </div>
        </div>
    )
}