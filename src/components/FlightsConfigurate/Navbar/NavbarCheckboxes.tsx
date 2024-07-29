import React, { FC, useRef, MouseEvent } from "react";
import { navbarCheckboxes } from "../../../types";
import { useDispatch } from "react-redux";
import { navbarAddActiveItemAction, navbarRemoveActiveItemAction, navbarSwapActiveAction } from "../../../store/flights/navbarReducer";

interface navbarCheckboxesProps{
    about : navbarCheckboxes,
    id : number,
    checkboxCount : number,
    checkboxGroupId : number
}

export const NavbarCheckboxes : FC<navbarCheckboxesProps> = ({about, id, checkboxCount, checkboxGroupId}) =>{
    let spoilerInfo = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();
    const toggleSelect = () : void =>{
        dispatch(navbarSwapActiveAction(id));
    }

    const changeActivesMassive = (idItem : number, idGroup : number, isChecked : boolean) : void =>{
        if(isChecked){
            dispatch(navbarAddActiveItemAction(idItem, idGroup));
        }else{
            dispatch(navbarRemoveActiveItemAction(idItem, idGroup));
        }
    }

    let parentClasses : string[] = ["navbar__group", "group-navbar", "navbar__checkboxes", "checkboxes-navbar", "spoiler"] 
    if(about.isActive){
        parentClasses.push("_active");
    }

    return(
        <fieldset className={parentClasses.join(" ")}>
            <legend className="group-navbar__title checkboxes-navbar__title">
                <button 
                    className="group-navbar__opener checkboxes-navbar__opener spoiler__opener _icon-arrow-bottom"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect();
                    }}
                >
                    <span>{about.title}</span>
                </button>
            </legend>
            <div className="group-navbar__filter checkboxes-navbar__filter spoiler__list" style={
                {height: (spoilerInfo.current) ? ((about.isActive) ? spoilerInfo.current.offsetHeight : 0) : "auto"}
            }>
                <ul className="group-navbar__filter-inner checkboxes-navbar__filter-inner spoiler__list-inner" ref={spoilerInfo}>
                    {about.value.items.map((checkboxText, i) => {
                    let isChecked : boolean = false;
                    for(let j = 0; j < about.value.activeItem.length; j++){
                        if(about.value.activeItem[j] === i){
                            isChecked = true;
                            break;
                        }
                    }
                    return <div className="group-navbar__item checkboxes-navbar__item" key={i}>
                        <input 
                            className="group-navbar__checkbox" 
                            type="checkbox" id={String(checkboxCount + i)} 
                            checked={isChecked}
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(i === 0 && !about.isActive) ? () => toggleSelect() : undefined}
                            onChange={(e) => {
                                let checkbox : any = e.target;
                                changeActivesMassive(i, checkboxGroupId, checkbox.checked);
                            }}
                        />
                        <label className="group-navbar__subcheckbox" htmlFor={String(checkboxCount + i)}>
                            <span>{checkboxText}</span>
                        </label>
                    </div>})}
                </ul>
            </div>
        </fieldset>
    )
}