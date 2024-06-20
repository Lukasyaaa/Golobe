import React, { FC, useRef, useState, MouseEvent, useEffect } from "react";
import { optionsSelectLink } from "../../types/types";


interface OptionsSelectProps{
    title : string,
    iconValue : string | null,
    links : optionsSelectLink[]
}

export const OptionsSelect : FC<OptionsSelectProps> = ({title, iconValue, links}) =>{
    let [selectLinks, setSelectLinks] = useState<optionsSelectLink[]>(links);

    let item = useRef<HTMLDivElement>(null);
    let activeElement = useRef<HTMLButtonElement>(null);
    let listInner = useRef<HTMLUListElement>(null);
    let list = useRef<HTMLDivElement>(null);

    let classesParent = ["inputs-options__item", "item-inputs-options", "select"];
    let classesInner = ["item-inputs-options__inner"];
    if(iconValue){
        classesParent.push("with-icon");
        classesInner.push(iconValue);
    }

    const changeActive = (e : MouseEvent<HTMLLIElement>) =>{
        if(activeElement.current){
            const idClicked : number | null = ((e.currentTarget.getAttribute("id") === null) ? null : Number(e.currentTarget.getAttribute("id")) )
            if(idClicked){
                let copyArray = [...selectLinks];
                for(let link of selectLinks){
                    if(link.value === activeElement.current.innerText){
                        copyArray[idClicked].isDisabled = false;
                        break;
                    }
                }
                copyArray[idClicked].isDisabled = true;
                setSelectLinks(copyArray);
                activeElement.current.innerText = e.currentTarget.innerText;
            }
        }
    }

    const showSelect = (e : MouseEvent<HTMLButtonElement>) =>{
        if(item.current && list.current && listInner.current){
            item.current.classList.toggle("_active");
            if(item.current.classList.contains("_active")){
                list.current.style.height = `${listInner.current.offsetHeight}px`;
            }else{
                list.current.style.height = "0px"
            }
        }
    }

    return(
        <div className={classesParent.join(" ")} onClick={(e) => e.stopPropagation()} ref={item}>
            <div className={classesInner.join(" ")}>
                <div className="item-inputs-options__title">{title}</div>
                <div className="item-inputs-options__select select-options">
                    <button 
                        className="select-options__opener" type="button" ref={activeElement} onClick={(e) => showSelect(e)}
                    >{links[links.length - 1].value}</button>
                    <div className="select-options__list list-select-options" ref={list}>
                        <ul className="list-select-options__inner" ref={listInner}>
                            {selectLinks.map((link, index) =>
                            <li className="list-select-options__link" key={index} id={String(index)} onClick={(e) => changeActive(e)}>
                                {(link.isDisabled) ? 
                                    <button disabled type="button">{link.value}</button> : <button type="button">{link.value}</button>}
                            </li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}