import React, { FC, useState, MouseEvent, FocusEvent, useRef } from "react";
import { contentPart, optionsTitle, selectValue } from "../../../types";
import { SelectReplace } from "../SelectReplace";

interface optionsSelectProps{
    title : string,
    links : selectValue,
    isBigger : boolean,
    parent : contentPart
}

export const OptionsSelect : FC<optionsSelectProps> = ({title, links, isBigger, parent}) =>{
    let [isActive, setIsActive] = useState<boolean>(false);

    let classes : string[] = [
        "options__item", "item-options", 
        "options__item_select", "item_select-options",
        "options-intro-start__item", "item-options-intro-start",
        "options-intro-start__item_select", "item_select-options-intro-start"
    ]
    if(parent === contentPart.Hotels){
        classes.push(((isBigger) ? "bigger" : "smaller"));
    }
    if(isActive){
        classes.push("_active");
    }

    let isHaveIcon : boolean = false;
    let innerClasses : string[] = [
        "item-options__inner", "item_select-options__inner",
        "item-options-intro-start__inner", "item_select-options-intro-start__inner"
    ];
    if(title === optionsTitle.RoomsAndGuests){
        isHaveIcon = true;
        innerClasses.push("icon-user");
        innerClasses.push("two-icon");
    }

    let selectParent = useRef<HTMLLIElement>(null);
    const makeSelectPseudoActive = () : void => {
        if(selectParent.current){
            selectParent.current.classList.add("_hovered");
        }
    }

    const unMakeSelectPseudoActive = (e : FocusEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) : void => {
        if(selectParent.current && document.activeElement !== e.target){
            selectParent.current.classList.remove("_hovered");
        }
    }
    
    return(
        <li className={classes.join(" ")} ref={selectParent}>
            <div className={innerClasses.join(" ")}>
                <SelectReplace 
                    parentClasses={["item-options", "item-options-intro-start"]} links={links} isActive={{value: isActive, set: setIsActive}}
                    makeSelectPseudoActive={makeSelectPseudoActive} unMakeSelectPseudoActive={unMakeSelectPseudoActive}
                />
                <h3 
                    className={[
                        "item-options__label", "item_select-options__label",
                        "item-options-intro-start__label", "item_select-options-intro-start__label"
                    ].join(" ")} 
                >
                    <span>{title}</span>
                </h3>
            </div>
        </li>
    )
}