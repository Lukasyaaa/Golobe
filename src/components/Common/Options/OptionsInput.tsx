import React, { FC } from "react";
import { contentPart, optionsIconPosition, optionsTitle } from "../../../types";

interface optionsInputProps{
    title : string,
    placeholder : string,
    iconPosition : optionsIconPosition,
    isBigger : boolean,
    parent : contentPart
}

export const OptionsInput : FC<optionsInputProps> = ({title, placeholder, iconPosition, isBigger, parent}) =>{
    let classes = [
        "options__item", "item-options", 
        "options__item_input", "item_input-options",
        "options-intro-start__item", "item-options-intro-start",
        "options-intro-start__item_input", "item_input-options-intro-start"
    ];
    if(parent === contentPart.Hotels){
        classes.push(((isBigger) ? "bigger" : "smaller"));
    }

    let innerClasses : string[] = [
        "item-options__inner", "item_input-options__inner",
        "item-options-intro-start__inner", "item_input-options-intro-start__inner"
    ];
    if(iconPosition !== optionsIconPosition.Null){
        innerClasses.push(iconPosition);
        switch(title){
            case optionsTitle.FromTo:
                innerClasses.push("icon-from-to");
                break;
            case optionsTitle.CheckIn:
            case optionsTitle.CheckOut:
                innerClasses.push("icon-date");
                break;
            case optionsTitle.Destination:
                innerClasses.push("icon-bed");
                break;
            default:
                break;
        }
    }

    return(
        <li className={classes.join(" ")}>
            <div className={innerClasses.join(" ")}>
                <input 
                    className="item-options__input item-options-intro-start__input" 
                    type="text" id="1" placeholder={placeholder}
                />
                <label 
                    className={[
                        "item-options__label", "item_input-options__label",
                        "item-options-intro-start__label", "item_input-options-intro-start__label"
                    ].join(" ")} 
                    htmlFor="1" 
                >
                    <span>{title}</span>
                </label>
            </div>
        </li>
    )
}