import React, { useEffect, useMemo, useRef, useState, type FC } from "react";
import { intToTime, NAVBAR_ITEM, timeToString } from "../../../types";
import type { NavbarRangeValue, NavbarRange as NavbarRangeType} from "../../../types";

interface NavbarRangeProps{
    about: NavbarRangeType,
    setState: (newValue: NavbarRangeValue<number>) => void;
}

export const NavbarRange : FC<NavbarRangeProps> = ({about, setState}) => {
    const {description, type, value} = about;
    const {from, to} = value;
    let [rangeValue, setRangeValue] = useState<NavbarRangeValue<number>>({from, to});

    let fromText = useMemo(
        () => type === NAVBAR_ITEM.priceRange ? "$" + rangeValue.from : timeToString(intToTime(rangeValue.from)),
        [rangeValue.from]
    ); 
    let toText = useMemo(
        () => type === NAVBAR_ITEM.priceRange ? "$" + rangeValue.to : timeToString(intToTime(rangeValue.to)),
        [rangeValue.to]
    );

    let [isOpened, setIsOpened] = useState<boolean>(window.innerWidth > 992);
    const toggleIsOpened = () => setIsOpened(prev => !prev);
    
    let container = useRef<HTMLDivElement>(null);
    let inner = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const innerHTML = inner.current;
        const containerHTML = container.current;
        if(innerHTML && containerHTML){
            containerHTML.style.height = isOpened ? innerHTML.offsetHeight + "px" : "0px"
        }
    }, [isOpened]);

    useEffect(() => {
        const timer = setTimeout(() => { setState(rangeValue); }, 300)
        return () => clearTimeout(timer);
    }, [rangeValue])

    const left = (rangeValue.from - from) / (to - from);
    const right = 1 - (rangeValue.to - from) / (to - from);

    return(
        <fieldset 
            className={[
                "navbar__filter", "filter-navbar", "navbar__range", "range-navbar", (isOpened) ? "_active" : ""
            ].filter(Boolean).join(" ")}
        >
            <legend className="filter-navbar__label range-navbar__label">
                <button 
                    className="filter-navbar__opener range-navbar__opener" type="button" onClick={toggleIsOpened}
                >
                    <span>{description}</span>
                    <div className="filter-navbar__icon-parent">
                        <svg className="filter-navbar__icon" width="15" height="8.25" fill="none">
                            <path fillRule="nonzero" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M 0.75,0.75 7.5,7.5 14.25,0.75" />
                        </svg>
                    </div>
                </button>
            </legend>
            <div className="filter-navbar__value range-navbar__container" ref={container}> 
                <div className="filter-navbar__value-inner range-navbar__container-inner" ref={inner}>
                    <div className="range-navbar__progress">
                        <span 
                            style={{
                                left: `calc(${left} * 100% + 1.5rem - 1.5rem * ${left})`,
                                right: `calc(${right} * 100% + 1.5rem - 1.5rem * ${right})`
                            }}
                        >
                        </span>
                    </div>
                    <input 
                        className="range-navbar__from" type="range" 
                        min={from} value={rangeValue.from} max={to} 
                        onInput={(e) => {
                            if(Number(e.currentTarget.value) <= to - 100){
                                setRangeValue({...rangeValue, from: Number(e.currentTarget.value)})
                            }
                        }}
                    />
                    <input 
                        className="range-navbar__to" type="range" 
                        min={from} value={rangeValue.to} max={to} 
                        onInput={(e) => {
                            if(Number(e.currentTarget.value) >= from + 100){
                                setRangeValue({...rangeValue, to: Number(e.currentTarget.value)})
                            }
                        }}
                    />
                    <div className="range-navbar__from-text" style={{left: `calc(${left} * 100% - 1.5rem * ${left})`}}>
                        {fromText}
                    </div>
                    <div className="range-navbar__to-text" style={{right: `calc(${right} * 100% - 1.5rem * ${right})`}}>
                        {toText}
                    </div>
                </div>
            </div>
        </fieldset>
    )    
}