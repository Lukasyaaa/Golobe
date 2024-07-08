import React, { FC, useRef, useState, MouseEvent, FocusEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { optionsSelectLink, optionIconPosition, optionsType } from "../../../types";
import { optionsSwapIsActiveAction } from "../../../store/start/optionsReducer";


interface OptionsSelectProps{
    id : number,
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    parentType : optionsType,
    isBigger: boolean,
    links : optionsSelectLink[],
    isActive : boolean,
}

export const OptionsSelect : FC<OptionsSelectProps> = ({id, title, iconValue, iconPosition, parentType, isBigger, links, isActive}) =>{
    let parent = useRef<HTMLDivElement>(null);
    let [selectLinks, setSelectLinks] = useState<optionsSelectLink[]>(links);
    let activeSelectLink : optionsSelectLink[] = selectLinks.filter(selectLink => selectLink.isDisabled);
    let listInner = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();

    useEffect(() =>{
        setSelectLinks(links);
    }, [links]);

    let classesParent = ["inputs-options__item", "item-inputs-options", "select"];
    let classesInner = ["item-inputs-options__inner", "_icon-arrow-bottom"];
    if(parentType === optionsType.Hotels){
        if(isBigger){
            classesParent.push("bigger");
        } else {
            classesParent.push("smaller")
        }
    }
    if(isActive){
        classesParent.push("_active");
    }
    if(iconValue){
        classesParent.push("with-icon");
        classesParent.push(iconPosition);
        classesParent.push(iconValue);
    }

    const changeActive = (e : MouseEvent<HTMLLIElement>) =>{
        const idClicked : number | null = ((e.currentTarget.getAttribute("id") === null) ? null : Number(e.currentTarget.getAttribute("id")) )
        if(idClicked !== null){
            let copyArray = [...selectLinks];
            for(let i = 0; i < selectLinks.length; i++){
                if(selectLinks[i].value === activeSelectLink[0].value){
                    copyArray[i].isDisabled = false;
                    break;
                }
            }
            copyArray[idClicked].isDisabled = true;
            setSelectLinks(copyArray);
        }
    }

    const showSelect = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) =>{
        dispatch(optionsSwapIsActiveAction(id, parentType));
    }

    return(
        <div className={classesParent.join(" ")} onClick={(e) => e.stopPropagation()} ref={parent}>
            <div className={classesInner.join(" ")}>
                <div className="item-inputs-options__select select-options">
                    <button 
                        className="select-options__opener" type="button" 
                        onClick={(e) => showSelect(e)} 
                        onFocus={() => parent.current?.classList.add("_focus")}
                        onBlur={() => parent.current?.classList.remove("_focus")}
                    >{activeSelectLink[0].value}</button>
                    <div className="select-options__list list-select-options" style={{
                        height: (listInner.current && isActive) ? listInner.current.offsetHeight : 0
                    }}>
                        <ul className="list-select-options__inner" ref={listInner}>
                            {selectLinks.map((link, index) =>
                            <li className="list-select-options__link" key={index} id={String(index)} onClick={(e) => changeActive(e)}>
                                {(link.isDisabled) ? 
                                    <button disabled type="button">{link.value}</button> : 
                                    <button type="button" onFocus={(e) => showSelect(e)}>{link.value}</button>}
                            </li>)}
                        </ul>
                    </div>
                </div>
                <h4 className="item-inputs-options__title"><span>{title}</span></h4>
            </div>
        </div>
    )
}