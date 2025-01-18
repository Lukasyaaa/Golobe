import React, { FC, Fragment, useRef } from "react";
import { FooterColumn as FooterColumnInterface } from "../../../types";

interface FooterColumnProps{
    about : FooterColumnInterface
}

export const FooterColumn : FC<FooterColumnProps> = ({about}) => {
    let columnElement = useRef<HTMLDivElement>(null);
    let listParentElement = useRef<HTMLDivElement>(null);
    let listElement = useRef<HTMLUListElement>(null);

    if(window.innerWidth > 480){
        return(
            <div className="footer__column column-footer">
                <h3 className="column-footer__title">
                    {about.title}
                </h3>
                <ul className="column-footer__list" ref={listElement}>
                    {about.links.map((link, i) => 
                        <li className="column-footer__link" key={i}>
                            <a href={link.path} onClick={(e) => e.stopPropagation()}>
                                <span>{link.description}</span>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

    const toggleLinks = (e) => {
        e.stopPropagation()
        if(columnElement.current && listParentElement.current && listElement.current){
            columnElement.current.classList.toggle("_active");
            if(columnElement.current.classList.contains("_active")){
                listParentElement.current.style.height = listElement.current.offsetHeight + "px";
            } else {

                listParentElement.current.style.height = "";
            }
        }
    }
    const showLinks = (e) => {
        if(columnElement.current && listParentElement.current && listElement.current){
            listParentElement.current.style.height = listElement.current.offsetHeight + "px";
            columnElement.current.classList.add("_active");
        }
    }
    const hideLinks = () => {
        if(columnElement.current && listParentElement.current){
            listParentElement.current.style.height = "";
            columnElement.current.classList.remove("_active");
        }
    }

    return(
        <div className="footer__column column-footer" ref={columnElement}>
            <button className="column-footer__title" type="button" onClick={toggleLinks}>
                {about.title}
            </button>
            <div className="column-footer__list-parent" ref={listParentElement}>
                <ul className="column-footer__list" ref={listElement}>
                    <li className="column-footer__link">
                        <a href={about.links[0].path} onFocus={showLinks} onClick={(e) => e.stopPropagation()}>
                            <span>{about.links[0].description}</span>
                        </a>
                    </li>
                    {about.links.slice(1, -1).map((link, i) => 
                        <li className="column-footer__link" key={i}>
                            <a href={link.path} onClick={(e) => e.stopPropagation()}>
                                <span>{link.description}</span>
                            </a>
                        </li>
                    )}
                    <li className="column-footer__link">
                        <a href={about.links[about.links.length - 1].path} onBlur={hideLinks} onClick={(e) => e.stopPropagation()}>
                            <span>{about.links[about.links.length - 1].description}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}