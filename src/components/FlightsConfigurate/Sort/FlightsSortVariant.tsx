import React, {FC, RefObject, MouseEvent, FocusEvent} from "react";
import { UseDispatch } from "react-redux";
import { flightsOption } from "../../../types";
import { flightsOptionsChangeActiveItemAction} from "../../../store/flights/flightsOptionsReducer";
import { useDispatch } from "react-redux";

interface optionsFlightsProps{
    about : flightsOption,
    isActive : boolean,
    ourParent : RefObject<HTMLDivElement> | RefObject<HTMLUListElement>,
    id : number,
}

export const FlightsSortVariant : FC<optionsFlightsProps> = ({about, isActive, ourParent, id}) =>{
    let hours = Math.floor(about.subtitle.time / 60);
    let minutes = about.subtitle.time % 60;

    const dispatch = useDispatch();
    const makeActive = (e : MouseEvent<HTMLButtonElement>) =>{
        makeUnPseudoActive(e);
        dispatch(flightsOptionsChangeActiveItemAction(id));
    }
    const makePseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) =>{
        if(ourParent.current){
            ourParent.current.classList.add("_hide-active");
            e.currentTarget.classList.add("_hovered");
        }
    }
    const makeUnPseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) =>{
        if(ourParent.current){
            ourParent.current.classList.remove("_hide-active");
            e.currentTarget.classList.remove("_hovered");
        }
    }

    if(isActive){
        return( 
            <div className="flights-options__item item-flights-options _active">
                <div className="item-flights-options__inner">
                    <h4 className="item-flights-options__title">{about.title}</h4>
                    <div className="item-flights-options__subtitle">
                        <span>${about.subtitle.price}</span>
                        <div className="item-flights-options__circle"></div>
                        <span>{`${hours}h ${minutes}m`}</span>
                    </div>
                </div>
            </div>
        )        
    }
    return(
        <button className="flights-options__item item-flights-options" 
            onClick={(e) => {e.stopPropagation(); makeActive(e)}} 
            onMouseEnter={makePseudoActive} onMouseLeave={(e) =>{
                if(document.activeElement !== e.target){
                    makeUnPseudoActive(e);
                }}} 
            onFocus={makePseudoActive} onBlur={makeUnPseudoActive}
        >
            <div className="item-flights-options__inner">
                <h4 className="item-flights-options__title">{about.title}</h4>
                <div className="item-flights-options__subtitle">
                    <span>${about.subtitle.price}</span>
                    <div className="item-flights-options__circle"></div>
                    <span>{`${hours}h ${minutes}m`}</span>
                </div>
            </div>
        </button>
    )
}