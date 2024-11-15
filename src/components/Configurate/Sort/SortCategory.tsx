import React, { FC, forwardRef, MouseEvent } from "react";
import { contentPart, link, setter, sortFlightsCategory, sortHotelsCategory } from "../../../types";
import { useDispatch } from "react-redux";
import { sortSetActiveAction } from "../../../store/configurate/sortReducer";
import { makePseudoActive, makeUnPseudoActive } from "../../../helperFunctions";
import { NavLink } from "react-router-dom";
import { sharedLink } from "./Sort";

interface sortCategoryFlightsProps{
    contentType : contentPart.Flights,
    about : sortFlightsCategory,
    id : number,
    isActive : boolean,
    containerRef : React.RefObject<HTMLDivElement>
}
interface sortCategoryHotelsProps{
    contentType : contentPart.Hotels,
    about : sortHotelsCategory,
    id : number,
    isActive : boolean,
    containerRef : React.RefObject<HTMLDivElement>
}

interface sortLinkActiveProps{
    isLink : true,
    contentType : null,
    parenClasses : string[],
    about : sharedLink,
    isActive : false,
    containerRef : React.RefObject<HTMLDivElement>
}
interface sortLinkDisabledProps{
    isLink : true,
    contentType : null,
    parenClasses : string[],
    about : string,
    isActive : true
}

interface sortCategoryActiveProps{
    isLink : false,
    contentType : null,
    parenClasses : string[],
    about : string,
    id : number,
    isActive : false,
    containerRef : React.RefObject<HTMLDivElement>,
    activeNumber : setter<number>
}
interface sortCategoryDisabledProps{
    isLink : false,
    contentType : null,
    parenClasses : string[],
    about : string,
    isActive : true
}

export const SortCategory = forwardRef<
    HTMLDivElement, sortCategoryFlightsProps | sortCategoryHotelsProps | sortLinkActiveProps | sortLinkDisabledProps |
    sortCategoryActiveProps | sortCategoryDisabledProps
>((props, ref) => {
    const dispatch = useDispatch();

    if(props.contentType === null){
        if(props.isLink){
            if(props.isActive){
                return(
                    <div 
                        className={
                            props.parenClasses.map(cl => cl + "__item").join(" ") + " sort__item " + 
                            props.parenClasses.map(cl => "item-" + cl).join(" ") + " item-sort _active"
                        }
                    >
                        <span>{props.about}</span>
                    </div>  
                )
            }
            if(!props.about.isActive){
                return(
                    <div 
                        className={
                            props.parenClasses.map(cl => cl + "__item").join(" ") + " sort__item " + 
                            props.parenClasses.map(cl => "item-" + cl).join(" ") + " item-sort _disabled"
                        }
                    >
                        <span>{props.about.description}</span>
                    </div>  
                ) 
            }
            return(
                <NavLink 
                    className={
                        props.parenClasses.map(cl => cl + "__item").join(" ") + " sort__item " + 
                        props.parenClasses.map(cl => "item-" + cl).join(" ") + " item-sort"
                    } to={props.about.path}
                    onFocus={(e) => makePseudoActive(e, props.containerRef)} onBlur={(e) => makeUnPseudoActive(e, props.containerRef)}
                    onMouseEnter={(e) => makePseudoActive(e, props.containerRef)} onMouseLeave={(e) => {
                        if(e.target !== document.activeElement){
                            makeUnPseudoActive(e, props.containerRef);
                        }
                    }}
                >
                    <span>{props.about.description}</span>
                </NavLink>
            )
        }
        if(props.isActive){
            return(
                <div 
                    className={
                        props.parenClasses.map(cl => cl + "__item").join(" ") + " sort__item " + 
                        props.parenClasses.map(cl => "item-" + cl).join(" ") + " item-sort _active"
                    }
                >
                    <span>{props.about}</span>
                </div>  
            )
        }
        return(
            <button 
                className={
                    props.parenClasses.map(cl => cl + "__item").join(" ") + " sort__item " + 
                    props.parenClasses.map(cl => "item-" + cl).join(" ") + " item-sort"
                } type="button"
                onClick={() => {
                    props.activeNumber.set(props.id);
                    if(props.containerRef.current){
                        props.containerRef.current.classList.remove("_hide-active");
                    }
                }}
                onFocus={(e) => makePseudoActive(e, props.containerRef)} onBlur={(e) => makeUnPseudoActive(e, props.containerRef)}
                onMouseEnter={(e) => makePseudoActive(e, props.containerRef)} onMouseLeave={(e) => {
                    if(e.target !== document.activeElement){
                        makeUnPseudoActive(e, props.containerRef);
                    }
                }}
            >
                <span>{props.about}</span>
            </button>
        )
    }

    const setActive = (e : MouseEvent<HTMLButtonElement>) => {
        dispatch(sortSetActiveAction(props.contentType, props.id));
        makeUnPseudoActive(e, props.containerRef)
    }

    if(props.contentType === contentPart.Flights){
        let daysPart = (props.about.subtitle.flyTime / 1440 >= 1) ? Math.floor(props.about.subtitle.flyTime / 1440) + "d" : "";
        let hoursPart = Math.floor(props.about.subtitle.flyTime / 60 % 24) + "h";
        let minutesPart = props.about.subtitle.flyTime % 60 + "m"
        if(props.isActive){
            return(
                <div className="sort-flights__item item-sort-flights sort__item item-sort _active">
                    <h3 className="item-sort-flights__title item-sort__title">{props.about.title}</h3>
                    <div className="item-sort-flights__subtitle item-sort__subtitle">
                        {`$${props.about.subtitle.price} . ${daysPart} ${hoursPart} ${minutesPart}`}
                    </div>
                </div>  
            )
        }
        return(
            <button 
                className="sort-flights__item item-sort-flights sort__item item-sort" type="button"
                onClick={setActive} 
                onFocus={(e) => makePseudoActive(e, props.containerRef)} onBlur={(e) => makeUnPseudoActive(e, props.containerRef)}
                onMouseEnter={(e) => makePseudoActive(e, props.containerRef)} onMouseLeave={(e) => {
                    if(e.target !== document.activeElement){
                        makeUnPseudoActive(e, props.containerRef);
                    }
                }}
            >
                <h3 className="item-sort-flights__title item-sort__title">{props.about.title}</h3>
                <div className="item-sort-flights__subtitle item-sort__subtitle">
                    {`$${props.about.subtitle.price} . ${daysPart} ${hoursPart} ${minutesPart}`}
                </div>
            </button>
        )
    }
    if(props.isActive){
        return(
            <div className="sort-hotels__item item-sort-hotels sort__item item-sort _active">
                <h3 className="item-sort-hotels__title item-sort__title">{props.about.title}</h3>
                <div className="item-sort-hotels__subtitle item-sort__subtitle">
                    {props.about.subtitle + " places"}
                </div>
            </div>
        )
    }
    return(
        <button 
            className="sort-hotels__item item-sort-hotels sort__item item-sort" type="button"
            onClick={setActive} 
            onFocus={(e) => makePseudoActive(e, props.containerRef)} onBlur={(e) => makeUnPseudoActive(e, props.containerRef)}
            onMouseEnter={(e) => makePseudoActive(e, props.containerRef)} onMouseLeave={(e) => {
                if(e.target !== document.activeElement){
                    makeUnPseudoActive(e, props.containerRef);
                }
            }}
        >
            <h3 className="item-sort-hotels__title item-sort__title">{props.about.title}</h3>
            <div className="item-sort-hotels__subtitle item-sort__subtitle">
                {props.about.subtitle + " places"}
            </div>
        </button>
    )
})