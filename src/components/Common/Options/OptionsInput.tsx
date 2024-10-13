import React, { FC } from "react";
import { contentPart, optionsIconPosition, optionsTitle } from "../../../types";

interface optionsInputProps{
    id : number
    title : string,
    placeholder : string,
    iconPosition : optionsIconPosition,
    isBigger : boolean,
    parent : contentPart,
    parentClasses : string[]
}

export const OptionsInput : FC<optionsInputProps> = ({id, title, placeholder, iconPosition, isBigger, parent, parentClasses}) =>{
    let classes = [
        "options__item", "item-options", 
        "options__item_input", "item_input-options",
        parentClasses.map(cl => cl + "__item").join(" "), parentClasses.map(cl => "item-" + cl).join(" "),
        parentClasses.map(cl => cl + "__item_input").join(" "), parentClasses.map(cl => "item_input-" + cl).join(" "),
    ];
    if(parent === contentPart.Hotels){
        classes.push(((isBigger) ? "bigger" : "smaller"));
    }

    let innerClasses : string[] = [
        "item-options__inner", "item_input-options__inner",
        parentClasses.map(cl => "item-" + cl + "__inner").join(" "), parentClasses.map(cl => "item_input-" + cl + "__inner").join(" ")
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
                    className={parentClasses.map(cl => "item-" + cl + "__input").join(" ") + " item-options__input"}
                    type="text" id={String(id)} placeholder={placeholder}
                />
                <label 
                    className={
                        parentClasses.map(cl => "item-" + cl + "__label").join(" ") + " " + 
                        parentClasses.map(cl => "item_input-" + cl + "__label").join(" ") +
                        " item-options__label item_input-options__label"
                    }
                    htmlFor={String(id)} 
                >
                    <span>{title}</span>
                </label>
            </div>
        </li>
    )
}