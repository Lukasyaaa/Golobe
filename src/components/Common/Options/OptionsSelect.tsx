import React, { FC, useRef, useState, MouseEvent, FocusEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { optionsSelectLink, optionIconPosition, optionsItemsType } from "../../../types";
import { optionsSwapActiveAction } from "../../../store/common/optionsReducer";


interface OptionsSelectProps{
    id : number,
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    parentType : optionsItemsType,
    isBigger: boolean,
    links : optionsSelectLink[],
    isActive : boolean,
}

export const OptionsSelect : FC<OptionsSelectProps> = ({id, title, iconValue, iconPosition, parentType, isBigger, links, isActive}) =>{
    let [selectLinks, setSelectLinks] = useState<optionsSelectLink[]>(links);
    let activeSelectLink : optionsSelectLink[] = selectLinks.filter(selectLink => selectLink.isDisabled);
    let listInner = useRef<HTMLUListElement>(null);

    useEffect(() =>{
        setSelectLinks(links);
    }, [links]);

    let classesParent = ["inputs-options__item", "item-inputs-options", "select"];
    let classesInner = ["item-inputs-options__inner", "_icon-arrow-bottom"];
    if(parentType === optionsItemsType.Hotels){
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

    const dispatch = useDispatch();
    const toggleSelect = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) =>{
        dispatch(optionsSwapActiveAction(id, parentType));
    }

    const makePseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) =>{
        if(listInner.current){
            listInner.current.classList.add("_hide-active");
            e.currentTarget.classList.add("_hovered");
        }
    }
    const makeUnPseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) =>{
        if(listInner.current){
            listInner.current.classList.remove("_hide-active");
            e.currentTarget.classList.remove("_hovered");
        }
    }

    let parent = useRef<HTMLDivElement>(null);
    return(
        <div className={classesParent.join(" ")} onClick={(e) => e.stopPropagation()} ref={parent}>
            <div className={classesInner.join(" ")}>
                <div className="item-inputs-options__select select-options">
                    <button 
                        className="select-options__opener" type="button" 
                        onClick={(e) => {e.stopPropagation(); toggleSelect(e)}} 
                        onFocus={() => parent.current?.classList.add("_focus")}
                        onBlur={() => parent.current?.classList.remove("_focus")}
                    >{activeSelectLink[0].value}</button>
                    <div className="select-options__list list-select-options" style={{
                        height: (listInner.current && isActive) ? listInner.current.offsetHeight : 0
                    }}>
                        <ul className="list-select-options__inner" ref={listInner}>
                            {selectLinks.map((link, i) => {
                                if(link.isDisabled){
                                    return(                            
                                        <li className="list-select-options__link" key={i} id={String(i)}>
                                            <span>{link.value}</span>
                                        </li>
                                    )
                                }
                                return(                            
                                    <li className="list-select-options__link" key={i} id={String(i)} onClick={(e) => changeActive(e)}>
                                        <button 
                                            type="button" 
                                            onFocus={(i === 0 || selectLinks[i-1].isDisabled) ? (e) => {
                                                toggleSelect(e); makePseudoActive(e)
                                            } : undefined}
                                            onBlur={(e) => {
                                                if(i === selectLinks.length - 1){
                                                    toggleSelect(e);
                                                }
                                                makeUnPseudoActive(e)
                                            }} 
                                            onMouseEnter={makePseudoActive} onMouseLeave={(e) => {
                                                if(document.activeElement !== e.target){
                                                    makeUnPseudoActive(e);
                                                }
                                            }}
                                        >
                                            {link.value}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <h4 className="item-inputs-options__title"><span>{title}</span></h4>
            </div>
        </div>
    )
}