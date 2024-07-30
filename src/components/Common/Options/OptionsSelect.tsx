import React, { FC, useRef, useState, MouseEvent, FocusEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { optionIconPosition, optionsItemsType } from "../../../types";
import { optionsSetActiveSelectLink, optionsSwapActiveAction } from "../../../store/common/optionsReducer";


interface OptionsSelectProps{
    id : number,
    title : string,
    iconValue : string | null,
    iconPosition : optionIconPosition,
    parentType : optionsItemsType,
    isBigger: boolean,
    links : string[],
    activeLink : number,
    isActive : boolean,
}

export const OptionsSelect : FC<OptionsSelectProps> = ({id, title, iconValue, iconPosition, parentType, isBigger, links, activeLink, isActive}) =>{
    let [selectLinks, setSelectLinks] = useState<string[]>(links);
    let activeSelectLink : string = selectLinks[activeLink];
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

    const changeActive = (e : MouseEvent<HTMLButtonElement>, idLink : number, idSelect : number) =>{
        e.stopPropagation();
        makeUnPseudoActive(e);
        dispatch(optionsSetActiveSelectLink(idLink, idSelect, parentType))
    }

    const dispatch = useDispatch();
    const toggleSelect = () =>{
        dispatch(optionsSwapActiveAction(id, parentType));
    }

    const makePseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) =>{
        if(listInner.current){
            listInner.current.classList.add("_hide-active");
            e.currentTarget.classList.add("_hovered");
        }
    }
    const makeUnPseudoActive = (e : MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>) =>{
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
                        onClick={(e) => {e.stopPropagation(); toggleSelect()}} 
                        onFocus={() => parent.current?.classList.add("_focus")}
                        onBlur={() => parent.current?.classList.remove("_focus")}
                    >{activeSelectLink}</button>
                    <div className="select-options__list list-select-options" style={{
                        height: (listInner.current && isActive) ? listInner.current.offsetHeight : 0
                    }}>
                        <ul className="list-select-options__inner" ref={listInner}>
                            {selectLinks.map((link, i) => {
                                if(i === activeLink){
                                    return(                            
                                        <li className="list-select-options__link _active" key={i}>
                                            <span>{link}</span>
                                        </li>
                                    )
                                }
                                return(                            
                                    <li className="list-select-options__link" key={i}>
                                        <button 
                                            type="button" 
                                            onClick={(e) => changeActive(e, i, id)}
                                            onFocus={(e) => {
                                                makePseudoActive(e);
                                                if((i === 0 || activeLink === i -1) && !isActive){
                                                    toggleSelect(); 
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if(i === selectLinks.length - 1 || 
                                                (activeLink === selectLinks.length - 1 && i === activeLink - 1)){
                                                    toggleSelect();
                                                }
                                                makeUnPseudoActive(e)
                                            }} 
                                            onMouseEnter={makePseudoActive} onMouseLeave={(e) => {
                                                if(document.activeElement !== e.target){
                                                    makeUnPseudoActive(e);
                                                }
                                            }}
                                        >
                                            {link}
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