import React, {ChangeEvent, MouseEvent, FC, useRef} from "react";
import { navbarFromToNumber, navbarFromToTime, navbarFromToValueTypes } from "../../../types";
import { useDispatch } from "react-redux";
import { navbarSetFromValueAction, navbarSetToValueAction, navbarSwapActiveAction } from "../../../store/flights/navbarReducer";
import { getTime, getTimeString } from "../TimeConverter";

interface navbarFromToProps{
    about : navbarFromToNumber | navbarFromToTime,
    id : number
}


export const NavbarFromTo : FC<navbarFromToProps> = ({about, id}) =>{
    let parentClasses : string[] = ["navbar__group", "group-navbar", "navbar__from-to", "from-to-navbar", "spoiler"];
    if(about.isActive){
        parentClasses.push("_active");
    }

    let spoilerInfo = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const toggleSelect = () : void =>{
        dispatch(navbarSwapActiveAction(id));
    }

    let fromValueText : string = "";
    let toValueText : string = "";
    let fromValue : number = 0;
    let toValue : number = 0;
    if(about.valueType === navbarFromToValueTypes.Time){
        fromValueText = getTimeString(about.value.from.hour, about.value.from.minute, about.value.from.meridiem);
        toValueText = getTimeString(about.value.to.hour, about.value.to.minute, about.value.to.meridiem);

        fromValue = getTime(about.value.from.hour, about.value.from.minute, about.value.from.meridiem, 0);
        toValue = getTime(about.value.to.hour, about.value.to.minute, about.value.to.meridiem, 24);
    }else{
        fromValueText = "$" + about.value.from;
        toValueText = "$" + about.value.to;

        fromValue = about.value.from;
        toValue = about.value.to;
    }

    const minValue = (about.valueType === navbarFromToValueTypes.Number) ? about.value.min : 0;
    const maxValue = (about.valueType === navbarFromToValueTypes.Number) ? about.value.max : 1440;

    const changeFrom = (e : ChangeEvent<HTMLInputElement>, gap : number) =>{
        if(toValue - Number(e.target.value) >= gap){
            dispatch(navbarSetFromValueAction(Number(e.target.value), about.valueType, id))
        }else{
            dispatch(navbarSetFromValueAction(toValue - gap, about.valueType, id))
        }
    };
    const changeTo = (e : ChangeEvent<HTMLInputElement>, gap : number) =>{
        if(Number(e.target.value) - fromValue >= gap){
            dispatch(navbarSetToValueAction(Number(e.target.value), about.valueType, id))
        }else{
            dispatch(navbarSetToValueAction(fromValue + gap, about.valueType, id))
        }
    }

    return(
        <fieldset className={parentClasses.join(" ")}>
            <legend className="group-navbar__title from-to-navbar__title">
                <button 
                    className="group-navbar__opener from-to-navbar__opener spoiler__opener _icon-arrow-bottom"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect();
                    }}
                >
                    <span>{about.title}</span>
                </button>
            </legend>
            <div className="group-navbar__filter from-to-navbar__filter spoiler__list" style={
                {height: (spoilerInfo.current) ? ((about.isActive) ? spoilerInfo.current.offsetHeight : 0) : "auto"}
            }>
                <div 
                    className="group-navbar__filter-inner from-to-navbar__filter-inner spoiler__list-inner" 
                    ref={spoilerInfo}
                >
                    <div className="group-navbar__line">
                        <span className="group-navbar__progress" style={{
                            left: `calc(
                                ${(fromValue - minValue) / (maxValue - minValue) * 100}% + ${24 - 24 * (fromValue - minValue) / (maxValue - minValue)}px
                            )`, 
                            right: `calc(
                                ${(maxValue - toValue) / (maxValue - minValue) * 100}% + ${24 - 24 * (maxValue - toValue) / (maxValue - minValue)}px
                            )`
                        }}
                    ></span>
                    </div>
                    <label 
                        className="group-navbar__from-label" 
                        htmlFor="from"
                        style={{
                            left: `calc(
                                ${(fromValue - minValue) / (maxValue - minValue) * 100}% - ${36 * (fromValue - minValue) / (maxValue - minValue)}px
                            )`, 
                        }}
                    >{fromValueText}</label>
                    <input 
                        className="group-navbar__from" 
                        type="range" id="from" 
                        value={fromValue} min={minValue} max={maxValue}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => changeFrom(e, (about.valueType === navbarFromToValueTypes.Time) ? 360 : 150)}
                        onFocus={() => {
                            if(!about.isActive){
                                dispatch(navbarSwapActiveAction(id));
                            }
                        }}
                    />
                    <label 
                        className="group-navbar__to-label" 
                        htmlFor="to"
                        style={{
                            right: `calc(
                                ${(maxValue - toValue) / (maxValue - minValue) * 100}% - ${36 * (maxValue - toValue) / (maxValue - minValue)}px
                            )`
                        }}
                    >{toValueText}</label>
                    <input 
                        className="group-navbar__to" 
                        type="range" id="to" 
                        value={toValue} min={minValue} max={maxValue}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => changeTo(e, (about.valueType === navbarFromToValueTypes.Time) ? 360 : 150)}
                    />
                </div>
            </div>
        </fieldset>
    )
}