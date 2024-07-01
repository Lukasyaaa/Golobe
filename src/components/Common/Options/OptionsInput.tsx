import React, {FC, useEffect, useState,} from "react";
import { optionIconPosition, optionsType } from "../../../types";

interface OptionsInputProps{
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    parentType : optionsType,
    isBigger: boolean,
    value : string,
}

export const OptionsInput : FC<OptionsInputProps> = ({title, iconValue, iconPosition, parentType, isBigger, value}) =>{
    let [inputValue, setInputValue] = useState<string>(value);

    useEffect(() =>{
        setInputValue(value);
    }, [value]);

    let classesParent = ["inputs-options__item", "item-inputs-options", "input"];
    let classesInner = ["item-inputs-options__inner"];
    if(parentType === optionsType.Hotels){
        if(isBigger) {
            classesParent.push("bigger");
        } else {
            classesParent.push("smaller")
        }
    }
    if(iconValue){
        classesParent.push("with-icon");
        classesParent.push(iconPosition);
        classesInner.push(iconValue);
    }

    return(
        <div className={classesParent.join(" ")}>
            <div className={classesInner.join(" ")}>
                <input 
                    className="item-inputs-options__input" 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <h4 className="item-inputs-options__title"><span>{title}</span></h4>
            </div>
        </div>
    )
}