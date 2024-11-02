import React, { FC, Fragment, useRef, useState } from "react"; 
import { contentPart } from "../../../types";
import { navbarAddActiveAction, navbarRemoveActiveAction } from "../../../store/configurate/navbarReducer";
import { useDispatch } from "react-redux";
import { toggleState } from "../../../helperFunctions";

interface navbarCheckboxesProps{
    title : string,
    itemsLabel : string[],
    currentActive : number[],
    groupId : number,
    contentType : contentPart
}

export const NavbarCheckboxes : FC<navbarCheckboxesProps> = ({title, itemsLabel, currentActive, groupId, contentType}) =>{ 
    const dispatch = useDispatch();

    let [isActive, setIsActive] = useState<boolean>(true);
    let spoilerInner = useRef<HTMLDivElement>(null);
    
    let classes = ["navbar__item", "item-navbar", "navbar__checkboxes", "checkboxes-navbar"]
    if(isActive){
        classes.push("_active");
    }

    if(itemsLabel.length !== 0 && title !== ""){
        return( 
            <fieldset className={classes.join(" ")}>
                <div className="item-navbar__inner checkboxes-navbar__inner">
                    <legend className="item-navbar__title checkboxes-navbar__title">
                        <button 
                            className="item-navbar__opener checkboxes-navbar__opener icon-arrow_bottom" 
                            onClick={() => toggleState({value: isActive, set: setIsActive})} type="button"
                        >
                            <span>{title}</span>
                        </button>
                    </legend>   
                    <div className="item-navbar__filters checkboxes-navbar__filters" style={{
                        height: (isActive) ? ((spoilerInner.current) ? spoilerInner.current.offsetHeight : "auto") : 0
                    }}>
                        <div className="item-navbar__filters-inner checkboxes-navbar__filters-inner" ref={spoilerInner}>
                            {itemsLabel.map((label, i) => 
                                <div className="item-navbar__filter checkboxes-navbar__filter" key={i}>
                                    <input 
                                        className="item-navbar__checkbox" type="checkbox" 
                                        name={String(groupId)} id={String(groupId) + "." + i + "_checkbox"} 
                                        checked={(currentActive.indexOf(i) !== -1)}
                                        onChange={(e) => {
                                            if(e.target.checked){
                                                dispatch(navbarAddActiveAction(contentType, groupId, i));
                                            }else{
                                                dispatch(navbarRemoveActiveAction(contentType, groupId, i));
                                            }
                                        }}
                                    />
                                    <label className="item-navbar__subcheckbox" htmlFor={String(groupId) + "." + i + "_checkbox"}>
                                        <span>{label}</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>     
            </fieldset> 
        ) 
    }
    return <Fragment />
}