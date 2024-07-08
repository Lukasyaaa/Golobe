import React, { FC, useRef, useEffect, useState, MouseEvent, FocusEvent } from "react";
import { footerLink } from "../../../types";
import { useDispatch } from "react-redux";
import { footerSwapIsActiveAction } from "../../../store/start/footerReducer";

interface FooterItemProps{
    id : number,
    title : string,
    list : footerLink[],
    isActive : boolean,
}

export const FooterItem : FC<FooterItemProps> = ({id, title, list, isActive}) =>{
    let listInner = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();

    const listClasses : string[] = ["main-footer__item", "item-main-footer"];
    if(isActive){
        listClasses.push("_active");
    }

    let [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleList = () =>{
        dispatch(footerSwapIsActiveAction(id));
    }

    return(
        <div className={listClasses.join(" ")} onClick={(e) => e.stopPropagation()}>
            {(windowWidth <= 480) ? <button className="item-main-footer__title" type="button" onClick={toggleList}>{title}</button> 
            : <h2 className="item-main-footer__title">{title}</h2>}
            <div 
                className="item-main-footer__list" 
                style={{height: (listInner.current && isActive) ? listInner.current.offsetHeight : ((windowWidth <= 480) ? 0 : "auto")}}
            >
                <ul className="item-main-footer__list-inner" ref={listInner}>
                    {list.map((link, index) => {
                        if(!index){
                            return(
                                <li key={index} className="item-main-footer__link">
                                    <a href={link.href} onFocus={toggleList}>{link.value}</a>
                                </li>
                            )
                        }
                        if(index === list.length - 1){
                            return(
                                <li key={index} className="item-main-footer__link">
                                    <a href={link.href} onBlur={toggleList}>{link.value}</a>
                                </li>
                            )
                        }
                        return(
                            <li key={index} className="item-main-footer__link">
                                <a href={link.href}>{link.value}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}