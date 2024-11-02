import React, { FC, useRef, useState, FocusEvent, MouseEvent } from "react";
import { setter } from "../../../types";
import { makeActiveState, makePseudoActive, makeUnActiveState, makeUnPseudoActive, toggleState } from "../../../helperFunctions";

interface selectReplaceProps{
    parentClasses : string[],
    links : string[],
    activeLink : setter<number>
    isActive : setter<boolean>,
    title : null | string,
    makeSelectPseudoActive? : () => void | undefined
    unMakeSelectPseudoActive? : (e : FocusEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => void | undefined
}

export const SelectReplace : FC<selectReplaceProps> = ({parentClasses, links, activeLink, isActive, title, makeSelectPseudoActive, unMakeSelectPseudoActive}) => {
    let selectInner = useRef<HTMLUListElement>(null);

    return(
        <div 
            className={
                parentClasses.map(cl => cl + "__select").join(" ") + " " + parentClasses.map(cl => "select-" + cl).join(" ") + 
                " select" + ((isActive.value) ? " _active" : "")
            }
        >
            <button 
                className={parentClasses.map(cl => "select-" + cl + "__opener").join(" ") + " select__opener icon-arrow_bottom"}
                type="button" onClick={() => toggleState(isActive)} 
                onMouseEnter={makeSelectPseudoActive} onFocus={makeSelectPseudoActive} onBlur={unMakeSelectPseudoActive}
                onMouseLeave={unMakeSelectPseudoActive}
            >
                <span>{(title !== null) ? title : links[activeLink.value]}</span>
            </button>
            <div 
                className={parentClasses.map(cl => "select-" + cl + "__list").join(" ") + " select__list"}
                style={{height: (isActive.value) ? ((selectInner.current) ? selectInner.current.offsetHeight : "auto") : 0}}
            >
                <ul className={parentClasses.map(cl => "select-" + cl + "__list-inner").join(" ") + " select__list-inner"} ref={selectInner}>
                    {links.map((linkText, i, linksArr) => {
                        if(i === activeLink.value){
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
                                    type="button" onClick={(e) => {
                                        makeUnPseudoActive(e, selectInner);
                                        activeLink.set(i);
                                    }} 
                                    onFocus={(e) => {
                                        if(i === 0 || (activeLink.value === 0 && i === 1)){
                                            makeActiveState(isActive);
                                        }
                                        makePseudoActive(e, selectInner);
                                    }} 
                                    onMouseEnter={(e) => makePseudoActive(e, selectInner)}
                                    onBlur={(e) => {
                                        if(i === linksArr.length - 1 || (activeLink.value === linksArr.length - 1 && i === linksArr.length - 2)){
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