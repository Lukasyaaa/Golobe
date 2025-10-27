import React, { type FC, Fragment, useEffect, useRef, type MouseEvent, useState } from "react";
import type { useStateReturned } from "../../../types";
import { UnActiveSelectLink } from "./UnActiveLink";
import { ActiveSelectLink } from "./ActiveLink";

interface SelectProps{
    description : null | string,
    links : string[],
    isOpened : useStateReturned<boolean>,
    activeLink : useStateReturned<number>,
    onMouseEnterHandler : (() => void) | undefined,
    onFocusHandler : (() => void) | undefined,
    onMouseLeaveHandler : ((e : MouseEvent<HTMLButtonElement>) => void) | undefined,
    onBlurHandler : (() => void) | undefined
}

export const Select : FC<SelectProps> = (
    {description, links, isOpened, activeLink, onMouseEnterHandler, onFocusHandler, onMouseLeaveHandler, onBlurHandler}
) => {
    const [isOpenedValue, setIsOpened] = isOpened;
    const [activeLinkValue, setActiveLink] = activeLink;    

    let list = useRef<HTMLUListElement>(null);
    let container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const listHTML = list.current;
        const containerHTML = container.current;
        if(listHTML && containerHTML){
            if(isOpenedValue){
                containerHTML.style.height = listHTML.offsetHeight + "px";
            } else {
                containerHTML.style.height = 0 + "px";
            }
        }
    }, [isOpenedValue]);

    let isHoveredOnUnActive = useState<boolean>(false);
    useEffect(() => {
        const listHTML = list.current;
        if(listHTML){
            if(isHoveredOnUnActive[0]){
                listHTML.classList.add("_hide-active");
            } else {
                listHTML.classList.remove("_hide-active");
            }
        }
    }, [isHoveredOnUnActive[0]]);
    const makeIsHoveredOnUnActive = () => {
        isHoveredOnUnActive[1](true);
    }
    const unMakeIsHoveredOnUnActive = () => {
        isHoveredOnUnActive[1](false);
    }
    
    const toggleIsOpened = () => setIsOpened(prev => !prev);
    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    const getCondition = (i : number, mainPos : number, nearPos : number) => {
        //mainPos = {0, length - 1}, nearPos = {1, length - 2}
        return (i === mainPos && activeLinkValue !== mainPos) || (i === nearPos && activeLinkValue === mainPos);
    }

    return(
        <Fragment>
            <button 
                className="select-fieldset-options__opener" type="button" onClick={toggleIsOpened}
                onMouseEnter={onMouseEnterHandler} onFocus={onFocusHandler} 
                onMouseLeave={onMouseLeaveHandler} onBlur={onBlurHandler}
            >
                <span>{(description !== null) ? description : links[activeLinkValue]}</span>
                <div className="select-fieldset-options__icon-parent">
                    <svg className="select-fieldset-options__icon" width="15" height="8.25" fill="none">
                        <path
                            d="M 0.75,0.75 7.5,7.5 14.25,0.75"
                            stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                        />
                    </svg>
                </div>
            </button>
            <div className="select-fieldset-options__container" ref={container}>
                <ul className="select-fieldset-options__list" ref={list}>
                    {links.map((link, i, {length}) => {
                        if(activeLinkValue === i){
                            return(
                                <ActiveSelectLink key={i} description={link}/>
                            )
                        } else {
                            return(
                                <UnActiveSelectLink 
                                    key={i} description={link}
                                    onFocusHandler={() => {
                                        makeIsHoveredOnUnActive();
                                        if(getCondition(i, 0, 1)) open()
                                    }} 
                                    onBlurHandler={() => {
                                        unMakeIsHoveredOnUnActive();
                                        if(getCondition(i, length - 1, length - 2)) close();
                                    }}
                                    onClickHandler={() => setActiveLink(i)} 
                                    onMouseEnterHandler={makeIsHoveredOnUnActive} 
                                    onMouseLeaveHandler={unMakeIsHoveredOnUnActive}
                                />
                            )
                        }
                    })}
                </ul>
            </div>
        </Fragment>
    )
}