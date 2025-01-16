import React, { FC, Fragment, useState, useRef, MouseEvent } from "react";
import { makePseudoActive, unMakePseudoActive} from "../../helperFunctions.ts"

interface SelectProps{
    classes : string[],
    links : string[],
    startActive : number,
}

export const Select : FC<SelectProps> = ({classes, links, startActive}) => {
    let [isActive, setIsActive] = useState<boolean>(false);
    const toggleList = (e) => {
        e.stopPropagation();
        setIsActive(!isActive);
    }
    const showList = () => {
        setIsActive(true);
    }
    const hideList = () => {
        setIsActive(false);
    }

    let listElement = useRef<HTMLUListElement>(null);
    let [choosed, setChoosed] = useState<number>(startActive);
    const setChoosedLink = (e : MouseEvent<HTMLButtonElement>, id : number) => {
        e.stopPropagation();
        setChoosed(id);
    }
    
    let openerClasses = [classes.map(cl => cl + "__opener"), "select__opener", "icon-arrow_bottom"];
    let containerClasses = [classes.map(cl => cl + "__container"), "select__container"];
    if(isActive){
        openerClasses.push("_active");
        containerClasses.push("_active");
    }

    return(
        <Fragment>
            <button className={openerClasses.join(" ")} type="button" onClick={toggleList}>
                <span>{links[choosed]}</span>
            </button>
            <div className={containerClasses.join(" ")} style={{
                height: (isActive) ? ((listElement.current) ? listElement.current.offsetHeight : "auto") : 0
            }}>
                <ul className={classes.map(cl => cl + "__list") +  " select__list"} ref={listElement}>
                    {links.map((link, i) => {
                        if(i === choosed){
                            return(
                                <li 
                                    key={i} className={classes.map(cl => cl + "__link") + " select__link _active"}
                                >
                                    <span>{link}</span>
                                </li>
                            );
                        }
                        const isFirst : boolean = (i === 0 || (i === 1 && choosed === 0));
                        const isLast : boolean = (i === links.length - 1 || (i === links.length - 2 && choosed === links.length - 1));
                        return(
                            <li key={i} className={classes.map(cl => cl + "__link") + " select__link"}>
                                <button                                     
                                    onFocus={
                                        (isFirst) ? (e) => {makePseudoActive(e, listElement); showList()} : undefined
                                    }
                                    onBlur={
                                        (isLast) ? (e) => {unMakePseudoActive(e, listElement); hideList()} : undefined
                                    }
                                    onMouseEnter={(e) => makePseudoActive(e, listElement)} onMouseLeave={(e) => {
                                        if(e.target !== document.activeElement){
                                            unMakePseudoActive(e, listElement);
                                        }
                                    }}
                                    onClick={(e) => setChoosedLink(e, i)}
                                >
                                    {link}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Fragment>
    )
}