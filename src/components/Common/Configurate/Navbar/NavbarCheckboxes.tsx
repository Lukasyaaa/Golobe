import React, { FC, useRef, MouseEvent, useState, useEffect } from "react";
import { contentPart, navbarCheckboxes } from "../../../../types";
import { useDispatch } from "react-redux";
import { navbarAddActiveItemAction, navbarRemoveActiveItemAction, navbarSwapActiveAction, navbarSwapCheckboxesActiveAction } from "../../../../store/common/navbarReducer";

interface navbarCheckboxesProps{
    about : navbarCheckboxes,
    id : number,
    checkboxCount : number,
    checkboxGroupId : number,
    contentType : contentPart
}

export const NavbarCheckboxes : FC<navbarCheckboxesProps> = ({about, id, checkboxCount, checkboxGroupId, contentType}) =>{
    let spoilerContainer = useRef<HTMLUListElement>(null);
    let [spoilerContainerHeight, setSpoilerContainerHeight] = useState(0);

    let spoilerInner = useRef<HTMLDivElement>(null);
    let spoilerOpener = useRef<HTMLButtonElement>(null);
    const dispatch = useDispatch();
    const toggleSelect = () : void =>{
        dispatch(navbarSwapActiveAction(id, contentType));
    }
    const toggleCheckboxesList = (e : MouseEvent<HTMLButtonElement>) : void =>{
        e.stopPropagation();
        dispatch(navbarSwapCheckboxesActiveAction(id, contentType));
    }

    useEffect(() => {
        setSpoilerContainerHeight((spoilerContainer.current) ? spoilerContainer.current.offsetHeight : 0);
    }, [about.value.isActive])

    const changeActivesMassive = (idItem : number, idGroup : number, isChecked : boolean) : void =>{
        if(isChecked){
            dispatch(navbarAddActiveItemAction(idItem, idGroup, contentType));
        }else{
            dispatch(navbarRemoveActiveItemAction(idItem, idGroup, contentType));
        }
    }

    let parentClasses : string[] = ["navbar__group", "group-navbar", "navbar__checkboxes", "checkboxes-navbar", "spoiler"] 
    if(about.isActive){
        parentClasses.push("_active");
    }
    let correctItems : string[] = 
        (about.value.isActive) ? about.value.items : about.value.items.filter((_, i) => i < about.value.itemsToShow);

    return(
        <fieldset className={parentClasses.join(" ")}>
            <legend className="group-navbar__title checkboxes-navbar__title">
                <button 
                    className="group-navbar__opener checkboxes-navbar__opener spoiler__opener _icon-arrow-bottom"
                    onClick={(e) => {e.stopPropagation(); toggleSelect();}}
                >
                    <span>{about.title}</span>
                </button>
            </legend>
            <div className="group-navbar__filter checkboxes-navbar__filter spoiler__list" style={
                {height: 
                    (spoilerInner.current && !about.value.isActive) ? 
                        ((about.isActive) ? spoilerInner.current.offsetHeight + ((spoilerOpener.current) ? spoilerOpener.current.offsetHeight : 0) : 0) 
                        : "auto"
                }}
            >
                <div 
                    className="group-navbar__link-container-parent checkboxes-navbar__link-container-parent spoiler__link-container-parent" 
                    ref={spoilerInner} style={
                        {height: 
                            (spoilerContainerHeight !== 0) ? spoilerContainerHeight : "auto"
                        }}
                >
                    <ul className="group-navbar__link-container checkboxes-navbar__link-container spoiler__link-container" ref={spoilerContainer}>
                        {correctItems.map((checkboxText, i) => {
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
                {about.value.items.length > about.value.itemsToShow && 
                    <button 
                        className="group-navbar__checkboxes-more"
                        ref={spoilerOpener} 
                        onClick={toggleCheckboxesList} 
                    >
                        {(!about.value.isActive) ? `+${about.value.items.length - about.value.itemsToShow} more` : "hide"}
                    </button>
                }
            </div>
        </fieldset>
    )
}