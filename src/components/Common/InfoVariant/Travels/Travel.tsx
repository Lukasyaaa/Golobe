import React, { FC, useRef, MouseEvent, FocusEvent } from "react";
import { variantTravelsItem } from "../../../../types";

interface travelProps{
    about : variantTravelsItem,
    linkText : string
}

export const Travel : FC<travelProps> = ({about, linkText}) => {
    let isWebp = true;
    let pathToBackground = (isWebp) ? about.image.webp : about.image.jpeg;
    let parent = useRef<HTMLElement>(null);

    const makePseudoActive = () => {
        if(parent.current){
            parent.current.classList.add("_hovered");
        }
    }

    const unMakePseudoActive = () => {
        if(parent.current){
            parent.current.classList.remove("_hovered");
        }
    }

    if(about.shortInfo !== ""){
        return(
            <article className="travels_variant__item item-travels_variant" ref={parent}>
                <div className="item-travels_variant__inner" style={{
                    background: `url(${pathToBackground})`, backgroundSize: "cover", 
                    backgroundRepeat: "no-repeat",  backgroundPosition: "center"
                }}>
                    <div className="item-travels_variant__row">
                        <div className="item-travels_variant__text">
                            <h3 className="item-travels_variant__title">{about.city}</h3>
                            <div className="item-travels_variant__subtitle">{about.shortInfo}</div>
                        </div>
                        <div className="item-travels_variant__price">{"$" + about.price}</div>
                    </div>
                    <a 
                        className="item-travels_variant__link" href={about.linkPath}
                        onMouseEnter={makePseudoActive} onMouseLeave={(e) => {
                            if(document.activeElement !== e.target){
                                unMakePseudoActive();
                            }
                        }} onFocus={makePseudoActive} onBlur={unMakePseudoActive}
                    >
                        {linkText}
                    </a>
                </div>
            </article>
        )
    }
    return(
        <article className="travels__item item-travels" style={{
            background: `url(${pathToBackground})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
        }}>
            <div className="item-travels__inner">
                <div className="item-travels__row">
                    <h3 className="item-travels__title">{about.city}</h3>
                    <div className="item-travels__price">{about.price}</div>
                </div>
                <a 
                    className="item-travels_variant__link" href={about.linkPath}
                    onMouseEnter={makePseudoActive} onMouseLeave={(e) => {
                        if(document.activeElement !== e.target){
                            unMakePseudoActive();
                        }
                    }} onFocus={makePseudoActive} onBlur={unMakePseudoActive}
                >
                    {linkText}
                </a>
            </div>
        </article>
    )
}