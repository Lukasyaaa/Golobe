import React, { FC, useState, MouseEvent, FocusEvent, useRef } from "react";
import { contentPart, optionsTitle, selectValue } from "../../../types";
import { SelectReplace } from "../Select/SelectReplace";

interface optionsSelectProps{
    title : string,
    links : selectValue,
    isBigger : boolean,
    parent : contentPart,
    parentClasses : string[]
}

export const OptionsSelect : FC<optionsSelectProps> = ({title, links, isBigger, parent, parentClasses}) =>{
    let [isActive, setIsActive] = useState<boolean>(false);

    let classes : string[] = [
        "options__item", "item-options", 
        "options__item_select", "item_select-options",
        parentClasses.map(cl => cl + "__item").join(" "), parentClasses.map(cl => "item-" + cl).join(" "),
        parentClasses.map(cl => cl + "__item_select").join(" "), parentClasses.map(cl => "item_select-" + cl).join(" "),
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
        parentClasses.map(cl => "item-" + cl + "__inner").join(" "), parentClasses.map(cl => "item_select-" + cl + "__inner").join(" ")
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
                    parentClasses={["item-options", parentClasses.map(cl => "item-" + cl).join(" ")]} links={links} isActive={{value: isActive, set: setIsActive}}
                    makeSelectPseudoActive={makeSelectPseudoActive} unMakeSelectPseudoActive={unMakeSelectPseudoActive}
                />
                <h3 
                    className={
                        parentClasses.map(cl => "item-" + cl + "__label").join(" ") + " " + 
                        parentClasses.map(cl => "item_select-" + cl + "__label").join(" ") +
                        " item-options__label item_select-options__label"
                    }
                >
                    <span>{title}</span>
                </h3>
            </div>
        </li>
    )
}