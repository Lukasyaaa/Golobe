import React, { FC, useRef, useEffect, useState } from "react";
import { footerLink } from "../../../types";
import { useDispatch } from "react-redux";
import { footerChangeIsActiveAction } from "../../../store/footerReducer";

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

    const appearList = () =>{
        dispatch(footerChangeIsActiveAction(id));
    }

    return(
        <div className={listClasses.join(" ")} onClick={(e) => e.stopPropagation()}>
            <button className="item-main-footer__title" type="button" onClick={appearList}>{title}</button>
            <div 
                className="item-main-footer__list" 
                style={{height: (listInner.current && isActive) ? listInner.current.offsetHeight : ((windowWidth <= 480) ? 0 : "auto")}}
            >
                <ul className="item-main-footer__list-inner" ref={listInner}>
                    {list.map((link, index) => 
                        <li key={index} className="item-main-footer__link"><a href={link.href}>{link.value}</a></li>)
                    }
                </ul>
            </div>
        </div>
    )
}