import React, { FC } from "react";
import { defaultBlockText, imageVariants, srcs } from "../../types";

interface ChoiceOptionProps{
    text : defaultBlockText,
    image : imageVariants,
}

export const ChoiceOption : FC<ChoiceOptionProps> = ({image, text}) =>{
    return(
        <div className="choice__item item-choice"> 
            <div className="item-choice__subimage">
                <h3 className="item-choice__heading">{text.heading}</h3>
                <div className="item-choice__info">{text.info}</div>
                <a href="#" className="item-choice__button _icon-send"><span>{text.button}</span></a>
            </div>
            <picture className="item-choice__image">
                <img src={image.srcs.jpeg} alt={image.alt} />
                <source srcSet={image.srcs.webp} type="img/webp" />
            </picture>
        </div>
    )
}