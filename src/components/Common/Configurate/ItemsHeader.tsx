import React, { FC, useRef, MouseEvent, FocusEvent } from "react";
import { useDispatch } from "react-redux";
import { contentPart, flightsItems, hotelsItems, itemsHeader } from "../../../types";
import { hotelsItemsSetActiveSelectLink, hotelsItemsSwapActiveAction } from "../../../store/hotels/hotelsItemsReducer";
import { flightsItemsSetActiveSelectLink, flightsItemsSwapActiveAction } from "../../../store/flights/flightsItemsReducer";

interface ItemsHeaderProps{
    parent : contentPart,
    store : itemsHeader,
    correctItemsLength : number
}

export const ItemsHeader : FC<ItemsHeaderProps> = ({parent, store, correctItemsLength}) =>{
    let listInner = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const toggleSelect = () =>{
        if(parent === contentPart.Flights){
            dispatch(flightsItemsSwapActiveAction());
        }else{
            dispatch(hotelsItemsSwapActiveAction());
        }
    }
    const changeHeaderSelectActive = (id : number) =>{
        if(parent === contentPart.Flights){
            dispatch(flightsItemsSetActiveSelectLink(id));
        }else{
            dispatch(hotelsItemsSetActiveSelectLink(id))
        }
    }

    const makePseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) : void =>{
        if(listInner.current){
            e.currentTarget.classList.add("_hovered");
            listInner.current.classList.add("_hide-active");
        }
    }
    const makeUnPseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) : void =>{
        if(listInner.current){
            e.currentTarget.classList.remove("_hovered");
            listInner.current.classList.remove("_hide-active");
        }
    }

    const parentClass : string = (parent === contentPart.Flights) ? "flights" : "hotels";
    let classes : string[] = [`${parentClass}-items__select`, `select-${parentClass}-items`, "items__select", "select-items"];
    if(store.select.isActive){
        classes.push("_active")
    }

    return(
        <div className={`${parentClass}-items__header items__header`}>
            {correctItemsLength > store.countVisibleItems &&                 
            <div className={`${parentClass}-items__count items__count`}>
                {"Showing " + store.countVisibleItems + " of"} <mark>{correctItemsLength + " places"}</mark>
            </div>}
            <div className={classes.join(" ")}>
                <button className={`select-${parentClass}-items__opener select-items__opener _icon-arrow-bottom`} onClick={(e) =>{
                    e.stopPropagation();
                    toggleSelect();
                }}>
                    <span>Sort by <mark>{
                        store.select.list[store.select.activeItem]
                    }</mark></span>
                </button>
                <div className={`select-${parentClass}-items__list select-items__list`} style={{
                    height: (listInner.current && store.select.isActive) ? listInner.current.offsetHeight : 0
                }}>
                    <ul className={`select-${parentClass}-items__list-inner select-items__list-inner`} ref={listInner}>
                        {store.select.list.map((link, i, selectLinks) => {
                            if(i === store.select.activeItem){
                                return( 
                                    <li className={`select-${parentClass}-items__link select-items__link _active`} key={i}>
                                        <span>{link}</span>
                                    </li>
                                )
                            }
                            return( 
                                <li className={`select-${parentClass}-items__link select-items__link`} key={i}>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            makeUnPseudoActive(e); 
                                            changeHeaderSelectActive(i);
                                        }}
                                        onFocus={(e) => {
                                            makePseudoActive(e);
                                            if((i === 0 || store.select.activeItem === i - 1) && 
                                            !store.select.isActive){
                                                toggleSelect();
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if(i === selectLinks.length - 1 || 
                                            (store.select.activeItem === selectLinks.length - 1 && 
                                            i === store.select.activeItem - 1)){
                                                toggleSelect();
                                            }
                                            makeUnPseudoActive(e);
                                        }}
                                        onMouseEnter={makePseudoActive} onMouseLeave={(e) => {
                                            if(document.activeElement !== e.target){
                                                makeUnPseudoActive(e);
                                            }
                                        }}
                                    >
                                        {link}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}