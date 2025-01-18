import React, { FC } from "react";
import { ChooseVariant as ChooseVariantInterface } from "../../../types";

interface ChooseVariantProps{
    about : ChooseVariantInterface,
    isWebp : boolean
}

export const ChooseVariant : FC<ChooseVariantProps> = ({about, isWebp}) => {
    const pathToImage = (isWebp) ? about.background.webp : about.background.jpeg;

    return(
        <div className="choose__item item-choose" style={{
            backgroundImage: `url(${pathToImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
        }}>
            <h3 className="item-choose__title">{about.title}</h3>
            <div className="item-choose__subtitle">{about.description}</div>
            <a className="item-choose__link icon-send" href="" onClick={(e) => e.stopPropagation()}>
                <span>{about.linkText}</span>
            </a>
        </div>
    )
}