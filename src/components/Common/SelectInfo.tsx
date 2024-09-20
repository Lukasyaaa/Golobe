import React, { FC, Fragment, ReactElement, useRef, useState } from "react";
import { defaultSelect } from "../../types";
import { JsxElement } from "typescript";

interface selectInfoProps{
    about : defaultSelect,
    parentClasses : string[]
}

export const SelectInfo : FC<selectInfoProps> = ({about, parentClasses}) =>{
    let [isActive, setIsActive] = useState(false);
    let listInner = useRef<HTMLUListElement>(null);

    const showSpoiler = () : void =>{
        setIsActive(true);
    }
    const unShowSpoiler = () : void =>{
        setIsActive(false);
    }
    const toggleSpoiler = () : void =>{
        setIsActive(prev => !prev);
    }

    let classes = [parentClasses.map(cl => cl + "__select").join(" "), parentClasses.map(cl => "select-" + cl).join(" "), "select_info"];
    if(isActive){
        classes.push("_active");
    }
    return(
        <li className={classes.join(" ")}>
            <button 
                className={parentClasses.map(cl => "select-" + cl + "__title").join(" ") + " select_info__title"} 
                type="button" onClick={toggleSpoiler}
            >
                {about.title}
            </button>
            <div 
                className={parentClasses.map(cl => "select-" + cl + "__list").join(" ") + " select_info__list"}
                style={{height: (isActive) ? ((listInner.current) ? listInner.current.offsetHeight : "auto") : 0}}
            >
                <ul className={parentClasses.map(cl => "select-" + cl + "__list-inner").join(" ") + " select_info__list-inner"} ref={listInner}>
                    {about.links.map((link, i) => {
                        if(i === 0){
                            return(
                                <li className={parentClasses.map(cl => "select-" + cl + "__link").join(" ") + " select_info__link"} key={i}>
                                    <a 
                                        className={parentClasses.map(cl => "select-" + cl + "__link-inner").join(" ") + " select_info__link-inner"} 
                                        href={link.path} onFocus={showSpoiler}
                                    >
                                        {link.description}
                                    </a>
                                </li>
                            )
                        }else if(i === about.links.length - 1){
                            return(
                                <li className={parentClasses.map(cl => "select-" + cl + "__link").join(" ") + " select_info__link"} key={i}>
                                    <a 
                                        className={parentClasses.map(cl => "select-" + cl + "__link-inner").join(" ") + " select_info__link-inner"} 
                                        href={link.path}
                                    >
                                        {link.description}
                                    </a>
                                </li>
                            )
                        }
                        return(
                            <li className={parentClasses.map(cl => "select-" + cl + "__link").join(" ") + " select_info__link"} key={i}>
                                <a 
                                    className={parentClasses.map(cl => "select-" + cl + "__link-inner").join(" ") + " select_info__link-inner"} 
                                    href={link.path} onBlur={unShowSpoiler}
                                >
                                    {link.description}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </li>
    )
}