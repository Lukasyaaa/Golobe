import React, { FC } from "react";
import { offersItem } from "../../../../types";

interface offerProps{
    about : offersItem,
    linkText : string
}

export const Offer : FC<offerProps> = ({about, linkText}) => {
    return(
        <article className="offers__item item-offers">
            <div className="item-offers__info info-item-offers">
                <div className="info-item-offers__header">
                    <h3 className="info-item-offers__title">{about.title}</h3>
                    <div className="info-item-offers__price"><span>From</span><strong>{"$" + about.price}</strong></div>
                </div>
                <div className="info-item-offers__info">{about.info}</div>
                <a className="info-item-offers__link" href={about.linkPath}>{linkText}</a>
            </div>
            <ul className="item-offers__images">
                {about.images.map((image, i) => 
                    <li className="item-offers__image-parent" key={i}>
                        <picture className="item-offers__image">
                            <img src={image.srcs.jpeg} alt={image.alt} />
                            <source srcSet={image.srcs.webp} type="img/webp" />
                        </picture>
                    </li>
                )}
            </ul>
        </article>
    )
}