import React, { ChangeEvent, FC, Fragment, useEffect, useRef, useState } from "react"; 
import { contentPart, meridiem, navbarFromToNumberValue, navbarFromToTimeValue } from "../../../types";
import { timeToInt, timeToString, toggleState } from "../../../helperFunctions";
import { useDispatch } from "react-redux";
import { navbarSetFromAction, navbarSetToAction } from "../../../store/configurate/navbarReducer";
 
interface navbarFromToTimeProps{
    title : string,
    groupId : number,
    contentType : contentPart,
    value : navbarFromToTimeValue,
    isTimeConfigurate : true
}

interface navbarFromToNumberProps{
    title : string,
    groupId : number,
    contentType : contentPart,
    value : navbarFromToNumberValue,
    isTimeConfigurate : false
}

type navbarFromToProps = navbarFromToTimeProps | navbarFromToNumberProps;

export const NavbarFromTo : FC<navbarFromToProps> = ({title, groupId, contentType, value, isTimeConfigurate}) =>{
    let fromValue : number;
    let toValue : number;
    let displayedFromValue : string;
    let displayedToValue : string;

    let min : number = 0;
    let max : number = 1440;

    if(isTimeConfigurate){
        fromValue = timeToInt((timeToInt(value.from, 0) >= timeToInt(value.to, 1440)) ? {hour: 12, minute: 0, meridiem: meridiem.AM} : value.from, 0);
        toValue = timeToInt((timeToInt(value.to, 1440) <= timeToInt(value.from, 0)) ? {hour: 12, minute: 0, meridiem: meridiem.AM} : value.to, 1440);
        displayedFromValue = timeToString(value.from);
        displayedToValue = timeToString(value.to);
    }else{
        min = value.min;
        max = value.max;
        fromValue = (value.from >= value.to) ? min : value.from;
        toValue = (value.to <= value.from) ? max : value.to;
        displayedFromValue = "$" + String(fromValue);
        displayedToValue = "$" + String(toValue)
    }

    const dispatch = useDispatch();

    const setTo = (e : ChangeEvent<HTMLInputElement>, gap : number) => {
        if(Number(e.target.value) - fromValue > gap){
            dispatch(navbarSetToAction(contentType, groupId, Number(e.target.value)));       
        }else if(toValue !== fromValue + gap){
            dispatch(navbarSetToAction(contentType, groupId, fromValue + gap));
        }
    }
    const setFrom = (e : ChangeEvent<HTMLInputElement>, gap : number) => {
        if(toValue - Number(e.target.value) > gap){
            dispatch(navbarSetFromAction(contentType, groupId, Number(e.target.value)));       
        }else if(fromValue !== toValue - gap){
            dispatch(navbarSetFromAction(contentType, groupId, toValue - gap));
        }
    }

    let [isActive, setIsActive] = useState<boolean>(true);
    let spoilerInner = useRef<HTMLDivElement>(null);
    let [spoilerHeight, setSpoilerHeight] = useState(0);
    useEffect(() => {
        if(spoilerInner.current){
            setSpoilerHeight(spoilerInner.current.offsetHeight);
        }
    }, [])

    let fromLabel = useRef<HTMLLabelElement>(null);
    let toLabel = useRef<HTMLLabelElement>(null);
    let proggresBar = useRef<HTMLDivElement>(null);

    let classes = ["navbar__item", "item-navbar", "navbar__from-to", "from-to-navbar"]
    if(isActive){
        classes.push("_active");
    }

    const getRight = () : number => {
        if(proggresBar.current && toLabel.current){
            return proggresBar.current.offsetWidth * ((max - toValue) / (max - min)) - 24 * ((max - toValue) / (max - min)) - 
            Math.min(
                proggresBar.current.offsetWidth * ((max - toValue) / (max - min)) - 24 * ((max - toValue) / (max - min)), 
                (toLabel.current.offsetWidth - 24) / 2
            ) / ((toLabel.current.offsetWidth - 24) / 2) * ((toLabel.current.offsetWidth - 24) / 2);
        }
        return 0;
    }

    const getLeft = () : number => {
        if(proggresBar.current && fromLabel.current){
            return proggresBar.current.offsetWidth * ((fromValue - min) / (max - min)) - 24 * ((fromValue - min) / (max - min)) - 
            Math.min(
                proggresBar.current.offsetWidth * ((fromValue - min) / (max - min)) - 24 * ((fromValue - min) / (max - min)), 
                (fromLabel.current.offsetWidth - 24) / 2
            ) / ((fromLabel.current.offsetWidth - 24) / 2) * ((fromLabel.current.offsetWidth - 24) / 2);
        }
        return 0;
    }
    
    if(title !== ""){
        return( 
            <fieldset className={classes.join(" ")}>
                <div className="item-navbar__inner from-to-navbar__inner">
                    <legend className="item-navbar__title from-to-navbar__title">
                        <button 
                            className="item-navbar__opener from-to-navbar__opener icon-arrow_bottom" 
                            onClick={() => toggleState({value: isActive, set: setIsActive})} type="button"
                        >
                            <span>{title}</span>
                        </button>
                    </legend>
                    <div className="item-navbar__filters from-to-navbar__filters" style={{
                        height: (isActive) ? spoilerHeight : 0
                    }}>
                        <div className="item-navbar__filters-inner from-to-navbar__filters-inner" ref={spoilerInner}>
                            <div className="item-navbar__from">
                                <input 
                                    type="range" id={"from_" + groupId} min={min} max={max}
                                    value={fromValue} onChange={(e) => setFrom(e, 300)}
                                />
                                <label htmlFor={"from_" + groupId} ref={fromLabel} style={{left: getLeft()}}>
                                    {displayedFromValue}
                                </label>
                            </div>
                            <div className="item-navbar__progress" ref={proggresBar}>
                                <span style={{
                                    left: `calc(${(fromValue - min) / (max - min) * 100}% + 1.5rem * ${1 - (fromValue - min) / (max - min)})`,
                                    right: `calc(${(max - toValue) / (max - min) * 100}% + 1.5rem * ${1 - (max - toValue) / (max - min)})`
                                }}></span>
                            </div>
                            <div className="item-navbar__to">
                                <input 
                                    type="range" id={"to_" + groupId} min={min} max={max}
                                    value={toValue} onChange={(e) => setTo(e, 300)}
                                />
                                <label htmlFor={"to_" + groupId} ref={toLabel} style={{right: getRight()}}>
                                    {displayedToValue}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>     
            </fieldset> 
        ) 
    }
    return <Fragment />
}