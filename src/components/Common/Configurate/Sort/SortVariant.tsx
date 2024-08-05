import React, {FC, RefObject, MouseEvent, FocusEvent} from "react";
import { sortFlightsVariant, sortHotelsVariant, contentPart } from "../../../../types";
import { sortChangeActiveItemAction} from "../../../../store/common/sortReducer";
import { useDispatch } from "react-redux";

interface flightsSortVariantProps{
    about : sortFlightsVariant,
    isActive : boolean,
    ourParent : RefObject<HTMLDivElement> | RefObject<HTMLUListElement>,
    id : number,
    valueType : contentPart.Flights,
}

interface hotelsSortVariantProps{
    about : sortHotelsVariant,
    isActive : boolean,
    ourParent : RefObject<HTMLDivElement> | RefObject<HTMLUListElement>,
    id : number,
    valueType : contentPart.Hotels,
}

export const SortVariant : FC<flightsSortVariantProps | hotelsSortVariantProps> = ({about, isActive, ourParent, id, valueType}) =>{
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
    
    const dispatch = useDispatch();
    const makeActive = (e : MouseEvent<HTMLButtonElement>) =>{
        makeUnPseudoActive(e);
        dispatch(sortChangeActiveItemAction(id, valueType));
    }
    
    
    if(valueType === contentPart.Flights){
        let hours = Math.floor(about.subtitle.time / 60);
        let minutes = about.subtitle.time % 60;

        if(isActive){
            return( 
                <div className="sort__item item-sort _active">
                    <div className="item-sort__inner">
                        <h4 className="item-sort__title">{about.title}</h4>
                        <div className="item-sort__subtitle">
                            <span>${about.subtitle.price}</span>
                            <div className="item-sort__circle"></div>
                            <span>{`${hours}h ${minutes}m`}</span>
                        </div>
                    </div>
                </div>
            )        
        }
        return(
            <button className="sort__item item-sort" 
                onClick={(e) => {e.stopPropagation(); makeActive(e)}} 
                onMouseEnter={makePseudoActive} onMouseLeave={(e) =>{
                    if(document.activeElement !== e.target){
                        makeUnPseudoActive(e);
                    }}} 
                onFocus={makePseudoActive} onBlur={makeUnPseudoActive}
            >
                <div className="item-sort_inner">
                    <h4 className="item-sort__title">{about.title}</h4>
                    <div className="item-sort__subtitle">
                        <span>${about.subtitle.price}</span>
                        <div className="item-sort__circle"></div>
                        <span>{`${hours}h ${minutes}m`}</span>
                    </div>
                </div>
            </button>
        )
    }

    if(isActive){
        return( 
            <div className="sort__item item-sort _active">
                <div className="item-sort__inner">
                    <h4 className="item-sort__title">{about.title}</h4>
                    <div className="item-sort__subtitle">
                        {about.count} places
                    </div>
                </div>
            </div>
        )        
    }
    return(
        <button className="sort__item item-sort" 
            onClick={(e) => {e.stopPropagation(); makeActive(e)}} 
            onMouseEnter={makePseudoActive} onMouseLeave={(e) =>{
                if(document.activeElement !== e.target){
                    makeUnPseudoActive(e);
                }}} 
            onFocus={makePseudoActive} onBlur={makeUnPseudoActive}
        >
            <div className="item-sort__inner">
                <h4 className="item-sort__title">{about.title}</h4>
                <div className="item-sort__subtitle">
                    {about.count} places
                </div>
            </div>
        </button>
    )
}