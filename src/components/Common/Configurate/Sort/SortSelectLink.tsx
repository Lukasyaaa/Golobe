import React, {FC} from "react";
import { sortFlightsVariant, sortHotelsVariant, contentPart } from "../../../../types";
import { useDispatch } from "react-redux";
import { sortSwapItemsAction} from "../../../../store/common/sortReducer";

interface flightsSortSelectLinkProps{
    about : sortFlightsVariant,
    id : number,
    maxId : number,
    appearList : () => void,
    hideList : () => void,
    valueType : contentPart.Flights
}

interface hotelsSortSelectLinkProps{
    about : sortHotelsVariant,
    id : number,
    maxId : number,
    appearList : () => void,
    hideList : () => void,
    valueType : contentPart.Hotels
}

export const SortSelectLink : FC<flightsSortSelectLinkProps | hotelsSortSelectLinkProps> = ({
    about, maxId, id, appearList, hideList, valueType
}) =>{
    let dispatch = useDispatch();
    const swapActive = () =>{
        dispatch(sortSwapItemsAction(id, valueType))
    }
    
    if(valueType === contentPart.Flights){
        let hours = Math.floor(about.subtitle.time / 60);
        let minutes = about.subtitle.time % 60;

        return(
            <li className="more-sort__link-parent">
                <button 
                    className="more-sort__link link-more-sort"
                    onClick={(e) => {e.stopPropagation(); swapActive()}} 
                    onFocus={(id === 3) ? () => appearList() : undefined} onBlur={(id === maxId) ? () => hideList() : undefined}
                >
                    <h4 className="link-more-sort__title">{about.title}</h4>           
                    <div className="link-more-sort__subtitle">        
                        <span>${about.subtitle.price}</span>
                        <div className="link-more-sort__circle"></div>
                        <span>{`${hours}h ${minutes}m`}</span>
                    </div>
                </button>
            </li>
        )
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
                    {about.count} places
                </div>
            </button>
        </li>
    )
}