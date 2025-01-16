import React, { FC } from "react";
import { ChooseVariant as ChooseVariantInterface } from "../../../types";

interface ChooseVariantProps{
    about : ChooseVariantInterface,
    isWebp : boolean
}

export const ChooseVariant : FC<ChooseVariantProps> = ({about, isWebp}) => {
    const pathToImage = (isWebp) ? about.background.srcs.webp : about.background.srcs.jpeg;

    return(
        <div className="choose__item item-choose" style={{
            backgroundImage: `url(${pathToImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"
        }}>
            <h3 className="item-choose__title">{about.title}</h3>
            <div className="item-choose__subtitle">{about.subtitle}</div>
            <a className="item-choose__link icon-send" href={about.link.href}><span>{about.link.text}</span></a>
        </div>
    )
}