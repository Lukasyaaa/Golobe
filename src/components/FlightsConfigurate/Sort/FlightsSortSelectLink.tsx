import React, {FC, RefObject, MouseEvent, FocusEvent} from "react";
import { flightsOption, flightsOptionParent } from "../../../types";
import { useDispatch } from "react-redux";
import { flightsOptionsSwapItemsAction} from "../../../store/flights/flightsOptionsReducer";

interface flightsSortSelectLinkProps{
    about : flightsOption,
    id : number,
    maxId : number,
    appearList : () => void,
    hideList : () => void,
}

export const FlightsSortSelectLink : FC<flightsSortSelectLinkProps> = ({about, maxId, id, appearList, hideList}) =>{
    let hours = Math.floor(about.subtitle.time / 60);
    let minutes = about.subtitle.time % 60;

    let dispatch = useDispatch();
    const swapActive = () =>{
        dispatch(flightsOptionsSwapItemsAction(id))
    }

    return(
        <li className="more-flights-options__link-parent">
            <button 
                className="more-flights-options__link link-more-flights-options"
                onClick={(e) => {e.stopPropagation(); swapActive()}} 
                onFocus={(id === 3) ? () => appearList() : undefined} onBlur={(id === maxId) ? () => hideList() : undefined}
            >
                <h4 className="link-more-flights-options__title">{about.title}</h4>
                <div className="link-more-flights-options__subtitle">
                    <span>${about.subtitle.price}</span>
                    <div className="link-more-flights-options__circle"></div>
                    <span>{`${hours}h ${minutes}m`}</span>
                </div>
            </button>
        </li>
    )
}