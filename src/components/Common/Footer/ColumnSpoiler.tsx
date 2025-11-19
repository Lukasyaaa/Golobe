import React, { useEffect, useRef, useState, type FC } from "react";
import type { Column } from "../../../store/footer";

export const ColumnSpoiler : FC<Column> = ({title, links}) => {
    let [isOpened, setIsOpened] = useState<boolean>(false);
    let list = useRef<HTMLUListElement>(null);
    let container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const listHTML = list.current;
        const containerHTML = container.current;
        if(listHTML && containerHTML){
            if(isOpened){
                containerHTML.style.height = listHTML.offsetHeight + "px";
            } else {
                containerHTML.style.height = 0 + "px";
            }
        }
    }, [isOpened])

    const toggleIsOpened = () => {
        setIsOpened(prev => !prev);
    }

    return(
        <div className="footer__column column-footer">
            <button className="column-footer__description" type="button" onClick={toggleIsOpened}>
                {title}
            </button>
            <div className="column-footer__container" ref={container}>
                <ul className="column-footer__list" ref={list}>
                    {links.map((link, j) => 
                        <li className="column-footer__link" key={j}>
                            <a className="column-footer__link-text" href={link.path}>
                                {link.description}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}