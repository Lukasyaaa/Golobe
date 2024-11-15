import React, { FC, useRef, useState } from "react";
import { contentPart, link, setter, sortFlightsCategory, sortHotelsCategory } from "../../../types";
import { SortLink } from "./SortLink";
import { toggleState } from "../../../helperFunctions";
import { sharedLink } from "./Sort";

interface sortMoreFlightsProps{
    title : string,
    contentType : contentPart.Flights,
    about : sortFlightsCategory[],
    isActive : setter<boolean>
}
interface sortMoreHotelsProps{
    title : string,
    contentType : contentPart.Hotels,
    about : sortHotelsCategory[],
    isActive : setter<boolean>
}

interface sortLinksMoreProps{
    isLink : true,
    title : string,
    contentType : null,
    about : sharedLink[],
    isActive : setter<boolean>,
    swap : (newId : number) => void,
    parentClasses : string[]
}
interface sortCategoriesMoreProps{
    isLink : false,
    title : string,
    contentType : null,
    about : string[],
    activeNumber : setter<number>,
    isActive : setter<boolean>,
    swap : (newId : number) => void,
    parentClasses : string[]
}


export const SortMore : FC<sortMoreFlightsProps | sortMoreHotelsProps | sortLinksMoreProps | sortCategoriesMoreProps> = (props) => {
    let selectInner = useRef<HTMLUListElement>(null);

    if(props.contentType === null){
        return(
            <div 
                className={
                    props.parentClasses.map(cl => cl + "__select").join(" ") + " sort__select " + 
                    props.parentClasses.map(cl => "select-" + cl).join(" ") + " select-sort select" +
                    ((props.isActive.value) ? " _active" : "")
                }
            >
                <button 
                    className={
                        props.parentClasses.map(cl => "select-" + cl + "__opener").join(" ") + 
                        " select-sort__opener select__opener"
                    } 
                    onClick={() => toggleState(props.isActive)} type="button"
                >
                    <div 
                        className={
                            props.parentClasses.map(cl => "select-" + cl + "__burger").join(" ") +  
                            " select-sort__burger"
                        }        
                    >
                        <span></span>
                    </div>
                    <span 
                        className={
                            props.parentClasses.map(cl => "select-" + cl + "__opener-text").join(" ") +  
                            " select-sort__opener-text"
                        }
                    >
                        {props.title}
                    </span>
                </button>
                <div 
                    className={
                        props.parentClasses.map(cl => "select-" + cl + "__list").join(" ") +  
                        " select-sort__list select__list"
                    } 
                    style={{
                        height: (props.isActive.value) ? ((selectInner.current) ? selectInner.current.offsetHeight : "auto") : 0
                    }}
                >
                    <ul 
                        className={
                            props.parentClasses.map(cl => "select-" + cl + "__list-inner").join(" ") + 
                            " select-sort__list-inner select__list-inner"
                        }
                        ref={selectInner}
                    >
                        {(props.isLink)
                            ? props.about.map((sortCategory, i, links) => 
                                <SortLink 
                                    key={i} isLink={true} contentType={null} about={sortCategory} 
                                    id={i} isLast={i === links.length - 1} swap={props.swap}
                                    isActive={props.isActive} selectInner={selectInner} parentClasses={props.parentClasses}
                                />
                            )
                            : props.about.map((sortCategory, i, links) => 
                                <SortLink 
                                    key={i} isLink={false} contentType={null} about={sortCategory} 
                                    id={i} isLast={i === links.length - 1} swap={props.swap}
                                    isActive={props.isActive} selectInner={selectInner} parentClasses={props.parentClasses}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }

    let classes = ["sort__select", "select-sort", "sort-flights__select", "select-sort-flights", "select"];
    if(props.isActive.value){
        classes.push("_active");
    }

    if(props.contentType === contentPart.Flights){
        return(
            <div className={classes.join(" ")}>
                <button 
                    className="select-sort__opener select__opener" 
                    onClick={() => toggleState(props.isActive)} type="button"
                >
                    <div className="select-sort__burger select-sort-flights__burger"><span></span></div>
                    <span className="select-sort__opener-text select-sort-flights__opener">{props.title}</span>
                </button>
                <div className="select-sort__list select-sort-flights__list select__list" style={{
                    height: (props.isActive.value) ? ((selectInner.current) ? selectInner.current.offsetHeight : "auto") : 0
                }}>
                    <ul className="select-sort__list-inner select-sort-flights__list-inner select__list-inner" ref={selectInner}>
                        {props.about.map((sortCategory, i, links) => 
                            <SortLink 
                                key={i} contentType={contentPart.Flights} about={sortCategory} 
                                id={i} isLast={i === links.length - 1} 
                                isActive={props.isActive} selectInner={selectInner}
                            />
                        )}
                    </ul>
                </div>
            </div>
        )
    }
    return(
        <div className="sort__select select-sort sort-hotels__select select-sort-hotels select">
            <button 
                className="select-sort__opener select__opener" 
                onClick={() => toggleState(props.isActive)} type="button"
            >
                <div className="select-sort__burger select-sort-hotels__burger"><span></span></div>
                <span className="select-sort__opener-text select-sort-hotels__opener">{props.title}</span>
            </button>
            <div className="select-sort__list select-sort-hotels__list select__list" style={{
                height: (props.isActive.value) ? ((selectInner.current) ? selectInner.current.offsetHeight : "auto") : 0
            }}>
                <ul className="select-sort__list-inner select-sort-hotels__list-inner select__list-inner" ref={selectInner}>
                    {props.about.map((sortCategory, i, links) => 
                        <SortLink 
                            key={i} contentType={contentPart.Hotels} about={sortCategory} 
                            id={i} isLast={i === links.length - 1}
                            isActive={props.isActive} selectInner={selectInner}  
                        />
                    )}
                </ul>
            </div>
        </div>
    )
}