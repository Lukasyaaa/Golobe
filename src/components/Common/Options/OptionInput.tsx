import React, { FC, Fragment, useRef, useEffect } from "react";
import { Icon, IconPosition, IconValue } from "../../../types.ts";

interface OptionInputProps{
    id : number,
    placeholder : string,
    label : string,
    icon : null | Icon,
    isBigger : boolean,
    isHotelPart : boolean
}

export const OptionInput : FC<OptionInputProps> = ({id, placeholder, label, icon, isBigger, isHotelPart}) => {
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
                case IconValue.BED:
                    classes.push("icon-bed");
                    break;
                case IconValue.DATE:
                    classes.push("icon-date");
                    break;
                case IconValue.HUMAN:
                    classes.push("icon-user");
                    break;
            }
            if(icon.position === IconPosition.LEFT){
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