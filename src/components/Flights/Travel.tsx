import React, { FC, useRef } from "react";
import { travelsItem } from "../../types";

interface TravelProps{
    about : travelsItem
}

export const Travel : FC<TravelProps> = ({about}) =>{
    let parent = useRef<HTMLDivElement>(null);

    return(
        <div className="travels__item item-travels" ref={parent}>
            <figure className="item-travels__inner">
                <figcaption className="item-travels__subimage">
                    <div className="item-travels__row">
                        <div className="item-travels__text">
                            <h4 className="item-travels__title">{about.title}</h4>
                            <div className="item-travels__subtitle">{about.subtitle}</div>
                        </div>
                        <div className="item-travels__price">$ {about.price}</div>
                    </div>
                    <a 
                        className="item-travels__button"
                        href={about.href}  
                        onMouseEnter={() => parent.current?.classList.add("_active")}
                        onMouseLeave={(e) => {
                            if(e.target !== document.activeElement){
                                parent.current?.classList.remove("_active");
                            }
                        }}
                        onFocus={() => parent.current?.classList.add("_active")}
                        onBlur={() => parent.current?.classList.remove("_active")}
                    ><span>{about.button}</span></a>
                </figcaption>
                <picture className="item-travels__image">
                    <img src={about.image.srcs.jpeg} alt={about.image.alt} />
                    <source srcSet={about.image.srcs.webp} type="img/webp" />
                </picture>
            </figure>
        </div>
    )
}