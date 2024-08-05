import React, { FC, useRef, MouseEvent, FocusEvent } from "react";
import { contentPart, navbarItem, navbarItemType, navbarRadio } from "../../../../types";
import { useDispatch } from "react-redux";
import { navbarSetActiveItemAction, navbarSwapActiveAction } from "../../../../store/common/navbarReducer";
import { useTypedSelector } from "../../../../hooks/redux";

interface navbarRadiosProps{
    about : navbarRadio,
    id : number,
    radioCount : number,
    radioGroupId : number,
    contentType : contentPart
}

export const NavbarRadios : FC<navbarRadiosProps> = ({about, id, radioCount, radioGroupId, contentType}) =>{
    let spoilerInfo = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();
    const toggleSelect = () : void =>{
        dispatch(navbarSwapActiveAction(id, contentType));
    }

    const setActive = (idItem : number, idGroup : number) =>{
        dispatch(navbarSetActiveItemAction(idItem, idGroup, contentType));
    }

    let parentClasses : string[] = ["navbar__group", "group-navbar", "navbar__radios", "radios-navbar", "spoiler"] 
    if(about.isActive){
        parentClasses.push("_active");
    }

    return(
        <fieldset className={parentClasses.join(" ")}>
            <legend className="group-navbar__title radios-navbar__title">
                <button 
                    className="group-navbar__opener radios-navbar__opener spoiler__opener _icon-arrow-bottom"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect();
                    }}
                >
                    <span>{about.title}</span>
                </button>
            </legend>
            <div className="group-navbar__filter radios-navbar__filter spoiler__list" style={
                {height: (spoilerInfo.current) ? 
                    ((about.isActive) ? spoilerInfo.current.offsetHeight - 8 : 0) 
                    : "auto"}
            }> 
                <ul className="group-navbar__filter-inner radios-navbar__filter-inner spoiler__list-inner" ref={spoilerInfo}>
                    {about.value.items.map((radioText, i) => 
                    <div className="group-navbar__item radios-navbar__item" key={i}>
                        <div className="group-navbar__item-inner radios-navbar__item-inner">
                            <input 
                                className="group-navbar__radio" 
                                type="radio" name={String(id)} value={radioText} id={String(radioCount + i)} 
                                onClick={(e) => e.stopPropagation()}
                                onChange={() => setActive(i, radioGroupId)}
                                onFocus={(!about.isActive && i === about.value.activeItem) ? () => toggleSelect() : undefined}
                                checked={(i === about.value.activeItem)}
                            />
                            <label htmlFor={String(radioCount + i)} className="group-navbar__subradio">
                                <span>{radioText}</span>
                            </label>
                        </div>
                    </div>)}
                </ul>
            </div>
        </fieldset>
    )
}