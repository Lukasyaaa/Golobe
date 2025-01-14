import React, { FC, Fragment, useRef, useEffect } from "react";
import { icon, iconPosition, iconValue } from "../../../types.ts";

interface optionInputProps{
    id : number,
    placeholder : string,
    label : string,
    icon : null | icon,
    isBigger : boolean,
    isHotelPart : boolean
}

export const OptionInput : FC<optionInputProps> = ({id, placeholder, label, icon, isBigger, isHotelPart}) => {
    let inputElement = useRef<HTMLDivElement>(null);
    let labelElement = useRef<HTMLLabelElement>(null);

    useEffect(() => {
        if(inputElement.current && labelElement.current){
            const labelPaddings = parseFloat(getComputedStyle(labelElement.current).paddingLeft) + 
                parseFloat(getComputedStyle(labelElement.current).paddingRight);
            const labelMargins = parseFloat(getComputedStyle(labelElement.current).marginLeft) + 
                parseFloat(getComputedStyle(labelElement.current).marginRight);
            labelElement.current.style.maxWidth = `${(inputElement.current.offsetWidth - labelMargins - labelPaddings) / 16}rem`;
        }
    }, []);

    if(id >= 0 && label !== ""){
        let classes = ["options__input", "input-options"];
        if(isHotelPart){
            classes.push((isBigger) ? "bigger" : "smaller");
        }
        if(icon !== null){
            switch(icon.value){
                case iconValue.BED:
                    classes.push("icon-bed");
                    break;
                case iconValue.DATE:
                    classes.push("icon-date");
                    break;
                case iconValue.HUMAN:
                    classes.push("icon-user");
                    break;
            }
            if(icon.position === iconPosition.LEFT){
                classes.push("left");
            } else {
                classes.push("right");
            }
        }
        const inputId : string = "option_" + id;
        return(
            <div className={classes.join(" ")} ref={inputElement}>
                <input className="input-options__sublabel" id={inputId} type="text" placeholder={placeholder} />
                <label className="input-options__label" htmlFor={inputId} ref={labelElement}><span>{label}</span></label>
            </div>
        )
    }
    return <Fragment />
}