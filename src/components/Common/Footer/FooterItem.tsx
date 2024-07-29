import React, { FC, useRef, useEffect, useState, MouseEvent, FocusEvent } from "react";
import { footerItem, footerLink } from "../../../types";
import { useDispatch } from "react-redux";
import { footerSwapActiveAction } from "../../../store/common/footerReducer";

interface FooterItemProps{
    id : number,
    about : footerItem
}

export const FooterItem : FC<FooterItemProps> = ({id, about}) =>{
    let listInner = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();

    let [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () : void => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleList = () : void =>{
        dispatch(footerSwapActiveAction(id));
    }

    const listClasses : string[] = ["main-footer__item", "item-main-footer"];
    if(about.isActive){
        listClasses.push("_active");
    }

    return(
        <div className={listClasses.join(" ")} onClick={(e) => e.stopPropagation()}>
            {(windowWidth <= 480) ? <button 
                className="item-main-footer__title" type="button" onClick={toggleList}
            >{about.title}</button> 
            : <h2 className="item-main-footer__title">{about.title}</h2>}
            <div 
                className="item-main-footer__list" 
                style={{height: (listInner.current && about.isActive) ? 
                    listInner.current.offsetHeight : ((windowWidth <= 480) ? 0 : "auto")}}
            >
                <ul className="item-main-footer__list-inner" ref={listInner}>
                    {about.list.map((link, i) => {
                        if(i === 0){
                            return(
                                <li className="item-main-footer__link" key={i}>
                                    <a href={link.href} onFocus={toggleList} onClick={(e) => e.stopPropagation()}>{link.value}</a>
                                </li>
                            )
                        }
                        if(i === about.list.length - 1){
                            return(
                                <li className="item-main-footer__link" key={i}>
                                    <a href={link.href} onBlur={toggleList} onClick={(e) => e.stopPropagation()}>{link.value}</a>
                                </li>
                            )
                        }
                        return(
                            <li className="item-main-footer__link" key={i}>
                                <a href={link.href} onClick={(e) => e.stopPropagation()}>{link.value}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}