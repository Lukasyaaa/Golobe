import React, { useEffect, useRef, useState, type FC } from "react";
import type { CheckboxesAbout } from "../../../pages/Catalog";
import { NAVBAR_DESCRIPTION } from "../../../types";

interface NavbarCheckboxesProps{
    about: Omit<CheckboxesAbout, "type">
    groupId: number,
    prevItemsCount: number,
    state: number[],
    setState: (newValue: number[]) => void;
}

export const NavbarCheckboxes : FC<NavbarCheckboxesProps> = ({about, groupId, prevItemsCount, state, setState}) => {
    const {description, value, maxShow} = about;

    let [isOpened, setIsOpened] = useState<boolean>(window.innerWidth > 992);
    let [isShowAll, setIsShowAll] = useState<boolean>(false);
    const toggleIsShowAll = () => setIsShowAll(prev => !prev);

    let inner = useRef<HTMLDivElement>(null);
    let container = useRef<HTMLDivElement>(null);
    let list = useRef<HTMLUListElement>(null);
    let opener = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const containerHTML = container.current; const innerHTML = inner.current;
        if(innerHTML && containerHTML){
            containerHTML.style.height = (innerHTML.offsetHeight + ((opener.current) ? opener.current.offsetHeight : 0)) + "px";
            if(!isOpened){
                requestAnimationFrame(() => {containerHTML.style.height = "0px";});
            }
        }
    }, [isOpened]);

    useEffect(() => {
        const containerHTML = container.current; const innerHTML = inner.current;
        const listHTML = list.current; const openerHTML = opener.current;
        if(containerHTML && innerHTML && listHTML && openerHTML){
            innerHTML.style.height = listHTML.offsetHeight + "px";
            if(isShowAll) containerHTML.style.height = "auto";
        }
    }, [isShowAll]);

    const toggleIsOpened = () => setIsOpened(prev => !prev);

    let [hoveredId, setHoveredId] = useState<number>(-1);
    const setHovered = (id : number) => setHoveredId(id);
    const unSetHovered = () => setHoveredId(-1);

    return(
        <fieldset 
            className={[
                "navbar__filter", "filter-navbar", "navbar__checkboxes", "checkboxes-navbar", 
                (isOpened) ? "_active" : ""
            ].filter(Boolean).join(" ")}
        >
            <legend className="filter-navbar__label checkboxes-navbar__label">
                <button 
                    className="filter-navbar__opener checkboxes-navbar__opener" type="button"
                    onClick={toggleIsOpened}
                >
                    <span>{description}</span>
                    <div className="filter-navbar__icon-parent">
                        <svg className="filter-navbar__icon" width="15" height="8.25" fill="none">
                            <path fillRule="nonzero" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M 0.75,0.75 7.5,7.5 14.25,0.75" />
                        </svg>
                    </div>
                </button>
            </legend>
            <div className="filter-navbar__value checkboxes-navbar__container" ref={container}>
                <div className="filter-navbar__value-inner checkboxes-navbar__container-inner" ref={inner}>
                    <ul className="checkboxes-navbar__container-list" ref={list}>
                        {(isShowAll ? value : value.slice(0, maxShow)).map((value, i) => 
                            <li 
                                className={[
                                    "checkboxes-navbar__item", "item-checkboxes-navbar", 
                                    state.includes(i) ? "_choosed" : "", (hoveredId === i) ? "_hovered" : ""
                                ].filter(Boolean).join(" ")} key={i}
                            >
                                <div className="item-checkboxes-navbar__input-parent">
                                    <input 
                                        className="item-checkboxes-navbar__input" type="checkbox" 
                                        id={"checkboxes-" + Number(prevItemsCount + i - about.value.length)} 
                                        name={"checkboxes-" + String(groupId)}
                                        onChange={(e) => {
                                            setState(!e.currentTarget.checked ? [...state].filter(id => id !== i) : [...state, i])
                                            unSetHovered();
                                            e.currentTarget.blur();
                                        }} onMouseEnter={() => setHovered(i)} onMouseLeave={(e) => {
                                            if(e.currentTarget !== document.activeElement){
                                                unSetHovered();
                                            }
                                        }} onFocus={() => setHovered(i)}  onBlur={unSetHovered}
                                        checked={state.includes(i)}
                                        disabled={
                                            description === NAVBAR_DESCRIPTION.trips 
                                            && state.includes(i) && state.length === 1
                                        }
                                    />
                                </div>
                                <label 
                                    className="item-checkboxes-navbar__subinput" 
                                    htmlFor={"checkboxes-" + Number(prevItemsCount + i - about.value.length)}
                                >
                                    <span>{value}</span>
                                </label>
                            </li>
                        )}
                    </ul>
                </div>
                {
                    maxShow < value.length && 
                    <button 
                        className="checkboxes-navbar__more" type="button" onClick={toggleIsShowAll} ref={opener}
                    >
                        {isShowAll ? "Hide" : "+" + (value.length - maxShow) + " more"}
                    </button>
                }
            </div>
        </fieldset>
    )
}