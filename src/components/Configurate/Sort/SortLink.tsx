import React, { FC, forwardRef } from "react";
import { contentPart, setter, sortFlightsCategory, sortHotelsCategory } from "../../../types";
import { useDispatch } from "react-redux";
import { sortReplaceAction } from "../../../store/configurate/sortReducer";
import { makeActiveState, makePseudoActive, makeUnActiveState, makeUnPseudoActive } from "../../../helperFunctions";
import { NavLink } from "react-router-dom";
import { sharedLink } from "./Sort";

interface sortFlightsLinkProps{
    contentType : contentPart.Flights,
    about : sortFlightsCategory,
    id : number,
    isActive : setter<boolean>,
    selectInner : React.RefObject<HTMLUListElement>,
    isLast : boolean
}
interface sortHotelsLinkProps{
    contentType : contentPart.Hotels,
    about : sortHotelsCategory,
    id : number,
    isActive : setter<boolean>,
    selectInner : React.RefObject<HTMLUListElement>,
    isLast : boolean
}

interface sortNavigationLinkProps{
    isLink : true,
    contentType : null,
    about : sharedLink,
    id : number,
    swap : (id : number) => void,
    isActive : setter<boolean>,
    selectInner : React.RefObject<HTMLUListElement>,
    isLast : boolean,
    parentClasses : string[]
}
interface sortLinkProps{
    isLink : false,
    contentType : null,
    about : string,
    id : number,
    swap : (id : number) => void,
    isActive : setter<boolean>,
    selectInner : React.RefObject<HTMLUListElement>,
    isLast : boolean,
    parentClasses : string[]
}

export const SortLink = forwardRef<
    HTMLUListElement, sortFlightsLinkProps | sortHotelsLinkProps | sortNavigationLinkProps | sortLinkProps
>((props, ref) => {
    const dispatch = useDispatch();
    
    if(props.contentType === null){
        if(props.isLink){
            return(
                <li 
                    className={
                        props.parentClasses.map(cl => "select-" + cl + "__link").join(" ") + " select-sort__link " + 
                        props.parentClasses.map(cl => "link-select-" + cl).join(" ") +
                        " link-select-sort select__link"
                    }
                >
                    {(props.about.isActive)
                        ? <NavLink 
                            className={
                                props.parentClasses.map(cl => "link-select-" + cl + "__inner").join(" ") + 
                                " link-select-sort__inner select__link-inner"
                            }
                            to={props.about.path}
                            onClick={() => props.swap(props.id)}
                            onFocus={(e) => {
                                if(props.id === 0){
                                    makeActiveState(props.isActive);
                                }
                                makePseudoActive(e, props.selectInner);
                            }} 
                            onMouseEnter={(e) => makePseudoActive(e, props.selectInner)}
                            onBlur={(e) => {
                                if(props.isLast){
                                    makeUnActiveState(props.isActive)
                                }
                                makeUnPseudoActive(e, props.selectInner);
                            }} 
                            onMouseLeave={(e) => {
                                if(e.target !== document.activeElement){
                                    makeUnPseudoActive(e, props.selectInner);
                                }
                            }}
                        >
                            <span>{props.about.description}</span>
                        </NavLink>
                        : <span 
                            className={
                                props.parentClasses.map(cl => "link-select-" + cl + "__inner").join(" ") + 
                                " link-select-sort__inner select__link-inner _disabled"
                            }
                            onClick={() => props.swap(props.id)}
                            onFocus={(e) => {
                                if(props.id === 0){
                                    makeActiveState(props.isActive);
                                }
                                makePseudoActive(e, props.selectInner);
                            }} 
                            onMouseEnter={(e) => makePseudoActive(e, props.selectInner)}
                            onBlur={(e) => {
                                if(props.isLast){
                                    makeUnActiveState(props.isActive)
                                }
                                makeUnPseudoActive(e, props.selectInner);
                            }} 
                            onMouseLeave={(e) => {
                                if(e.target !== document.activeElement){
                                    makeUnPseudoActive(e, props.selectInner);
                                }
                            }}
                        >
                            <span>{props.about.description}</span>
                        </span>
                    }
                </li>
            )
        }
        return(
            <li 
                className={
                    props.parentClasses.map(cl => "select-" + cl + "__link").join(" ") + " select-sort__link " + 
                    props.parentClasses.map(cl => "link-select-" + cl).join(" ") +
                    " link-select-sort select__link"
                }
            >
                <button 
                    className={
                        props.parentClasses.map(cl => "link-select-" + cl + "__inner").join(" ") + 
                        " link-select-sort__inner select__link-inner"
                    }
                    type="button"
                    onClick={() => props.swap(props.id)}
                    onFocus={(e) => {
                        if(props.id === 0){
                            makeActiveState(props.isActive);
                        }
                        makePseudoActive(e, props.selectInner);
                    }} 
                    onMouseEnter={(e) => makePseudoActive(e, props.selectInner)}
                    onBlur={(e) => {
                        if(props.isLast){
                            makeUnActiveState(props.isActive)
                        }
                        makeUnPseudoActive(e, props.selectInner);
                    }} 
                    onMouseLeave={(e) => {
                        if(e.target !== document.activeElement){
                            makeUnPseudoActive(e, props.selectInner);
                        }
                    }}
                >
                    <span>{props.about}</span>
                </button>
            </li>
        )
    }
    
    const replaceSortCategories = () => {
        dispatch(sortReplaceAction(props.contentType, props.id))
    }

    if(props.contentType === contentPart.Hotels){
        return(
            <li className="select-sort__link link-select-sort select-sort-hotels__link link-select-sort-hotels select__link">
                <button 
                    className="link-select-sort__inner link-select-sort-hotels__inner select__link-inner" type="button"
                    onClick={replaceSortCategories}
                    onFocus={(e) => {
                        if(props.id === 0){
                            makeActiveState(props.isActive);
                        }
                        makePseudoActive(e, props.selectInner);
                    }} 
                    onMouseEnter={(e) => makePseudoActive(e, props.selectInner)}
                    onBlur={(e) => {
                        if(props.isLast){
                            makeUnActiveState(props.isActive)
                        }
                        makeUnPseudoActive(e, props.selectInner);
                    }} 
                    onMouseLeave={(e) => {
                        if(e.target !== document.activeElement){
                            makeUnPseudoActive(e, props.selectInner);
                        }
                    }}
                >
                    <h3 className="link-select-sort__title link-select-sort-hotels__title">{props.about.title}</h3>
                    <div className="link-select-sort__subtitle link-select-sort-hotels__subtitle">
                        {props.about.subtitle + " places"}
                    </div>
                </button>
            </li>
        )
    }

    let daysPart = (props.about.subtitle.flyTime / 1440 >= 1) ? Math.floor(props.about.subtitle.flyTime / 1440) + "d" : "";
    let hoursPart = Math.floor(props.about.subtitle.flyTime / 60 % 24) + "h";
    let minutesPart = props.about.subtitle.flyTime % 60 + "m"
    return(
        <li className="select-sort__link link-select-sort select-sort-flights__link link-select-sort-flights select__link">
            <button 
                className="link-select-sort__inner link-select-sort-flights__inner select__link-inner" type="button"
                onClick={replaceSortCategories}
                onFocus={(e) => {
                    if(props.id === 0){
                        makeActiveState(props.isActive);
                    }
                    makePseudoActive(e, props.selectInner);
                }} 
                onMouseEnter={(e) => makePseudoActive(e, props.selectInner)}
                onBlur={(e) => {
                    if(props.isLast){
                        makeUnActiveState(props.isActive)
                    }
                    makeUnPseudoActive(e, props.selectInner);
                }} 
                onMouseLeave={(e) => {
                    if(e.target !== document.activeElement){
                        makeUnPseudoActive(e, props.selectInner);
                    }
                }}
            >
                <h3 className="link-select-sort__title link-select-sort-flights__title">{props.about.title}</h3>
                <div className="link-select-sort__subtitle link-select-sort-flights__subtitle">
                    <span>{"$" + props.about.subtitle.price}</span> . <span>{daysPart + " " + hoursPart + " " + minutesPart}</span>
                </div>
            </button>
        </li>
    )
})