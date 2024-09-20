import React, { FC, useRef, useState, FocusEvent, MouseEvent } from "react";
import { selectValue, setter } from "../../types";
import { makeActiveState, makePseudoActive, makeUnActiveState, makeUnPseudoActive, toggleState } from "../../helperFunctions";

interface selectReplaceProps{
    parentClasses : string[],
    links : selectValue,
    isActive : setter<boolean>,
    makeSelectPseudoActive? : () => void | undefined
    unMakeSelectPseudoActive? : (e : FocusEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => void | undefined
}

export const SelectReplace : FC<selectReplaceProps> = ({parentClasses, links, isActive, makeSelectPseudoActive, unMakeSelectPseudoActive}) => {
    let selectInner = useRef<HTMLUListElement>(null);
    let [activeLink, setActiveLink] = useState<number>(links.startActive);

    return(
        <div 
            className={
                parentClasses.map(cl => cl + "__select").join(" ") + " " + parentClasses.map(cl => "select-" + cl).join(" ") + 
                " select icon-arrow_bottom" + ((isActive.value) ? " _active" : "")
            }
        >
            <button 
                className={parentClasses.map(cl => "select-" + cl + "__opener").join(" ") + " select__opener"}
                type="button" onClick={() => toggleState(isActive)} 
                onMouseEnter={makeSelectPseudoActive} onFocus={makeSelectPseudoActive} onBlur={unMakeSelectPseudoActive}
                onMouseLeave={unMakeSelectPseudoActive}
            >
                {links.items[links.startActive]}
            </button>
            <div 
                className={parentClasses.map(cl => "select-" + cl + "__list").join(" ") + " select__list"}
                style={{height: (isActive.value) ? ((selectInner.current) ? selectInner.current.offsetHeight : "auto") : 0}}
            >
                <ul className={parentClasses.map(cl => "select-" + cl + "__list-inner").join(" ") + " select__list-inner"} ref={selectInner}>
                    {links.items.map((linkText, i, linksArr) => {
                        if(i === activeLink){
                            return(
                                <li 
                                    className={
                                        parentClasses.map(cl => "select-" + cl + "__link").join(" ") + " select__link _active"
                                    }
                                    key={i}
                                >
                                    <span 
                                        className={parentClasses.map(cl => "select-" + cl + "__link-inner").join(" ") + " select__link-inner"}
                                    >
                                        {linkText}
                                    </span>
                                </li>
                            )
                        }
                        return(
                            <li 
                                className={
                                    parentClasses.map(cl => "select-" + cl + "__link").join(" ") + " select__link"
                                }
                                key={i}
                            >
                                <button 
                                    className={parentClasses.map(cl => "select-" + cl + "__link-inner").join(" ") + " select__link-inner"}
                                    type="button" onClick={() => setActiveLink(i)} 
                                    onFocus={(e) => {
                                        if(i === 0 || (activeLink === 0 && i === 1)){
                                            makeActiveState(isActive);
                                        }
                                        makePseudoActive(e, selectInner);
                                    }} 
                                    onMouseEnter={(e) => makePseudoActive(e, selectInner)}
                                    onBlur={(e) => {
                                        if(i === linksArr.length - 1 || (activeLink === linksArr.length - 1 && i === linksArr.length - 2)){
                                            makeUnActiveState(isActive)
                                        }
                                        makeUnPseudoActive(e, selectInner);
                                    }} 
                                    onMouseLeave={(e) => {
                                        if(e.target !== document.activeElement){
                                            makeUnPseudoActive(e, selectInner);
                                        }
                                    }}
                                >
                                    {linkText}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}