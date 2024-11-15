import React, { FC, Fragment, useEffect, useRef, useState } from "react"; 
import { navbarSetActiveAction } from "../../../store/configurate/navbarReducer";
import { contentPart } from "../../../types";
import { useDispatch } from "react-redux";
import { toggleState } from "../../../helperFunctions";
 
interface navbarRadiosProps{
    title : string,
    itemsLabel : string[],
    currentActive : number,
    groupId : number,
    contentType : contentPart
}

export const NavbarRadios : FC<navbarRadiosProps> = ({title, itemsLabel, currentActive, groupId, contentType}) =>{ 
    const dispatch = useDispatch();

    let [isActive, setIsActive] = useState<boolean>(true);
    let spoilerInner = useRef<HTMLDivElement>(null);
    let [spoilerHeight, setSpoilerHeight] = useState<number>(0);
    useEffect(() => {
        if(spoilerInner.current){
            setSpoilerHeight(spoilerInner.current.offsetHeight);
        }
    }, [])

    let classes = ["navbar__item", "item-navbar", "navbar__radios", "radios-navbar"]
    if(isActive){
        classes.push("_active");
    }

    if(itemsLabel.length !== 0 && title !== ""){
        return( 
            <fieldset className={classes.join(" ")}>
                <div className="item-navbar__inner radios-navbar__inner">
                    <legend className="item-navbar__title radios-navbar__title">
                        <button 
                            className="item-navbar__opener radios-navbar__opener icon-arrow_bottom" 
                            onClick={() => toggleState({value: isActive, set: setIsActive})} type="button"
                        >
                            <span>{title}</span>
                        </button>
                    </legend>   
                    <div className="item-navbar__filters radios-navbar__filters" style={{
                        height: (isActive) ? spoilerHeight : 0
                    }}>
                        <div className="item-navbar__filters-inner radios-navbar__filters-inner" ref={spoilerInner}>
                            {itemsLabel.map((label, i) => 
                                <div className="item-navbar__filter radios-navbar__filter" key={i}>
                                    <div className="radios-navbar__filter-inner">
                                        <input 
                                            className="item-navbar__radio" type="radio" 
                                            name={String(groupId)} id={String(groupId) + "." + i + "_radio"} 
                                            checked={(currentActive === i)}
                                            onChange={() => dispatch(navbarSetActiveAction(contentType, groupId, i))}
                                        />
                                        <label className="item-navbar__subradio" htmlFor={String(groupId) + "." + i + "_radio"}>
                                            <span>{label}</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>     
            </fieldset> 
        )
    } 
    return <Fragment />
}
