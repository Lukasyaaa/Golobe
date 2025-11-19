import React, { useEffect, useRef, useState, type FC } from "react";
import type { NavbarRadios as NavbarRadiosType } from "../../../../types";

interface NavbarRadiosProps{
    about: NavbarRadiosType,
    groupId: number,
    prevItemsCount: number,
    state: number,
    setState: (newValue: number) => void;
}

export const NavbarRadios : FC<NavbarRadiosProps> = ({about, groupId, prevItemsCount, state, setState}) => {
    const {description, value} = about;

    let [isOpened, setIsOpened] = useState<boolean>(window.innerWidth > 992);
    let inner = useRef<HTMLDivElement>(null);
    let container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const innerHTML = inner.current;
        const containerHTML = container.current;
        if(innerHTML && containerHTML){
            if(isOpened){
                containerHTML.style.height = innerHTML.offsetHeight + "px";
            } else {
                containerHTML.style.height = 0 + "px";
            }
        }
    }, [isOpened]);
    
    const toggleIsOpened = () => {
        setIsOpened(prev => !prev);
    }
    
    return(
        <fieldset 
            className={[
                "navbar__filter", "filter-navbar", "navbar__radios", "radios-navbar", (isOpened) ? "_active" : ""
            ].filter(Boolean).join(" ")}
        >
            <legend className="filter-navbar__label radios-navbar__label">
                <button 
                    className="filter-navbar__opener radios-navbar__opener" 
                    type="button" onClick={toggleIsOpened}
                >
                    <span>{description}</span>
                    <div className="filter-navbar__icon-parent">
                        <svg className="filter-navbar__icon" width="15" height="8.25" fill="none">
                            <path fillRule="nonzero" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M 0.75,0.75 7.5,7.5 14.25,0.75" />
                        </svg>
                    </div>
                </button>
            </legend>
            <div className="filter-navbar__value radios-navbar__container" ref={container}>
                <div className="filter-navbar__value-inner radios-navbar__container-inner" ref={inner}>
                    {value.map((value, i) => 
                        <div className="radios-navbar__item item-radios-navbar" key={i}>
                            <input 
                                className="item-radios-navbar__input" type="radio" 
                                id={"radios-" + Number(prevItemsCount + i)} 
                                name={"radios-" + String(groupId)}
                                onChange={() => setState(i)} checked={i === state}
                            />
                            <label 
                                className="item-radios-navbar__subinput" 
                                htmlFor={"radios-" + Number(prevItemsCount + i)}
                            >
                                <span>{value}</span>
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </fieldset>
    )
}